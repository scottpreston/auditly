#!/usr/bin/env node

const {
  spawn
} = require("child_process");
const {
  parseAuditData
} = require('./parser');

const runAudit = spawn('npm', ['audit', '--json']);

let auditData = '';
let auditOutput = [];
let stderr = '';

runAudit.stdout.on('data', (chunk) => {
  auditData += chunk.toString();
});

runAudit.stderr.on('data', (data) => {
  let temp = stderr;
  stderr = temp.concat(data);
});

runAudit.on('exit', (exitCode) => {
  auditOutput = parseAuditData(JSON.parse(auditData));
  console.log(auditOutput); // NOTE: Please replace this when html output is integrated
  process.exit(exitCode);
});