import * as test from 'tape';
import { each } from 'template-literal-each';
import { ISO7064, PureISO7064, Mod97_10, Alphabet } from '@konfirm/iso7064';
import { CustomMod97_10 } from '../../source/Entity/Mod97_10';

test('ISO 13616/Mod97_10 - extends ISO7064/Mod97_10', (t) => {
	t.true(CustomMod97_10 instanceof ISO7064);
	t.true(CustomMod97_10 instanceof PureISO7064);

	t.end();
});

test(`ISO 13616/Mod97_10 - properties`, (t) => {
	each`
		property      | equal | value
		--------------|-------|-------
		algorithm     | no    | MOD 97-10 (Custom)
		specification | no    | ISO 7064, MOD 97-10 (Custom)
		designation   | yes   | ${3}
		modulus       | yes   | ${97}
		radix         | yes   | ${10}
		indices       | no    | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
		alphabet      | yes   | ${Alphabet.from('0123456789')}
		double        | yes   | ${true}

	`((record) => {
		const { property, equal, value } = record as any;

		t.true(property in Mod97_10, `property ${property} exists in (formal) Mod97_10`);
		t.true(property in CustomMod97_10, `property ${property} exists in Custom Mod97_10`);
		t.equal(CustomMod97_10[property], value, `${property} equals ${value}`);

		const custom = CustomMod97_10[property as keyof typeof CustomMod97_10];
		const original = Mod97_10[property as keyof typeof Mod97_10];

		if (equal === 'yes') {
			t.deepEqual(custom, original, `${property} is inherited`);
		} else {
			t.notEqual(custom, original, `${property} is not inherited`);
		}
	});

	t.end();
});
