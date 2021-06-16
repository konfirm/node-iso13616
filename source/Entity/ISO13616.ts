import { CustomMod97_10 } from './Mod97_10';

export type ISO13616Match = {
	country: string;
	checksum: string;
	account: string;
};

/**
 * Base ISO 13616 implementation
 *
 * @class ISO13616
 */
export class ISO13616 {
	/**
	 * Validate the input to satisfy the ISO 13616 checksum
	 *
	 * @static
	 * @param {string|number} input
	 * @returns {boolean} valid
	 * @memberof ISO13616
	 */
	static validate(input: string): boolean {
		const { country, checksum, account } = this[Symbol.match](String(input));

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
	static checksum(account: string, country: string): string {
		const { modulus, indices } = CustomMod97_10;
		const numeric = Array.from(`${account}${country}`)
			.map((char) => indices.indexOf(char))
			.filter((value) => value >= 0)
			.join('');
		const checksum = CustomMod97_10.checksum(numeric);
		const number = Number(checksum);

		// ISO13616-1:2020 states: the check digits can only be in the range [02..98]
		return number <= 98 - modulus ? String(number + modulus) : checksum;
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
	static generate(account: string, country: string, format: boolean = false): string {
		const checksum = this.checksum(account, country);
		const generated = `${country}${checksum}${account}`;

		return format ? this.format(generated) : CustomMod97_10.normalize(generated);
	}

	/**
	 * Format the input to match the specified groups of 4 characters
	 *
	 * @static
	 * @param {string|number} input
	 * @returns {string} formatted
	 * @memberof ISO13616
	 */
	static format(input: string | number): string {
		const normal: string = CustomMod97_10.normalize(String(input));

		return Array.from(normal)
			.reduce(
				(carry, char, index) =>
					carry + (index && index % 4 === 0 ? ' ' : '') + char,
				''
			);
	}

	/**
	 * Match the input and return the matches values as object
	 *
	 * @static
	 * @param {string} input
	 * @returns {ISO13616Match}
	 * @memberof ISO13616
	 */
	static match(input: string): ISO13616Match {
		const [, country, checksum, account] =
			CustomMod97_10.normalize(input).match(
				/^([A-Z]{2})([0-9]{2})(\w{1,30})$/
			) || [];

		return { country, checksum, account };
	}

	/**
	 * Implementation of Symbol.match allowing the ISO13616 class to be
	 * used directly as argument to String.match
	 *
	 * @static
	 * @param {string} input
	 * @returns {ISO13616Match}
	 * @memberof ISO13616
	 */
	static [Symbol.match](input: string): ISO13616Match {
		return this.match(input);
	}
}
