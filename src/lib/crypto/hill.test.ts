import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import {
	identity,
	isSquare,
	matMul,
	matMod,
	determinant,
	adjugate,
	invertMatrixMod,
	isKeyInvertible,
	hill,
	type Matrix,
} from './hill';
import { InputError, gcd, mod } from './modular';
const key = [
	[9n, 3n, 4n],
	[7n, 2n, 1n],
	[6n, 5n, 8n],
];
const matrices = (max = 6) =>
	fc
		.integer({ min: 1, max })
		.chain((n) =>
			fc.array(
				fc.array(fc.bigInt({ min: -1000000000000n, max: 1000000000000n }), { minLength: n, maxLength: n }),
				{ minLength: n, maxLength: n },
			),
		);
function laplace(m: Matrix): bigint {
	return m.length === 1
		? m[0][0]
		: m[0].reduce(
				(s, v, j) => s + (j % 2 ? -1n : 1n) * v * laplace(m.slice(1).map((r) => r.filter((_, k) => k !== j))),
				0n,
			);
}
function error(fn: () => unknown, field: string) {
	expect(fn).toThrow(InputError);
	try {
		fn();
	} catch (e) {
		expect(e).toMatchObject({ field });
	}
}
describe('Hill and matrix arithmetic', () => {
	it('implements matrix primitives', () => {
		expect(identity(2)).toEqual([
			[1n, 0n],
			[0n, 1n],
		]);
		expect(isSquare([])).toBe(false);
		expect(isSquare([[1n, 2n]])).toBe(false);
		expect(matMul([[1n, 2n]], [[3n], [4n]])).toEqual([[11n]]);
		expect(() => matMul([[1n]], identity(2))).toThrow(InputError);
		expect(matMod([[-1n, 27n]])).toEqual([[25n, 1n]]);
		expect(matMod([[-1n, 8n]], 7n)).toEqual([[6n, 1n]]);
		for (const f of [determinant, adjugate]) expect(() => f([])).toThrow(InputError);
	});
	it('matches the known vector', () => {
		expect(hill('telewizor', key, 'encrypt').output).toBe('fqmesyjgq');
		expect(hill('fqmesyjgq', key, 'decrypt').output).toBe('telewizor');
		expect(
			isKeyInvertible([
				[2n, 0n],
				[0n, 1n],
			]),
		).toBe(false);
		expect(
			isKeyInvertible([
				[27n, 0n],
				[0n, 1n],
			]),
		).toBe(true);
		expect(isKeyInvertible([])).toBe(false);
	});
	it('matches Laplace determinants, adjugates, and modular inverses', () => {
		fc.assert(
			fc.property(matrices(), (m) => {
				const det = laplace(m);
				expect(determinant(m)).toBe(det);
				expect(matMul(adjugate(m), m)).toEqual(identity(m.length).map((r) => r.map((v) => v * det)));
				const inv = invertMatrixMod(m);
				if (gcd(det, 26n) !== 1n) expect(inv).toBeNull();
				else {
					expect(matMod(matMul(inv!.inverse, m))).toEqual(identity(m.length));
					expect(inv!.det).toBe(det);
					expect(inv!.detMod).toBe(mod(det, 26n));
					expect(mod(inv!.detInverse * det, 26n)).toBe(1n);
				}
			}),
			{ numRuns: 80 },
		);
	});
	it('pads, drops nonletters, and reports products', () => {
		const r = hill('A!ą🙂bc', identity(2), 'encrypt');
		expect(r.output).toBe('abca');
		expect(r.padding).toBe(1);
		expect(r.ignored).toBe(3);
		expect(r.textMatrix).toEqual([
			[0n, 1n],
			[2n, 0n],
		]);
		expect(matMod(r.productBeforeMod)).toEqual(r.product);
	});
	it('rejects invalid keys and text', () => {
		for (const k of [[], [[1n]], [[1n, 2n]], identity(8)]) error(() => hill('abc', k, 'encrypt'), 'key');
		for (const mode of ['encrypt', 'decrypt', 'decrypt-with-inverse'] as const)
			error(() => hill('ą🙂 9', identity(2), mode), 'text');
		for (const mode of ['decrypt', 'decrypt-with-inverse'] as const)
			error(() => hill('abc', identity(2), mode), 'text');
		error(
			() =>
				hill(
					'ab',
					[
						[2n, 0n],
						[0n, 1n],
					],
					'decrypt',
				),
			'key',
		);
		expect(hill('ab', identity(7), 'encrypt').padding).toBe(5);
	});
	it('round trips random invertible keys and block-aligned letters', () => {
		const cases = fc.integer({ min: 2, max: 5 }).chain((n) =>
			fc.tuple(
				fc
					.array(fc.array(fc.bigInt({ min: -30n, max: 30n }), { minLength: n, maxLength: n }), {
						minLength: n,
						maxLength: n,
					})
					.filter(isKeyInvertible),
				fc.array(fc.integer({ min: 0, max: 25 }), { minLength: n, maxLength: n * 8 }).map((a) => {
					a = a.slice(0, a.length - (a.length % n));
					return a.map((v) => String.fromCharCode(97 + v)).join('');
				}),
			),
		);
		fc.assert(
			fc.property(cases, ([m, text]) => {
				const enc = hill(text, m, 'encrypt');
				const dec = hill(enc.output, m, 'decrypt');
				expect(dec.output).toBe(text);
				expect(hill(enc.output, invertMatrixMod(m)!.inverse, 'decrypt-with-inverse').output).toBe(dec.output);
				for (const r of [enc, dec]) expect(matMod(r.productBeforeMod)).toEqual(r.product);
			}),
			{ numRuns: 60 },
		);
	});
});

describe('large Hill keys', () => {
	// Unit upper-triangular times unit lower-triangular: det = 1, so always invertible.
	const key = (n: number) => {
		const u = Array.from({ length: n }, (_, i) =>
			Array.from({ length: n }, (_, j) => (j === i ? 1n : j > i ? BigInt(i + 2 * j + 3) : 0n)),
		);
		const l = Array.from({ length: n }, (_, i) =>
			Array.from({ length: n }, (_, j) => (j === i ? 1n : j < i ? BigInt(3 * i + j + 1) : 0n)),
		);
		return matMul(u, l);
	};
	for (const n of [6, 7]) {
		it(`inverts and round-trips a ${n}×${n} key`, () => {
			const k = key(n);
			const inv = invertMatrixMod(k)!;
			expect(matMod(matMul(k, inv.inverse))).toEqual(identity(n));
			const text = 'thequickbrownfoxjumpsoverthelazydogs'.slice(0, n * 4);
			const enc = hill(text, k, 'encrypt');
			expect(hill(enc.output, k, 'decrypt').output).toBe(text);
		});
	}
	it('rejects ragged matrices', () => {
		expect(() => matMul([[1n, 1n]], [[1n], [2n, 3n]])).toThrow(InputError);
	});
});
