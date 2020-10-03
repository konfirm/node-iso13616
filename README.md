# ISO 13616

Implementation of [ISO 13616-1:2020 - International Bank Account Number](https://www.iso.org/standard/41031.html)

# Installation

The ISO 13616 package is a scoped package, which means one needs to provide the scope (both in installation and use).

```
$ npm install --save @konfirm/iso13616
```

# Usage

# API

The ISO 13616 package implements the validation and generation of both the checksum and the full ISO 13616 value for any input

## validate

The validate method validates the provided value and determines whether it is a valid ISO 13616 value

| argument | type                 | description               |
| -------- | -------------------- | ------------------------- |
| input    | `string` or `number` | The ISO 13616 to validate |

### Example

```js
const ISO13616 = require('@konfirm/iso13616');

console.log(ISO13616.validate('foo')); // false
console.log(ISO13616.validate('AT 61 19043 00234573201')); // true
```

## checksum

The checksum method calculates the checksum for the provided account and country values. As per ISO13616-1:2020 the checksum will be in the range `02-98`.

**NOTE**, versions prior to 2.0 incorrectly used the character range `03-99`

| argument | type                 | description                                          |
| -------- | -------------------- | ---------------------------------------------------- |
| account  | `string` or `number` | The account number (BBAN, Basic Bank Account Number) |
| country  | `string`             | The ISO 3166 country code                            |

### Example

```js
const ISO13616 = require('@konfirm/iso13616');

console.log(ISO13616.checksum('19043 00234573201', 'AT')); // '61'
```

## generate

The generate method generates the full ISO 13616 value for the provided account and country values, optionally formatted in pairs of four characters.

| argument | type                 | default | description                                          |
| -------- | -------------------- | ------- | ---------------------------------------------------- |
| account  | `string` or `number` |         | The account number (BBAN, Basic Bank Account Number) |
| country  | `string`             |         | The ISO 3166 country code                            |
| format   | `boolean`            | `false` | Format the output in pairs of four                   |

### Example

```js
const ISO13616 = require('@konfirm/iso13616');

console.log(ISO13616.generate('19043 00234573201', 'AT')); // 'AT611904300234573201'
console.log(ISO13616.generate('19043 00234573201', 'AT', true)); // 'AT61 1904 3002 3457 3201'
```

## format

Format the provided value in pairs of four characters

| argument | type                 | description             |
| -------- | -------------------- | ----------------------- |
| input    | `string` or `number` | The ISO 13616 to format |

### Example

```js
const ISO13616 = require('@konfirm/iso13616');

console.log(ISO13616.format('AT611904300234573201')); // 'AT61 1904 3002 3457 3201'
```

## Symbol.match

Implementation of the `Symbol.match` method to allow for using the `ISO13616` class as argument to `String.match`

| argument | type                 | description               |
| -------- | -------------------- | ------------------------- |
| input    | `string` or `number` | The ISO 13616 to validate |

### Example

```js
const ISO13616 = require('@konfirm/iso13616');
console.log('AT 61 19043 00234573201'.match(ISO13616));
// { country: 'AT', checksum: '61', account: '1904300234573201' }

const { country, account, checksum } = 'AT 61 19043 00234573201'.match(
	ISO13616
);
console.log(country); // 'AT'
console.log(account); // '1904300234573201'
console.log(checksum); // '61'
```

# License

MIT License Copyright (c) 2019 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
