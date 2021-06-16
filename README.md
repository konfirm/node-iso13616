# ISO 13616

Implementation of [ISO 13616-1:2020 - International Bank Account Number](https://www.iso.org/standard/81090.html)

# Installation

The ISO 13616 package is a scoped package, which means one needs to provide the scope (both in installation and use).

```
$ npm install --save @konfirm/iso13616
```

# Usage

As a version 3.0 the ISO 13616 package has full support for Typescript types and ES Modules.
For CommonJS (`require`) users the packages has a breaking change as it not longer supports a `default` export, meaning the actual usage changed

### ES Module

```js
import { ISO13616 } from '@konfirm/iso13616';
```

### CommonJS

```js
//const ISO13616 = require('@konfirm/iso13616');
const { ISO13616 } = require('@konfirm/iso13616');
```

### Typescript

```ts
import { ISO13616 } from '@konfirm/iso13616';
```


# API

The ISO 13616 package implements the validation and generation of both the checksum and the full ISO 13616 value for any input

## validate

The validate method validates the provided value and determines whether it is a valid ISO 13616 value

| argument | type                 | description               |
| -------- | -------------------- | ------------------------- |
| input    | `string` or `number` | The ISO 13616 to validate |

### Example

#### ES Module

```js
import { ISO13616 } from '@konfirm/iso13616';

console.log(ISO13616.validate('foo')); // false
console.log(ISO13616.validate('AD 97 82732793347266899771')); // true
```

#### CommonJS

```js
const { ISO13616 } = require('@konfirm/iso13616');

console.log(ISO13616.validate('foo')); // false
console.log(ISO13616.validate('CA 02 0131 3167 8000 0065 1238 8')); // true
```

#### Typescript

```ts
import { ISO13616 } from '@konfirm/iso13616';

console.log(ISO13616.validate('foo')); // false
console.log(ISO13616.validate('BY 13 NBRB 3600 900000002Z00AB00')); // true
```

## checksum

The checksum method calculates the checksum for the provided account and country values. As per ISO13616-1:2020 the checksum will be in the range `02-98`.

**NOTE**, versions prior to 2.0 incorrectly used the character range `03-99`

| argument | type                 | description                                          |
| -------- | -------------------- | ---------------------------------------------------- |
| account  | `string` or `number` | The account number (BBAN, Basic Bank Account Number) |
| country  | `string`             | The ISO 3166 country code                            |

### ES Module example

```js
import { ISO13616 } from '@konfirm/iso13616';

console.log(ISO13616.checksum('0131 3167 8000 0065 1238 8', 'CA')); // '02'
```

### CommonJS example

```js
const { ISO13616 } = require('@konfirm/iso13616');

console.log(ISO13616.checksum('117 73016 1111101800000000', 'HU')); // '42'
```

### Typescript example

```ts
import { ISO13616 } from '@konfirm/iso13616';

console.log(ISO13616.checksum('X 05428 11101 000000123456', 'IT')); // '60'
```

## generate

The generate method generates the full ISO 13616 value for the provided account and country values, optionally formatted in pairs of four characters.

| argument | type                 | default | description                                          |
| -------- | -------------------- | ------- | ---------------------------------------------------- |
| account  | `string` or `number` |         | The account number (BBAN, Basic Bank Account Number) |
| country  | `string`             |         | The ISO 3166 country code                            |
| format   | `boolean`            | `false` | Format the output in pairs of four                   |

### ES Module example

```js
import { ISO13616 } import '@konfirm/iso13616';

console.log(ISO13616.generate('CENR 00000000000000700025', 'SV')); // 'SV62CENR00000000000000700025'
console.log(ISO13616.generate('CENR 00000000000000700025', 'SV', true)); // 'SV62 CENR 0000 0000 0000 0070 0025'
```

### CommonJS example

```js
const { ISO13616 } = require('@konfirm/iso13616');

console.log(ISO13616.generate('NBRB 3600 900000002Z00AB00', 'BY')); // 'BY13NBRB3600900000002Z00AB00'
console.log(ISO13616.generate('NBRB 3600 900000002Z00AB00', 'BY', true)); // 'BY13 NBRB 3600 9000 0000 2Z00 AB00'
```

### Typescript example

```ts
import { ISO13616 } import '@konfirm/iso13616';

console.log(ISO13616.generate('123412341234', 'BI')); // 'BI33123412341234'
console.log(ISO13616.generate('123412341234', 'BI', true)); // 'BI33 1234 1234 1234'
```

## format

Format the provided value in pairs of four characters

| argument | type                 | description             |
| -------- | -------------------- | ----------------------- |
| input    | `string` or `number` | The ISO 13616 to format |


### ES Module example

```js
import { ISO13616 } from '@konfirm/iso13616';

console.log(ISO13616.format('ab-cd12')); // 'ABCD 12'
```

### CommonJS example

```js
const { ISO13616 } = require('@konfirm/iso13616');

console.log(ISO13616.format('ab-cd-12 ')); // 'ABCD 12'
```

### Typescript example

```js
import { ISO13616 } from '@konfirm/iso13616';

console.log(ISO13616.format('ab.cd 12')); // 'ABCD 12'
```

## match

Match the input and return an object containing the matched country, checksum, account

| argument | type                 | description               |
| -------- | -------------------- | ------------------------- |
| input    | `string` or `number` | The ISO 13616 to validate |


### ES Module example

```js
import { ISO13616 } = from '@konfirm/iso13616';
console.log(ISO13616.match('AT 61 19043 00234573201'));
// { country: 'AT', checksum: '61', account: '1904300234573201' }

const { country, account, checksum } = ISO13616.match('AT 61 19043 00234573201');
console.log(country); // 'AT'
console.log(account); // '1904300234573201'
console.log(checksum); // '61'
```

### CommonJS example

```js
const { ISO13616 } = require('@konfirm/iso13616');
console.log(ISO13616.match('AT 61 19043 00234573201'));
// { country: 'AT', checksum: '61', account: '1904300234573201' }

const { country, account, checksum } = ISO13616.match('AT 61 19043 00234573201');
console.log(country); // 'AT'
console.log(account); // '1904300234573201'
console.log(checksum); // '61'
```

### Typescript example

```ts
import { ISO13616 } = from '@konfirm/iso13616';
console.log(ISO13616.match('AT 61 19043 00234573201'));
// { country: 'AT', checksum: '61', account: '1904300234573201' }

const { country, account, checksum } = ISO13616.match('AT 61 19043 00234573201');
console.log(country); // 'AT'
console.log(account); // '1904300234573201'
console.log(checksum); // '61'
```

## [Symbol.match]

Implementation of the `Symbol.match` method to allow for using the `ISO13616` class as argument to `String.match`

| argument | type                 | description               |
| -------- | -------------------- | ------------------------- |
| input    | `string` or `number` | The ISO 13616 to validate |

### ES Module example

```js
import { ISO13616 } = from '@konfirm/iso13616';
console.log('AT 61 19043 00234573201'.match(ISO13616));
// { country: 'AT', checksum: '61', account: '1904300234573201' }

const { country, account, checksum } = 'AT 61 19043 00234573201'.match(
	ISO13616
);
console.log(country); // 'AT'
console.log(account); // '1904300234573201'
console.log(checksum); // '61'
```

### CommonJS example

```js
const { ISO13616 } = require('@konfirm/iso13616');
console.log('AT 61 19043 00234573201'.match(ISO13616));
// { country: 'AT', checksum: '61', account: '1904300234573201' }

const { country, account, checksum } = 'AT 61 19043 00234573201'.match(
	ISO13616
);
console.log(country); // 'AT'
console.log(account); // '1904300234573201'
console.log(checksum); // '61'
```

### Typescript example

```ts
import { ISO13616 } = from '@konfirm/iso13616';
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

MIT License Copyright (c) 2019-2021 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
