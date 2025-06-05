#!/usr/bin/env node

const validateAuditData = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid audit data format');
    }
    if (!data.advisories || typeof data.advisories !== 'object') {
        throw new Error('Missing or invalid advisories in audit data');
    }
};

module.exports.parseAuditData = (data) => {
    try {
        validateAuditData(data);

        const auditObjects = Object.entries(data.advisories).map(([id, issue]) => ({
            cves: issue.cves || [],
            cwe: issue.cwe || '',
            title: issue.title || '',
            severity: issue.severity || 'unknown',
            overview: issue.overview || '',
            recommendation: issue.recommendation || '',
            references: issue.references || '',
            module_name: issue.module_name || '',
            vulnerable_versions: issue.vulnerable_versions || '',
            patched_versions: issue.patched_versions || ''
        }));

        return auditObjects;
    } catch (error) {
        console.error('Error parsing audit data:', error.message);
        throw error;
    }
}
