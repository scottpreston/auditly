#! /usr/bin/env node
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');


module.exports.buildHtml = (auditData) => {

    var template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8');

      var errors = auditData.map((element) => {
        return { "cves": (element.cves), 
        "cwe": (element.cwe), 
        "title": (element.title),
        "severity": element.severity,
        "overview": element.overview,
        "recommendation": element.recommendation,
        "references": element.references,
        "vulnerable_versions": element.vulnerable_versions,
        "patched_versions": element.patched_versions};
      });



    var templateScript = Handlebars.compile(template);

    var html = templateScript({errors: errors});

    fs.mkdirSync(path.join(__dirname, '/../../../output'), {
        recursive: true
    });
    fs.writeFileSync(path.join(__dirname, '/../../../output/output.html'), html)
}