/* global source, describe, it, each, expect */

const Alphabet = require('@konfirm/alphabet');
const Mod97_10 = source('Entity/Mod97_10');
const { Mod97_10: ISO7064_Mod97_10 } = require('@konfirm/iso7064');

describe('ISO 13616', () => {
	describe('Mod97_10', () => {
		it('extends ISO7064/Mod97_10', (next) => {
			expect(Mod97_10.prototype).to.be.instanceof(ISO7064_Mod97_10);
			next();
		});

		each`
			property      | equal | value
			--------------|-------|-------
			algorithm     | yes   | MOD 97-10
			specification | yes   | ISO 7064, MOD 97-10
			designation   | yes   | ${3}
			modulus       | yes   | ${97}
			radix         | yes   | ${10}
			indices       | no    | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			alphabet      | yes   | ${Alphabet.from('0123456789')}
			double        | yes   | ${true}
	
		`(
			'$property override ($equal) has value $value',
			({ property, equal, value }, next) => {
				expect(property in Mod97_10).to.be.true();
				expect(property in ISO7064_Mod97_10).to.be.true();
				expect(Mod97_10[property]).to.equal(value);

				if (equal === 'yes') {
					expect(Mod97_10[property]).to.shallow.equal(
						ISO7064_Mod97_10[property]
					);
				} else {
					expect(Mod97_10[property]).not.to.shallow.equal(
						ISO7064_Mod97_10[property]
					);
				}

				next();
			}
		);
	});
});
