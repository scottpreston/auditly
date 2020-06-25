#! /usr/bin/env node
const fs = require('fs');
const Handlebars = require('handlebars');

module.exports.buildHtml = (auditData) => {
    var template = fs.readFileSync('../lib/template.html', 'utf8');

    auditData.forEach(element => {
        
    });

    var people = [];

      auditData.forEach(element => {
        var temp = { "cves": (element.cves), 
        "cwe": (element.cwe), 
        "title": (element.title),
        "severity": element.severity,
        "overview": element.overview,
        "recommendation": element.recommendation,
        "references": element.references,
        "vulnerable_versions": element.vulnerable_versions,
        "patched_versions": element.patched_versions};

        people.push(temp);
      });

    var templateScript = Handlebars.compile(template);

    var html = templateScript({people: people});

    var stream = fs.createWriteStream('output.html');

    stream.once('open', function(fd) {
        stream.end(html);
    });
}