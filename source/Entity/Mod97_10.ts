import { Mod97_10, Alphabet } from '@konfirm/iso7064';

/**
 * Extension of the ISO7064 MOD 97-10 Algorithm
 */
export const CustomMod97_10 = Mod97_10.factory({
	algorithm: 'MOD 97-10 (Custom)',
	designation: 3,
	indices: Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
});
