var capitalize = require('./utils').capitalize;
var getCWEId = require('./utils').getCWEId;

var priorityMap = ['Low', 'Medium', 'High', 'Critical']

var convert = function (json) {
  newJSON = JSON.parse(json);
  report = {};
  report.vulnerabilities = [];
  report.remediations = [];

  for (var id in newJSON.advisories) {
    var issue = newJSON.advisories[id];
    var cwe_id = getCWEId(issue.cwe);

    report.vulnerabilities.push({
      "cve": "package.json" + issue.module_name + ":cve_id:" + issue.cves[0],
      "description": issue.overview,
      "severity": capitalize(issue.severity),
      "fixedby": issue.reported_by.name,
      "confidence": "High",
    });
  }

  return JSON.stringify(report, null, '  ');
}

module.exports = convert;