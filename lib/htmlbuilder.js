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
      

      var nodes = auditData.map((element) => {
        return { '"id"': (element.cves), '"group"': 1}, {'"id"': (element.cwe), '"group"': 2};
      });
      var links = auditData.map((element) => {
        return { '"source"': (element.cves), '"target"': (element.cwe), '"value"': 1};
      });

      const data = { '"nodes"' : nodes, '"links"' : links};

      console.log(data);

    var templateScript = Handlebars.compile(template);

    var html = templateScript({errors: errors});
    var graph = '<html>Whatever</html>';
    const outputDir = path.join(__dirname, '/../../../output/');
    fs.mkdirSync(outputDir, {
        recursive: true
    });
    fs.writeFileSync(path.join(outputDir, 'output.html'), html);
    fs.writeFileSync(path.join(outputDir, 'outputGraph.html'), graph);

    fs.copyFileSync(path.join(__dirname, './style.css'), path.join(outputDir, 'style.css'), html);
    fs.copyFileSync(path.join(__dirname, './graph-test.html'), path.join(outputDir, 'graph-test.html'), html);
}