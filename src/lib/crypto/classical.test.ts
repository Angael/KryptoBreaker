import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { letterToCode, codeToLetter, caesar, affineValue, affine, affineNumber, vigenere } from './classical';
import { InputError, mod, gcd } from './modular';
const unicode = fc
	.array(
		fc.integer({ min: 0, max: 0x10ffff }).filter((n) => n < 0xd800 || n > 0xdfff),
		{ maxLength: 60 },
	)
	.map((a) => String.fromCodePoint(...a));
const lower = (s: string) => [...s].map((c) => (letterToCode(c) === null ? c : c.toLowerCase())).join('');
const validA = fc.bigInt().filter((a) => gcd(a, 26n) === 1n);
function error(fn: () => unknown, field: string) {
	expect(fn).toThrow(InputError);
	try {
		fn();
	} catch (e) {
		expect(e).toMatchObject({ field });
	}
}
describe('classical ciphers', () => {
	it('maps the alphabet and wraps codes', () => {
		for (let i = 0; i < 26; i++) {
			expect(letterToCode(codeToLetter(i).toUpperCase())).toBe(i);
			expect(codeToLetter(BigInt(i) - 26n)).toBe(codeToLetter(i));
		}
		for (const c of ['', 'ab', 'ą', '🙂', ' ', '9', '!']) expect(letterToCode(c)).toBeNull();
	});
	it('matches known vectors', () => {
		expect(caesar('Ala ma kota!', 3n, 'encrypt').output).toBe('dod pd nrwd!');
		expect(affine('kryptografia', { a: 3n, b: 7n }, 'encrypt').output).toBe('lgbamxzghwfh');
		expect(vigenere('kryptografia', 'wakacje', 'encrypt').output).toBe('gripvxknapic');
	});
	it('preserves nonletters and exposes consistent steps', () => {
		for (const mode of ['encrypt', 'decrypt'] as const)
			for (const r of [
				caesar('AZ ą🙂9!', 10n ** 30n + 3n, mode),
				affine('AZ ą🙂9!', { a: -3n, b: 10n ** 30n }, mode),
				vigenere('AZ ą🙂9!', 'b!C', mode),
			]) {
				expect(r.steps.map((s) => s.out).join('')).toBe(r.output);
				for (const s of r.steps) {
					if (s.code === null) expect(s).toMatchObject({ raw: null, result: null, out: s.char });
					else {
						expect(BigInt(s.result!)).toBe(mod(s.raw!, 26n));
						expect(s.out).toBe(codeToLetter(s.result!));
					}
				}
			}
	});
	it('filters keys and advances only on letters', () => {
		expect(vigenere('a !ą🙂a a', 'B9ą🙂c', 'encrypt').output).toBe('b !ą🙂c b');
		for (const k of ['', 'ą 12🙂']) error(() => vigenere('abc', k, 'encrypt'), 'key');
	});
	it('validates affine keys and modulus in both modes', () => {
		for (const mode of ['encrypt', 'decrypt'] as const) {
			for (const a of [0n, 2n, 13n]) {
				error(() => affine('', { a, b: 0n }, mode), 'a');
				error(() => affineNumber(1n, { a, b: 0n }, mode, 26n), 'a');
			}
			for (const n of [-1n, 0n, 1n]) error(() => affineNumber(0n, { a: 1n, b: 0n }, mode, n), 'n');
			expect(affine('a', { a: 3n, b: 7n }, mode).aInverse).toBe(9n);
		}
	});
	it('computes affine raw values', () => {
		expect(affineValue(5n, { a: 3n, b: 7n }, 'encrypt', 26n)).toEqual({ raw: 22n, result: 22n });
		expect(affineValue(2n, { a: 3n, b: 7n }, 'decrypt', 26n)).toEqual({ raw: -45n, result: 7n });
	});
	it('round trips arbitrary Unicode and supports equivalent Caesar keys', () => {
		fc.assert(
			fc.property(unicode, fc.bigInt(), validA, fc.bigInt(), (s, k, a, b) => {
				const expected = lower(s);
				expect(caesar(caesar(s, k, 'encrypt').output, k, 'decrypt').output).toBe(expected);
				expect(caesar(s, k, 'encrypt').output).toBe(caesar(s, k + 26n, 'encrypt').output);
				expect(caesar(s, k, 'encrypt').output).toBe(caesar(s, -k, 'decrypt').output);
				expect(affine(affine(s, { a, b }, 'encrypt').output, { a, b }, 'decrypt').output).toBe(expected);
				expect(vigenere(vigenere(s, 'A!ąz🙂key', 'encrypt').output, 'A!ąz🙂key', 'decrypt').output).toBe(
					expected,
				);
			}),
		);
	});
	it('round trips numeric affine residues', () => {
		fc.assert(
			fc.property(fc.bigInt(), fc.bigInt(), fc.bigInt({ min: 2n, max: 10000n }), (x, b, n) => {
				const a = n + 1n;
				const enc = affineNumber(x, { a, b }, 'encrypt', n);
				expect(enc.result).toBe(mod(enc.raw, n));
				expect(mod(a * enc.aInverse, n)).toBe(1n);
				expect(affineNumber(enc.result, { a, b }, 'decrypt', n).result).toBe(mod(x, n));
			}),
		);
	});
});
