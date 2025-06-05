const assert = require('assert');
const parser = require('../lib/parser');

describe('Parser', function () {
    describe('parseAuditData', function () {
        it('should parse valid audit data correctly', function () {
            const mockData = {
                advisories: {
                    '1': {
                        cves: ['CVE-2023-1234'],
                        cwe: 'CWE-123',
                        title: 'Test Vulnerability',
                        severity: 'high',
                        overview: 'Test overview',
                        recommendation: 'Test recommendation',
                        references: 'https://test.com',
                        module_name: 'test-module',
                        vulnerable_versions: '1.0.0',
                        patched_versions: '1.0.1'
                    }
                }
            };

            const result = parser.parseAuditData(mockData);
            assert.strictEqual(result.length, 1);
            assert.deepStrictEqual(result[0], {
                cves: ['CVE-2023-1234'],
                cwe: 'CWE-123',
                title: 'Test Vulnerability',
                severity: 'high',
                overview: 'Test overview',
                recommendation: 'Test recommendation',
                references: 'https://test.com',
                module_name: 'test-module',
                vulnerable_versions: '1.0.0',
                patched_versions: '1.0.1'
            });
        });

        it('should handle missing fields gracefully', function () {
            const mockData = {
                advisories: {
                    '1': {
                        cves: [],
                        cwe: '',
                        title: '',
                        severity: '',
                        overview: '',
                        recommendation: '',
                        references: '',
                        module_name: '',
                        vulnerable_versions: '',
                        patched_versions: ''
                    }
                }
            };

            const result = parser.parseAuditData(mockData);
            assert.strictEqual(result.length, 1);
            assert.deepStrictEqual(result[0], {
                cves: [],
                cwe: '',
                title: '',
                severity: 'unknown',
                overview: '',
                recommendation: '',
                references: '',
                module_name: '',
                vulnerable_versions: '',
                patched_versions: ''
            });
        });

        it('should throw error for invalid data format', function () {
            assert.throws(() => {
                parser.parseAuditData(null);
            }, /Invalid audit data format/);

            assert.throws(() => {
                parser.parseAuditData({});
            }, /Missing or invalid advisories in audit data/);

            assert.throws(() => {
                parser.parseAuditData({ advisories: null });
            }, /Missing or invalid advisories in audit data/);
        });
    });
});
