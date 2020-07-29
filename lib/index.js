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

module.exports.runAuditly = (options) => {
    // Options
    const registryUrl = options.registryUrl;
    const outputDir = path.join(options.outputDirPath, 'auditly-output');

    console.log(`Running Auditly against registry: ${registryUrl}`);

    const runAudit = spawn('npm', ['audit', '--json', `--registry=${registryUrl}`]);

    let auditData = '';
    let auditOutput = [];
    let stderr = '';

    runAudit.stdout.on('data', (chunk) => {
        auditData += chunk.toString();
    });

    // TODO:  Add error handling
    runAudit.stderr.on('data', (data) => {
        let temp = stderr;
        stderr = temp.concat(data);
    });

    runAudit.on('exit', (exitCode) => {
        auditOutput = parseAuditData(JSON.parse(auditData));
        buildHtml(auditOutput, outputDir);
        console.log(`Report is located at: ${outputDir}`);
    });
}
