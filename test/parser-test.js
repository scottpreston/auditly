const { parseAuditData } = require('../lib/parser');

describe('parseAuditData', () => {
    test('should handle empty data', () => {
        expect(() => parseAuditData(null)).toThrow('Invalid audit data format');
        expect(() => parseAuditData(undefined)).toThrow('Invalid audit data format');
    });

    test('should handle empty vulnerabilities', () => {
        const data = {
            vulnerabilities: {}
        };
        expect(parseAuditData(data)).toEqual([]);
    });

    test('should parse single vulnerability', () => {
        const data = {
            vulnerabilities: {
                'test-package': {
                    name: 'test-package',
                    severity: 'high',
                    via: [{
                        source: 123,
                        name: 'test-package',
                        title: 'Test Vulnerability',
                        cwe: ['CWE-123'],
                        url: 'https://example.com/vuln'
                    }],
                    range: '<1.0.0',
                    fixAvailable: {
                        version: '1.0.0'
                    }
                }
            }
        };

        const result = parseAuditData(data);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            cves: ['CWE-123'],
            cwe: 'CWE-123',
            title: 'Test Vulnerability',
            severity: 'high',
            overview: 'https://example.com/vuln',
            recommendation: 'Fix available: Update to 1.0.0',
            references: 'https://example.com/vuln',
            module_name: 'test-package',
            vulnerable_versions: '<1.0.0',
            patched_versions: '1.0.0'
        });
    });

    test('should handle string via entries', () => {
        const data = {
            vulnerabilities: {
                'test-package': {
                    name: 'test-package',
                    severity: 'high',
                    via: ['other-package'],
                    range: '<1.0.0'
                }
            }
        };

        const result = parseAuditData(data);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('test-package');
    });

    test('should handle array via entries', () => {
        const data = {
            vulnerabilities: {
                'test-package': {
                    name: 'test-package',
                    severity: 'high',
                    via: ['other-package', {
                        source: 123,
                        title: 'Test Vulnerability'
                    }],
                    range: '<1.0.0'
                }
            }
        };

        const result = parseAuditData(data);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Test Vulnerability');
    });

    test('should handle missing fields gracefully', () => {
        const data = {
            vulnerabilities: {
                'test-package': {
                    name: 'test-package'
                }
            }
        };

        const result = parseAuditData(data);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            cves: [],
            cwe: '',
            title: 'test-package',
            severity: 'unknown',
            overview: '',
            recommendation: 'No fix available',
            references: '',
            module_name: 'test-package',
            vulnerable_versions: '',
            patched_versions: ''
        });
    });
});
