var jade = require('jade');
var assign = require('object-assign');
var fs = require('fs');
var moment = require('moment');
var shell = require('shelljs');
var pdf = require('html-pdf');

var navigation = require('./data/links.json');
var portfolio = require('./data/portfolio.json');
var dResume = require('./data/resume.json');


var index = fs.readFileSync('./templates/index.jade');
var projects = fs.readFileSync('./templates/portfolio.jade');
var resume = fs.readFileSync('./templates/resume.jade');
var printResume = fs.readFileSync('./templates/printResume.jade');

var context = assign(navigation, portfolio, dResume, {moment:moment});
var htmlResume = jade.render(printResume, assign(context, {filename: __dirname + '/templates/printResume.jade'}));

function cbWrite(error, value){
    if(error){
        console.error(value + ': failure\n' + error);
    }
    console.log(value + ': success');
}

shell.rm('-rf', './public');
shell.mkdir('-p', './public/export');
shell.cp('-r', './js', './public');
shell.cp('-r', './css', './public');
shell.cp('-r', './css', './public/export');
shell.cp('-r', './export', './public');

fs.writeFile('./public/index.html', jade.render(index, assign(context, {filename: __dirname + '/templates/index.jade'})), undefined, function(e,v){cbWrite(e,'index')});
fs.writeFile('./public/portfolio.html', jade.render(projects, assign(context, {filename: __dirname + '/templates/portfolio.jade'})), undefined, function(e,v){cbWrite(e,'portfolio')});
fs.writeFile('./public/resume.html', jade.render(resume, assign(context, {filename: __dirname + '/templates/resume.jade'})), undefined, function(e,v){cbWrite(e,'resume')});
fs.writeFile('./public/export/printResume.html', htmlResume, undefined, function(e,v){cbWrite(e,'export/resume')});

//pdf.create(htmlResume, {
//    format: 'letter',
//    base: 'file://' + __dirname + '/public',
//    viewportSize: {
//        width: 1200,
//        height: 1552
//    },
//    border: {
//        "top": "1in",            // default is 0, units: mm, cm, in, px
//        "right": ".5in",
//        "bottom": ".5in",
//        "left": ".5in"
//    }
//}).toFile('./public/export/resume.pdf', function(err, res) {
//    if (err) return console.log('export/pdf\n' + err);
//    console.log('export/pdf: success');
//});
