#! /usr/bin/env node
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

module.exports.buildHtml = (auditData) => {

    var template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8');
    var graphBuilder = fs.readFileSync(path.join(__dirname, './graph-test.js'), 'utf8');

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
        return { "id": (element.cves), "group": 2};
      });
      auditData.map((element) => {
        nodes.push({"id": (element.cwe), "group": 4});
      });
      auditData.map((element) => {
        nodes.push({"id": (element.title), "group": 6});
      });
      var links = auditData.map((element) => {
        return { "source": (element.cves), "target": (element.cwe), "value": 9};
      });
      auditData.map((element) => {
        links.push({ "source": (element.cwe), "target": (element.title), "value": 9});
      });
      auditData.map((element) => {
        links.push({ "source": (element.cves), "target": (element.title), "value": 9});
      });

      var temp = { "nodes" : nodes, "links" : links};

      var data = 'const data = ' + JSON.stringify(temp) + '\n\n';

      data = data.concat(graphBuilder);

    var templateScript = Handlebars.compile(template);

    var html = templateScript({errors: errors});
    const outputDir = path.join(__dirname, '/../../../output/');
    fs.mkdirSync(outputDir, {
        recursive: true
    });
    fs.writeFileSync(path.join(outputDir, 'output.html'), html);
    fs.writeFileSync(path.join(outputDir, 'graph-test.js'), data);
    fs.copyFileSync(path.join(__dirname, './style.css'), path.join(outputDir, 'style.css'), html);
    fs.copyFileSync(path.join(__dirname, './graph-test.html'), path.join(outputDir, 'graph-test.html'), html);
}