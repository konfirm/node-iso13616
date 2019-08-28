const { Mod97_10, Alphabet } = require('@konfirm/iso7064');

/**
 * Extension of the ISO7064 MOD 97-10 Algorithm
 */
module.exports = Mod97_10.factory({
	algorithm: 'MOD 97-10 (Custom)',
	designation: 3,
	indices: Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
});
