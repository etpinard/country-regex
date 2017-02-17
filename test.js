const test = require('tap').test
const countryRegex = require('./')

test('should not contain any blank props', function (t) {
  var keys = Object.keys(countryRegex)

  t.plan(keys.length)

  keys.forEach(function (k) {
    t.equal(typeof k, 'string')
  })
})

test('should contain only three-letter uppercase props', function (t) {
  var keys = Object.keys(countryRegex)

  t.plan(keys.length * 2)

  keys.forEach(function (k) {
    t.equal(k.length, 3)
    t.equal(k.toUpperCase(), k)
  })
})

test('should not contain any blank values', function (t) {
  var keys = Object.keys(countryRegex)

  t.plan(keys.length)

  keys.forEach(function (k) {
    t.equal(typeof countryRegex[k], 'string')
  })
})

test('should contain only valid regex values', function (t) {
  var keys = Object.keys(countryRegex)

  t.plan(keys.length)

  keys.forEach(function (k) {
    var regex = new RegExp(countryRegex[k])

    t.equal(typeof regex.test, 'function')
  })
})
