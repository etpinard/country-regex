const fs = require('fs')
const https = require('https')
const csvParse = require('csv-parse')

const URL = 'https://raw.githubusercontent.com/vincentarelbundock/countrycode/master/data/countrycode_data.csv'
const FILE = './index.js'
const ISO3_COLNAME = 'iso3c'
const REGEX_COLNAME = 'country.name.en.regex'

var body = ''

https.get(URL, function (res) {
  res.on('data', (chunk) => { body += chunk })

  res.on('end', parse)
})
.on('error', (err) => { throw err })

function parse () {
  csvParse(body, { columns: true }, (err, data) => {
    if (err) throw err

    formatHash(data)
  })
}

function formatHash (data) {
  var hash = {}

  data.forEach((obj) => {
    var iso3 = obj[ISO3_COLNAME]
    var regex = obj[REGEX_COLNAME]

    if (!iso3 || !regex) return

    hash[iso3] = regex
  })

  formatString(hash)
}

function formatString (hash) {
  var strHash = JSON.stringify(hash, null, 2)
  var lines = strHash.split('\n')

  // remove "" in props
  // replace " for '
  lines = lines.map((line, i) => {
    if (i === 0 || i === lines.length - 1) return line

    var parts = line.split(':')
    var lhs = parts[0].replace(/"/g, '')
    var rhs = parts.slice(1).join('').replace(/"/g, "'")

    return lhs + ':' + rhs
  })

  // make CommonJS module
  var str = 'module.exports = ' + lines.join('\n') + '\n'

  write(str)
}

function write (str) {
  fs.writeFile(FILE, str, (err) => {
    if (err) throw err
  })
}
