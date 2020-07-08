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

    var graph = '<head><style> body { margin: 0; } </style><script src="//unpkg.com/force-graph"></script><!--<script src="../../dist/force-graph.js"></script>--></head><body><div id="graph"></div><script>fetch("./miserables.json").then(res => res.json()).then(data => {const Graph = ForceGraph()(document.getElementById("graph")).graphData(data).nodeId("id").nodeAutoColorBy("group").nodeCanvasObject((node, ctx, globalScale) => {const label = node.id;const fontSize = 12/globalScale;ctx.font = `${fontSize}px Sans-Serif`;const textWidth = ctx.measureText(label).width;const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);ctx.textAlign = "center";ctx.textBaseline = "middle";ctx.fillStyle = node.color;ctx.fillText(label, node.x, node.y);});});</script></body>';
    fs.mkdirSync(path.join(__dirname, '/../../../output'), {
        recursive: true
    });
    fs.writeFileSync(path.join(__dirname, '/../../../output/output.html'), html)
    fs.writeFileSync(path.join(__dirname, '/../../../output/outputGraph.html'), graph)

}