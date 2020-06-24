#! /usr/bin/env node

module.exports.parseAuditData = (data) => {
  let auditObjects = [];
  for (let id in data.advisories) {
    let issue = data.advisories[id];
    auditObjects.push({
      "cves": issue.cves,
      "cwe": issue.cwe,
      "title": issue.title,
      "severity": issue.severity,
      "overview": issue.overview,
      "recommendation": issue.recommendation,
      "references": issue.references,
      "vulnerable_versions": issue.vulnerable_versions,
      "patched_versions": issue.patched_versions
    })
  }
  return auditObjects;
}