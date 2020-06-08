#! /usr/bin/env node

var stdin = process.stdin;
var fs = require('fs');
var program = require('commander');
var version = require('./package.json').version;
var convert = require('./lib/convert.js')

var intake = [];

//Used for testing with file in directory//
var test = false;

if (test == false) {

program
  .option('-o, --out <path>', 'output filename, defaults to output.json')

var filename = program.out || 'output.json';

stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  intake.push(chunk);
});

stdin.on('end', function () {
  var inputJSON = intake.join(''),
      outputJSON = convert(inputJSON);

  fs.writeFile(filename, outputJSON, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved as " + filename + "!");
  });
});
} else {

  program
  .option('-o, --out <path>', 'output filename, defaults to output.json')

var filename = program.out || 'output.json';
var temp = fs.readFileSync('example.json');
var inputJSON = temp.toString();

      outputJSON = convert(inputJSON);

  fs.writeFile(filename, outputJSON, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved as " + filename + "!");
  });

}
