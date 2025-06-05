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
        auditData += chunk.toString();
    });

    runAudit.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    return new Promise((resolve, reject) => {
        runAudit.on('exit', (exitCode) => {
            if (exitCode !== 0) {
                reject(new Error(`npm audit failed with exit code ${exitCode}: ${stderr}`));
                return;
            }

            try {
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
