#! /usr/bin/env node

const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

module.exports.buildHtml = (auditData, outputDir) => {

    var template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8');
    var graphBuilder = fs.readFileSync(path.join(__dirname, './graph-data.js'), 'utf8');

    var errors = auditData.map((element) => {
        var link = element.references.split('(').pop().split(')')[0];
        return {
            "cves": (element.cves),
            "cwe": (element.cwe),
            "title": (element.title),
            "severity": element.severity,
            "overview": element.overview,
            "recommendation": element.recommendation,
            "link": link,
            "references": element.references,
            "module_name": element.module_name,
            "vulnerable_versions": element.vulnerable_versions,
            "patched_versions": element.patched_versions
        };
    });
    var nodes = auditData.map((element) => {
        return {
            "id": (element.cwe),
            "group": 4
        };
    });
    auditData.map((element) => {
        element.cves.forEach(cve => {
        nodes.push({
            "id": ((cve)),
            "group": 2
        });
        });
    });
    console.log(nodes);
    auditData.map((element) => {
        nodes.push({
            "id": (element.module_name),
            "group": 6
        });
    });
    var links = auditData.map((element) => {
        return {
            "source": (element.module_name),
            "target": (element.cwe),
            "value": 13
        };
    });
    auditData.map((element) => {
        element.cves.forEach(cve => {
            links.push({
                "source": (cve),
                "target": (element.cwe),
                "value": 13
            });
        });
    });
    const uniqueNodes = nodes.reduce((acc, current) => {
        const nodeExists = acc.find(item => item.id === current.id);
        if (!nodeExists) {
            acc.push(current);
        }
        return acc;
    }, []);

    var temp = {
        nodes: uniqueNodes,
        links: links
    };

    var data = 'const data = ' + JSON.stringify(temp) + '\n' + 'const errors = ' + JSON.stringify(errors) + '\n';

    data = data.concat(graphBuilder);

    var templateScript = Handlebars.compile(template);

    var html = templateScript({
        errors: errors
    });

    fs.mkdirSync(outputDir, {
        recursive: true
    });
    fs.writeFileSync(path.join(outputDir, 'Auditly-text.html'), html);
    fs.writeFileSync(path.join(outputDir, 'graph-data.js'), data);
    fs.copyFileSync(path.join(__dirname, './style.css'), path.join(outputDir, 'style.css'), html);
    fs.copyFileSync(path.join(__dirname, './Auditly-graph.html'), path.join(outputDir, 'Auditly-graph.html'), html);
    fs.copyFileSync(path.join(__dirname, './Auditly.html'), path.join(outputDir, 'Auditly.html'), html);
    fs.copyFileSync(path.join(__dirname, './force-graph.min.js'), path.join(outputDir, 'force-graph.min.js'), html);
}
