import { CustomMod97_10 } from './Mod97_10';

export type ISO13616Match = {
	country: string;
	checksum: string;
	account: string;
};

/**
 * Validate the input to satisfy the ISO 13616 checksum
 *
 * @static
 * @param {string|number} input
 * @returns {boolean} valid
 * @memberof ISO13616
 */
export function validate(input: string): boolean {
	const { country, checksum: check, account } = match(String(input));

	return checksum(account, country) === check;
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
export function checksum(account: string, country: string): string {
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
 * @param {boolean} formatting (in pairs of 4)
 * @returns {string} generated ISO 13616
 * @memberof ISO13616
 */
export function generate(account: string, country: string, formatting: boolean = false): string {
	const generated = `${country}${checksum(account, country)}${account}`;

	return formatting ? format(generated) : CustomMod97_10.normalize(generated);
}

/**
 * Format the input to match the specified groups of 4 characters
 *
 * @static
 * @param {string|number} input
 * @returns {string} formatted
 * @memberof ISO13616
 */
export function format(input: string | number): string {
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
export function match(input: string): ISO13616Match {
	const [, country, checksum, account] =
		CustomMod97_10.normalize(input).match(
			/^([A-Z]{2})([0-9]{2})(\w{1,30})$/
		) || [];

	return { country, checksum, account };
}
