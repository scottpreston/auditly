const assert = require('assert');
const fs = require('fs');
const path = require('path');
const htmlbuilder = require('../lib/htmlbuilder');

// Mock fs module
jest.mock('fs', () => ({
    readFileSync: jest.fn(),
    mkdirSync: jest.fn(),
    writeFileSync: jest.fn(),
    copyFileSync: jest.fn()
}));

describe('buildHtml', function () {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Mock template and graph builder files
        fs.readFileSync.mockImplementation((filePath) => {
            if (filePath.includes('template.html')) {
                return '{{#each errors}}<div>{{sanitize title}}</div>{{/each}}';
            }
            if (filePath.includes('graph-data.js')) {
                return '// Graph builder code';
            }
            return '';
        });
    });

    it('should validate input data', function () {
        const invalidInputs = [
            null,
            undefined,
            'not-an-array',
            123,
            {}
        ];

        for (const input of invalidInputs) {
            assert.throws(
                () => htmlbuilder.buildHtml(input, 'output-dir'),
                /Invalid audit data format/
            );
        }
    });

    it('should sanitize HTML content', function () {
        const mockData = [{
            cves: ['CVE-2023-1234'],
            cwe: 'CWE-123',
            title: '<script>alert("xss")</script>',
            severity: 'high',
            overview: 'Test overview',
            recommendation: 'Test recommendation',
            references: 'https://test.com',
            module_name: 'test-module',
            vulnerable_versions: '1.0.0',
            patched_versions: '1.0.1'
        }];

        htmlbuilder.buildHtml(mockData, 'output-dir');

        // Check if the sanitized content was written
        const writeFileSyncCalls = fs.writeFileSync.mock.calls;
        const htmlContent = writeFileSyncCalls.find(call =>
            call[0].includes('Auditly-text.html')
        )[1];

        assert.ok(htmlContent.includes('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'));
        assert.ok(!htmlContent.includes('<script>alert("xss")</script>'));
    });

    it('should create output directory', function () {
        const mockData = [{
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
        }];

        htmlbuilder.buildHtml(mockData, 'output-dir');

        expect(fs.mkdirSync).toHaveBeenCalledWith('output-dir', { recursive: true });
    });

    it('should generate correct graph data', function () {
        const mockData = [{
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
        }];

        htmlbuilder.buildHtml(mockData, 'output-dir');

        // Check if graph data was written correctly
        const writeFileSyncCalls = fs.writeFileSync.mock.calls;
        const graphData = writeFileSyncCalls.find(call =>
            call[0].includes('graph-data.js')
        )[1];

        assert.ok(graphData.includes('const data ='));
        assert.ok(graphData.includes('const errors ='));
        assert.ok(graphData.includes('CVE-2023-1234'));
        assert.ok(graphData.includes('CWE-123'));
        assert.ok(graphData.includes('test-module'));
    });

    it('should handle missing fields gracefully', function () {
        const mockData = [{
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
        }];

        assert.doesNotThrow(() => {
            htmlbuilder.buildHtml(mockData, 'output-dir');
        });
    });

    it('should copy all required files', function () {
        const mockData = [{
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
        }];

        htmlbuilder.buildHtml(mockData, 'output-dir');

        // Check if all required files were copied
        const copyFileSyncCalls = fs.copyFileSync.mock.calls;
        const copiedFiles = copyFileSyncCalls.map(call => path.basename(call[0]));

        assert.ok(copiedFiles.includes('style.css'));
        assert.ok(copiedFiles.includes('Auditly-graph.html'));
        assert.ok(copiedFiles.includes('Auditly.html'));
        assert.ok(copiedFiles.includes('force-graph.min.js'));
    });
}); 