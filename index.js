var jade = require('jade');
var assign = require('object-assign');
var fs = require('fs');
var moment = require('moment');
var shell = require('shelljs');

var navigation = require('./data/links.json');
var portfolio = require('./data/portfolio.json');
var dResume = require('./data/resume.json');


var index = fs.readFileSync('./templates/index.jade');
var projects = fs.readFileSync('./templates/portfolio.jade');
var resume = fs.readFileSync('./templates/resume.jade');

var context = assign(navigation, portfolio, dResume, {moment:moment});

function cbWrite(error, value){
    if(error){
        console.error(error);
    }
}

fs.writeFile('./public/index.html', jade.render(index, assign(context, {filename: __dirname + '/templates/index.jade'})), undefined, cbWrite);
fs.writeFile('./public/portfolio.html', jade.render(projects, assign(context, {filename: __dirname + '/templates/portfolio.jade'})), undefined, cbWrite);
fs.writeFile('./public/resume.html', jade.render(resume, assign(context, {filename: __dirname + '/templates/resume.jade'})), undefined, cbWrite);

shell.mkdir('public');
shell.cp('-r', './js', './public');
shell.cp('-r', './css', './public');