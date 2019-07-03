const Mod97_10 = require('./Mod97_10.js');

/**
 * Base ISO 13616 implementation
 *
 * @class ISO13616
 */
class ISO13616 {
	/**
	 * Validate the input to satisfy the ISO 13616 checksum
	 *
	 * @static
	 * @param {string|number} input
	 * @returns {boolean} valid
	 * @memberof ISO13616
	 */
	static validate(input) {
		const { country, checksum, account } = String(input).match(this);

		return this.checksum(account, country) === checksum;
	}

	/**
	 * Calculate the ISO 13616 checksum
	 *
	 * @static
	 * @param {string} account
	 * @param {string} country ISO 3166 code
	 * @returns {string} checksum
	 * @memberof ISO13616
	 */
	static checksum(account, country) {
		const { modulus, indices } = Mod97_10;
		const numeric = Array.from(`${account}${country}`)
			.map((char) => indices.indexOf(char))
			.filter((value) => value >= 0)
			.join('');
		const checksum = Mod97_10.checksum(numeric);
		const number = Number(checksum);

		// there are three edge cases which pass validation with two different checksums
		// 97/00, 98/01, 99/02 would all pass
		// we never provided the 00, 01 nor 02 value and always provide the higher values
		return number < 100 - modulus ? String(number + modulus) : checksum;
	}

	/**
	 * Generate the full ISO 13616 string, including the checksum
	 *
	 * @static
	 * @param {string} account
	 * @param {string} country
	 * @param {boolean} format (in pairs of 4)
	 * @returns {string} generated ISO 13616
	 * @memberof ISO13616
	 */
	static generate(account, country, format = false) {
		const checksum = this.checksum(account, country);
		const generated = `${country}${checksum}${account}`;

		return format ? this.format(generated) : Mod97_10.normalize(generated);
	}

	/**
	 * Format the input to match the specified groups of 4 characters
	 *
	 * @static
	 * @param {string|number} input
	 * @returns {string} formatted
	 * @memberof ISO13616
	 */
	static format(input) {
		return Array.from(Mod97_10.normalize(input)).reduce(
			(carry, char, index) =>
				carry + (index && index % 4 === 0 ? ' ' : '') + char,
			''
		);
	}

	/**
	 * Implementation of Symbol.match allowing the ISO13616 class to be
	 * used directly as argument to String.match
	 *
	 * @static
	 * @param {string} input
	 * @returns {object} {country, checksum, account}
	 * @memberof ISO13616
	 */
	static [Symbol.match](input) {
		const [, country, checksum, account] =
			Mod97_10.normalize(input).match(
				/^([A-Z]{2})([0-9]{2})(\w{1,30})$/
			) || [];

		return { country, checksum, account };
	}
}

module.exports = ISO13616;
