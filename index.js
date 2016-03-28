var jade = require('jade');
var assign = require('object-assign');
var fs = require('fs');
var navigation = require('./data/links.json');
var portfolio = require('./data/portfolio.json');
var dResume = require('./data/resume.json');
var moment = require('moment');

var index = fs.readFileSync('./templates/index.jade');
var projects = fs.readFileSync('./templates/portfolio.jade');
var resume = fs.readFileSync('./templates/resume.jade');

var context = assign(navigation, portfolio, dResume, {moment:moment});

function cbWrite(error, value){
    if(error){
        console.error(error);
    }
}

fs.writeFile('./index.html', jade.render(index, assign(context, {filename: __dirname + '/templates/index.jade'})), undefined, cbWrite);
fs.writeFile('./portfolio.html', jade.render(projects, assign(context, {filename: __dirname + '/templates/portfolio.jade'})), undefined, cbWrite);
fs.writeFile('./resume.html', jade.render(resume, assign(context, {filename: __dirname + '/templates/resume.jade'})), undefined, cbWrite);