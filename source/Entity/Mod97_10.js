const { Mod97_10: ISO7064_Mod97_10 } = require('@konfirm/iso7064');

/**
 * Extension of the ISO7064 MOD 97-10 Algorithm
 *
 * @class Mod97_10
 * @extends {ISO7064/Mod97_10}
 */
class Mod97_10 extends ISO7064_Mod97_10 {
	/**
	 * The indices (input characters) allowing all input characters valid for ISO13616
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get indices() {
		return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}

	/**
	 * Specify the checksum alphabet (as it normally inherits from indices)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get alphabet() {
		return '0123456789';
	}
}

module.exports = Mod97_10;
