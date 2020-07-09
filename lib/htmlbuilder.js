#! /usr/bin/env node
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');
const style = require('./style.css');

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
    var graph = '<html>Whatever</html>';

    fs.mkdirSync(path.join(__dirname, '/../../../output'), {
        recursive: true
    });
    fs.writeFileSync(path.join(__dirname, '/../../../output/output.html'), html);
    fs.writeFileSync(path.join(__dirname, '/../../../output/outputGraph.html'), graph);
    fs.copyFileSync(path.join(__dirname, '/../../../output/style.css'), style)
}