#! /usr/bin/env node
var fs = require('fs');

//Used for testing with file in directory//
const inputJSON = fs.readFileSync('example.json', { encoding: 'utf-8' });
const newJSON = JSON.parse(inputJSON);
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