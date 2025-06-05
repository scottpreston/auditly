const assert = require('assert');
const { spawn } = require('child_process');
const path = require('path');
const index = require('../lib/index');

// Mock child_process.spawn
jest.mock('child_process', () => ({
    spawn: jest.fn()
}));

describe('runAuditly', function () {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('should validate registry URL', async function () {
        const invalidOptions = [
            { registryUrl: 'invalid-url' },
            { registryUrl: 'ftp://example.com' },
            { registryUrl: '' },
            { registryUrl: null }
        ];

        for (const options of invalidOptions) {
            await assert.rejects(
                async () => await index.runAuditly(options),
                /Invalid registry URL provided/
            );
        }
    });

    it('should validate options object', async function () {
        const invalidOptions = [
            null,
            undefined,
            'not-an-object',
            123
        ];

        for (const options of invalidOptions) {
            await assert.rejects(
                async () => await index.runAuditly(options),
                /Invalid options provided/
            );
        }
    });

    it('should handle npm audit failure', async function () {
        const mockSpawn = {
            stdout: { on: jest.fn() },
            stderr: { on: jest.fn() },
            on: jest.fn()
        };

        spawn.mockReturnValue(mockSpawn);

        const options = {
            registryUrl: 'https://registry.npmjs.org/'
        };

        // Simulate npm audit failure with invalid exit code
        mockSpawn.on.mockImplementation((event, callback) => {
            if (event === 'exit') {
                callback(2); // Use exit code 2 to indicate a real failure
            }
        });

        mockSpawn.stderr.on.mockImplementation((event, callback) => {
            if (event === 'data') {
                callback(Buffer.from('npm audit failed'));
            }
        });

        await assert.rejects(
            async () => await index.runAuditly(options),
            /npm audit failed with exit code 2/
        );
    });

    it('should handle invalid JSON output', async function () {
        const mockSpawn = {
            stdout: { on: jest.fn() },
            stderr: { on: jest.fn() },
            on: jest.fn()
        };

        spawn.mockReturnValue(mockSpawn);

        const options = {
            registryUrl: 'https://registry.npmjs.org/'
        };

        // Simulate successful npm audit with invalid JSON
        mockSpawn.on.mockImplementation((event, callback) => {
            if (event === 'exit') {
                callback(0);
            }
        });

        mockSpawn.stdout.on.mockImplementation((event, callback) => {
            if (event === 'data') {
                callback(Buffer.from('invalid json'));
            }
        });

        await assert.rejects(
            async () => await index.runAuditly(options),
            /Failed to process audit data/
        );
    });

    it('should successfully process valid audit data', async function () {
        const mockSpawn = {
            stdout: { on: jest.fn() },
            stderr: { on: jest.fn() },
            on: jest.fn()
        };

        spawn.mockReturnValue(mockSpawn);

        const options = {
            registryUrl: 'https://registry.npmjs.org/'
        };

        const mockAuditData = {
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

        // Simulate successful npm audit
        mockSpawn.on.mockImplementation((event, callback) => {
            if (event === 'exit') {
                callback(0);
            }
        });

        mockSpawn.stdout.on.mockImplementation((event, callback) => {
            if (event === 'data') {
                callback(Buffer.from(JSON.stringify(mockAuditData)));
            }
        });

        const result = await index.runAuditly(options);
        assert.strictEqual(
            result,
            path.join(process.cwd(), 'auditly-output')
        );
    });
}); 