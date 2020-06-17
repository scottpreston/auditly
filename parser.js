#! /usr/bin/env node
var fs = require('fs');
const newJSON = require('./example.json');

var cve_array = [];
var cwe_array = [];

for (var id in newJSON.advisories) {
  var issue = newJSON.advisories[id];
  var x = 0;
  while (issue.cves[x] != null) {
    cve_array.push(issue.cves[x]);
    x++;
  }
}
console.log("\nCVEs:")
console.log(cve_array);

for (var id in newJSON.advisories) { 
  var issue = newJSON.advisories[id];
  if (issue.cwe != null) {
    cwe_array.push(issue.cwe);
  }
}
console.log("\nCWEs:")
console.log(cwe_array);