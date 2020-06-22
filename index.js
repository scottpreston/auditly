const {
  exec
} = require("child_process");
const {
  parseAuditData
} = require('./parser')

exec("npm audit --json > ./scans/npmaudit.json", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
});

parseAuditData();