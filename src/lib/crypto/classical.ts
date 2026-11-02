import { InputError, gcd, modInverse, mod } from './modular';

/** The ciphers work over the 26-letter Latin alphabet: a = 0 … z = 25. */
export const ALPHABET_SIZE = 26n;

export type Mode = 'encrypt' | 'decrypt';

/** a–z / A–Z → 0–25; anything else → null. */
export function letterToCode(ch: string): number | null {
	if (ch.length !== 1) return null;
	const c = ch.toLowerCase().charCodeAt(0) - 97;
	return c >= 0 && c < 26 ? c : null;
}

export function codeToLetter(code: bigint | number): string {
	return String.fromCharCode(Number(mod(BigInt(code), ALPHABET_SIZE)) + 97);
}

/** One character of a classical-cipher calculation. Non-letters pass through with `code: null`. */
export interface LetterStep {
	char: string;
	code: number | null;
	/** Value before the final `mod 26`. */
	raw: bigint | null;
	result: number | null;
	out: string;
}

function passThrough(char: string): LetterStep {
	return { char, code: null, raw: null, result: null, out: char };
}

export interface CipherResult<S extends LetterStep = LetterStep> {
	output: string;
	steps: S[];
}

function finish<S extends LetterStep>(steps: S[]): CipherResult<S> {
	return { output: steps.map((s) => s.out).join(''), steps };
}

/** Caesar: y = (x ± k) mod 26. Letters are lower-cased; other characters are kept as-is. */
export function caesar(text: string, key: bigint, mode: Mode): CipherResult {
	const steps = [...text].map((char) => {
		const code = letterToCode(char);
		if (code === null) return passThrough(char);
		const raw = mode === 'encrypt' ? BigInt(code) + key : BigInt(code) - key;
		const result = Number(mod(raw, ALPHABET_SIZE));
		return { char, code, raw, result, out: codeToLetter(result) };
	});
	return finish(steps);
}

export interface AffineKey {
	a: bigint;
	b: bigint;
}

function affineInverse(a: bigint, n: bigint): bigint {
	if (gcd(a, n) !== 1n) {
		throw new InputError(`a must be coprime with ${n} (gcd(${a}, ${n}) = ${gcd(a, n)}).`, 'a');
	}
	return modInverse(a, n)!;
}

export function affineValue(
	x: bigint,
	{ a, b }: AffineKey,
	mode: Mode,
	n: bigint,
): { raw: bigint; result: bigint } {
	if (mode === 'encrypt') {
		const raw = a * x + b;
		return { raw, result: mod(raw, n) };
	}
	const raw = affineInverse(a, n) * (x - b);
	return { raw, result: mod(raw, n) };
}

export interface AffineResult extends CipherResult {
	/** a⁻¹ mod n, used for decryption. */
	aInverse: bigint;
}

/** Affine over letters: e(x) = (a·x + b) mod 26, d(y) = a⁻¹·(y − b) mod 26. Requires gcd(a, 26) = 1. */
export function affine(text: string, key: AffineKey, mode: Mode): AffineResult {
	const aInverse = affineInverse(key.a, ALPHABET_SIZE);
	const steps = [...text].map((char) => {
		const code = letterToCode(char);
		if (code === null) return passThrough(char);
		const { raw, result } = affineValue(BigInt(code), key, mode, ALPHABET_SIZE);
		return { char, code, raw, result: Number(result), out: codeToLetter(result) };
	});
	return { ...finish(steps), aInverse };
}

/** Affine over a single number in Z_n. Requires n ≥ 2 and gcd(a, n) = 1. */
export function affineNumber(
	x: bigint,
	key: AffineKey,
	mode: Mode,
	n: bigint,
): { raw: bigint; result: bigint; aInverse: bigint } {
	if (n < 2n) throw new InputError('n must be at least 2.', 'n');
	const aInverse = affineInverse(key.a, n);
	return { ...affineValue(x, key, mode, n), aInverse };
}

export interface VigenereStep extends LetterStep {
	keyChar: string | null;
	keyCode: number | null;
}

/**
 * Vigenère: y(i) = (x(i) ± k(i mod |k|)) mod 26.
 * Only letters of the key are used; the key advances only on letters of the text.
 */
export function vigenere(text: string, key: string, mode: Mode): CipherResult<VigenereStep> {
	const keyChars = [...key].filter((c) => letterToCode(c) !== null);
	if (keyChars.length === 0) throw new InputError('Key must contain at least one letter.', 'key');
	let k = 0;
	const steps = [...text].map((char): VigenereStep => {
		const code = letterToCode(char);
		if (code === null) return { ...passThrough(char), keyChar: null, keyCode: null };
		const keyChar = keyChars[k++ % keyChars.length]!;
		const keyCode = letterToCode(keyChar)!;
		const raw = mode === 'encrypt' ? BigInt(code + keyCode) : BigInt(code - keyCode);
		const result = Number(mod(raw, ALPHABET_SIZE));
		return { char, code, raw, result, out: codeToLetter(result), keyChar: keyChar.toLowerCase(), keyCode };
	});
	return finish(steps);
}
