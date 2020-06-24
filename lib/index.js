const {
  spawn
} = require("child_process");
const {
  parseAuditData
} = require('./parser');

const runAudit = spawn('npm', ['audit', '--json']);

let auditData = '';
let auditOutput = {};
runAudit.stdout.on('data', (chunk) => {
  auditData += chunk.toString();
});
runAudit.on('close', (exit_code) => {
  auditOutput = parseAuditData(auditData);
  console.log('Process close with exit code:', exit_code);
});

console.log(auditOutput); // NOTE: Please remove this when html output is integrated