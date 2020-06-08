#! /usr/bin/env node

var stdin = process.stdin;
var fs = require('fs');
var program = require('commander');
var version = require('./package.json').version;
var convert = require('./lib/convert.js')

var chunks = [];

program
  .option('-o, --out <path>', 'output filename, defaults to output.json')

var filename = program.out || 'output.json';

stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  chunks.push(chunk);
});

stdin.on('end', function () {
  var inputJSON = chunks.join(''),
      outputJSON = convert(inputJSON);

  fs.writeFile(filename, outputJSON, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved as " + filename + "!");
  });
});
