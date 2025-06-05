#!/usr/bin/env node

const validateAuditData = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid audit data format');
    }
    if (data.vulnerabilities && typeof data.vulnerabilities !== 'object') {
        throw new Error('Invalid vulnerabilities format in audit data');
    }
};

const extractViaInfo = (via) => {
    if (!via) return null;
    if (typeof via === 'string') return { name: via };
    if (Array.isArray(via)) {
        return via.find(v => typeof v === 'object') || { name: via[0] };
    }
    return via;
};

module.exports.parseAuditData = (data) => {
    try {
        validateAuditData(data);

        // If no vulnerabilities, return empty array
        if (!data.vulnerabilities || Object.keys(data.vulnerabilities).length === 0) {
            return [];
        }

        const auditObjects = Object.entries(data.vulnerabilities).map(([name, vuln]) => {
            const viaInfo = extractViaInfo(vuln.via);

            return {
                cves: viaInfo?.cwe || [],
                cwe: viaInfo?.cwe?.[0] || '',
                title: viaInfo?.title || vuln.name,
                severity: vuln.severity || 'unknown',
                overview: viaInfo?.url || '',
                recommendation: vuln.fixAvailable ?
                    `Fix available: ${typeof vuln.fixAvailable === 'object' ?
                        `Update to ${vuln.fixAvailable.version}` :
                        'Run npm audit fix'}` :
                    'No fix available',
                references: viaInfo?.url || '',
                module_name: name,
                vulnerable_versions: vuln.range || '',
                patched_versions: vuln.fixAvailable?.version || ''
            };
        });

        return auditObjects;
    } catch (error) {
        console.error('Error parsing audit data:', error.message);
        throw error;
    }
}
