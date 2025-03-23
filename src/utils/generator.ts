/**
 * This function generates a random number.
 * @param min the minimum number that this function can generate.
 * @param max the maximum number that this function can generate.
 * @returns the generated random number.
 */
export function getRandomValue(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
