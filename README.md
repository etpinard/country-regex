# country-regex

[![npm version][1]][1a]

[![Build Status][2]][2a]
[![Dependency Status][3]][3a]
[![devDependency Status][4]][4a]

Hash map of country [ISO-3][5] code to regular expression identifier. Regular
expression data is taken from [Vincent Arel-Bundock][6]'s [`countrycode`][7] R
package (GPL-3 License). Big ups! :beers:


## Install

```bash
npm install country-regex
```

## Usage

```js
var countryRegex = require('country-regex');

// and then for example:
countryRegex['USA'];

// contains 'united.?states|\\bu\\.?s\\.?a\\.?\\b|\\bu\\.?s\\.?\\b(?!.*islands)'
```

## Credits

2016 Étienne Tétreault-Pinard. MIT License


[1]: https://badge.fury.io/js/country-regex.svg
[1a]: https://badge.fury.io/js/country-regex
[2]: https://travis-ci.org/etpinard/country-regex.svg?branch=master
[2a]: https://travis-ci.org/etpinard/country-regex
[3]: https://david-dm.org/etpinard/country-regex.svg?style=flat-square
[3a]: https://david-dm.org/etpinard/country-regex
[4]: https://david-dm.org/etpinard/country-regex/dev-status.svg?style=flat-square
[4a]: https://david-dm.org/etpinard/country-regex#info=devDependencies
[5]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
[6]: https://github.com/vincentarelbundock
[7]: https://github.com/vincentarelbundock/countrycode
