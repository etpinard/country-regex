const fs = require('fs');
const https = require('https');
const csvParse = require('csv-parse');

const URL = 'https://raw.githubusercontent.com/vincentarelbundock/countrycode/master/data/countrycode_data.csv'
const FILE = './index.js';
const COL1 = 'iso3c';
const COL2 = 'regex';

var body = '';


https.get(URL, function(res) {
  res.on('data', (chunk) => { body += chunk; });

  res.on('end', parse);
})
.on('error', (err) => { throw err; });

function parse() {
  csvParse(body, { columns: true }, (err, data) => {
    if(err) throw err;

    formatHash(data);
  });
}

function formatHash(data) {
  var hash = {};

  data.forEach((obj) => {
    if(!obj[COL1]) return;

    // ISO3 to regex
    hash[obj[COL1]] = obj[COL2];
  });

  formatString(hash);
}

function formatString(hash) {
  var strHash = JSON.stringify(hash, null, 2);
  var lines = strHash.split('\n');

  // remove "" in props
  lines = lines.map((line, i) => {
    if(i === 0 || i === lines.length-1) return line;

    var parts = line.split(':');
    var left = parts[0].replace(/"/g, '');

    return left + ':' + parts[1];
  });

  // make CommonJS module
  var str = 'module.exports = ' + lines.join('\n') + ';\n';

  write(str);
}

function write(str) {
  fs.writeFile(FILE, str, (err) => {
    if(err) throw err;
  })
}
