#!/usr/bin/env node

const {
    spawn
} = require("child_process");
const {
    parseAuditData
} = require('./parser');
const {
    buildHtml
} = require('./htmlbuilder');
const path = require('path');
const url = require('url');

// Validate registry URL
const isValidRegistryUrl = (registryUrl) => {
    try {
        const parsed = new URL(registryUrl);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
};

module.exports.runAuditly = (options) => {
    // Input validation
    if (!options || typeof options !== 'object') {
        throw new Error('Invalid options provided');
    }

    const registryUrl = options.registryUrl;
    if (!registryUrl || !isValidRegistryUrl(registryUrl)) {
        throw new Error('Invalid registry URL provided');
    }

    const outputDir = path.join(options.outputDirPath || process.cwd(), 'auditly-output');

    console.log(`Running Auditly against registry: ${registryUrl}`);

    // Sanitize registry URL to prevent command injection
    const sanitizedRegistryUrl = registryUrl.replace(/[;&|`$]/g, '');

    const runAudit = spawn('npm', ['audit', '--json', `--registry=${sanitizedRegistryUrl}`], {
        shell: false // Prevent shell injection
    });

    let auditData = '';
    let stderr = '';

    runAudit.stdout.on('data', (chunk) => {
        const data = chunk.toString();
        auditData += data;
        console.log('npm audit stdout:', data);
    });

    runAudit.stderr.on('data', (data) => {
        const error = data.toString();
        stderr += error;
        console.error('npm audit stderr:', error);
    });

    return new Promise((resolve, reject) => {
        runAudit.on('exit', (exitCode) => {
            // npm audit returns 1 when vulnerabilities are found, which is not an error for our tool
            if (exitCode !== 0 && exitCode !== 1) {
                console.error('npm audit failed with the following error:');
                console.error('stdout:', auditData);
                console.error('stderr:', stderr);
                reject(new Error(`npm audit failed with exit code ${exitCode}`));
                return;
            }

            try {
                if (!auditData) {
                    throw new Error('No audit data received');
                }
                const parsedData = JSON.parse(auditData);
                const auditOutput = parseAuditData(parsedData);
                buildHtml(auditOutput, outputDir);
                console.log(`Report is located at: ${outputDir}`);
                resolve(outputDir);
            } catch (error) {
                reject(new Error(`Failed to process audit data: ${error.message}`));
            }
        });

        runAudit.on('error', (error) => {
            reject(new Error(`Failed to run npm audit: ${error.message}`));
        });
    });
}
