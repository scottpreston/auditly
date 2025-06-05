#!/usr/bin/env node

const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

// Sanitize HTML content
const sanitizeHtml = (str) => {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// Register Handlebars helper for sanitization
Handlebars.registerHelper('sanitize', function (str) {
    return new Handlebars.SafeString(str); // Don't sanitize again, data is already sanitized
});

module.exports.buildHtml = (auditData, outputDir) => {
    try {
        if (!Array.isArray(auditData)) {
            throw new Error('Invalid audit data format');
        }

        const template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8');
        const graphBuilder = fs.readFileSync(path.join(__dirname, './graph-data.js'), 'utf8');

        const errors = auditData.map((element) => {
            const link = element.references.split('(').pop().split(')')[0];
            return {
                cves: element.cves || [],
                cwe: element.cwe || '',
                title: sanitizeHtml(element.title || ''),
                severity: element.severity || 'unknown',
                overview: sanitizeHtml(element.overview || ''),
                recommendation: sanitizeHtml(element.recommendation || ''),
                link: sanitizeHtml(link || ''),
                references: sanitizeHtml(element.references || ''),
                module_name: sanitizeHtml(element.module_name || ''),
                vulnerable_versions: sanitizeHtml(element.vulnerable_versions || ''),
                patched_versions: sanitizeHtml(element.patched_versions || '')
            };
        });

        const nodes = [];
        const links = [];

        // Process nodes and links
        auditData.forEach((element) => {
            // Add CWE node
            if (element.cwe) {
                nodes.push({
                    id: element.cwe,
                    group: 4
                });
            }

            // Add CVE nodes
            (element.cves || []).forEach(cve => {
                nodes.push({
                    id: cve,
                    group: 2
                });
            });

            // Add module node
            if (element.module_name) {
                nodes.push({
                    id: element.module_name,
                    group: 6
                });
            }

            // Add links
            if (element.module_name && element.cwe) {
                links.push({
                    source: element.module_name,
                    target: element.cwe,
                    value: 13
                });
            }

            (element.cves || []).forEach(cve => {
                if (element.cwe) {
                    links.push({
                        source: cve,
                        target: element.cwe,
                        value: 13
                    });
                }
            });
        });

        // Remove duplicate nodes
        const uniqueNodes = nodes.reduce((acc, current) => {
            const nodeExists = acc.find(item => item.id === current.id);
            if (!nodeExists) {
                acc.push(current);
            }
            return acc;
        }, []);

        const graphData = {
            nodes: uniqueNodes,
            links: links
        };

        const data = `const data = ${JSON.stringify(graphData)}\nconst errors = ${JSON.stringify(errors)}\n${graphBuilder}`;
        const templateScript = Handlebars.compile(template);
        const html = templateScript({ errors });

        // Create output directory if it doesn't exist
        fs.mkdirSync(outputDir, { recursive: true });

        // Write files
        const filesToWrite = [
            { path: path.join(outputDir, 'Auditly-text.html'), content: html },
            { path: path.join(outputDir, 'graph-data.js'), content: data },
            { path: path.join(outputDir, 'style.css'), source: path.join(__dirname, './style.css') },
            { path: path.join(outputDir, 'Auditly-graph.html'), source: path.join(__dirname, './Auditly-graph.html') },
            { path: path.join(outputDir, 'Auditly.html'), source: path.join(__dirname, './Auditly.html') },
            { path: path.join(outputDir, 'force-graph.min.js'), source: path.join(__dirname, './force-graph.min.js') }
        ];

        filesToWrite.forEach(({ path: filePath, content, source }) => {
            if (content) {
                fs.writeFileSync(filePath, content);
            } else if (source) {
                fs.copyFileSync(source, filePath);
            }
        });

    } catch (error) {
        console.error('Error building HTML:', error.message);
        throw error;
    }
}
