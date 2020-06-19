#! /usr/bin/env node

const newJSON = require('./example.json');

let auditObjects = [];
for (let id in newJSON.advisories) {
  let issue = newJSON.advisories[id];
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
console.log("auditObjects", auditObjects);