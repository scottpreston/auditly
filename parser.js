#! /usr/bin/env node
var fs = require('fs');

//Used for testing with file in directory//
var temp = fs.readFileSync('example.json');
var inputJSON = temp.toString();
newJSON = JSON.parse(inputJSON);
var cve_array = [];
var cwe_array = [];

for (var id in newJSON.advisories) {
  var issue = newJSON.advisories[id];
  if (issue.cves[0] != null) {
    cve_array.push(issue.cves[0]);
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