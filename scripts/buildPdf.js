var pdf = require('html-pdf');
var fs = require('fs');

var htmlResume = fs.readFileSync(process.cwd() + '/public/export/resume.html', {encoding:'utf-8'});

pdf.create(htmlResume, {
    format: 'letter',
    base: 'file://' + process.cwd() + '/public/export',
    viewportSize: {
        width: 1200,
        height: 1552
    },
    border: {
        "top": "1in",            // default is 0, units: mm, cm, in, px
        "right": ".5in",
        "bottom": ".5in",
        "left": ".5in"
    }
}).toFile('./public/export/resume.pdf', function(err, res) {
    if (err) return console.log('export/pdf: failure\n' + err);
    console.log('export/pdf: success');
});