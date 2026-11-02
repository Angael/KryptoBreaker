import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
	InputError,
	parseInteger,
	assertModulus,
	mod,
	abs,
	gcd,
	extendedEuclid,
	modInverse,
	inverseSearch,
	modPow,
	isPrime,
	assertRange,
	assertPrime,
} from './modular';

const big = fc.bigInt({ min: -(1n << 256n), max: 1n << 256n });
const positive = fc.bigInt({ min: 1n, max: 1n << 128n });
const normalize = (a: bigint, m: bigint) => ((a % m) + m) % m;
function referencePow(a: bigint, e: bigint, m: bigint): bigint {
	let r = 1n % m;
	// Left-to-right binary exponentiation, independent of the implementation's trace.
	for (const bit of e.toString(2)) {
		r = (r * r) % m;
		if (bit === '1') r = (r * normalize(a, m)) % m;
	}
	return r;
}
function errorField(fn: () => unknown, field: string) {
	expect(fn).toThrow(InputError);
	try {
		fn();
	} catch (error) {
		expect((error as InputError).field).toBe(field);
	}
}

describe('input validation', () => {
	it('InputError preserves message, name and optional field', () => {
		const e = new InputError('bad', 'value');
		expect(e).toBeInstanceOf(Error);
		expect(e.message).toBe('bad');
		expect(e.name).toBe('InputError');
		expect(e.field).toBe('value');
		expect(new InputError('bad').field).toBeUndefined();
	});
	it.each(['', ' ', '1.5', '1e3', '0x10', 'abc', '+', '--1', '1 2'])('rejects invalid decimal %j', (raw) =>
		expect(parseInteger(raw)).toBeNull(),
	);
	it.each([
		[' -12 ', -12n],
		['+7', 7n],
		['0000', 0n],
		['9'.repeat(100), BigInt('9'.repeat(100))],
	] as const)('parses %s', (raw, value) => expect(parseInteger(raw)).toBe(value));
	it('round trips large signed integers', () =>
		fc.assert(
			fc.property(big, (a) => {
				expect(parseInteger(a.toString())).toBe(a);
			}),
		));
	it.each([0n, -1n, -100n])('rejects invalid modulus %s with correct fields', (m) => {
		errorField(() => assertModulus(m), 'modulus');
		errorField(() => assertModulus(m, 'custom'), 'custom');
		errorField(() => mod(3n, m), 'modulus');
		errorField(() => modPow(3n, 2n, m), 'modulus');
		for (const fn of [extendedEuclid, modInverse, inverseSearch]) errorField(() => fn(3n, m), 'n');
	});
	it('accepts positive moduli and rejects negative exponents', () => {
		expect(assertModulus(1n)).toBeUndefined();
		errorField(() => modPow(2n, -1n, 7n), 'exponent');
	});
	it('validates inclusive ranges and empty ranges', () => {
		for (const v of [2n, 3n, 4n]) expect(assertRange(v, 2n, 4n, 'v')).toBeUndefined();
		for (const v of [1n, 5n]) errorField(() => assertRange(v, 2n, 4n, 'v', 'Value'), 'v');
		errorField(() => assertRange(3n, 4n, 2n, 'v'), 'v');
	});
	it('validates primes with default and custom fields', () => {
		expect(assertPrime(97n)).toBeUndefined();
		errorField(() => assertPrime(1n), 'p');
		errorField(() => assertPrime(561n, 'q'), 'q');
	});
});

describe('integer arithmetic and inverses', () => {
	it('handles known values and zero boundaries', () => {
		expect(mod(-3n, 26n)).toBe(23n);
		expect(mod(99n, 1n)).toBe(0n);
		expect(abs(-12n)).toBe(12n);
		expect(abs(0n)).toBe(0n);
		expect(abs(12n)).toBe(12n);
		expect(gcd(0n, 0n)).toBe(0n);
		expect(gcd(-54n, 24n)).toBe(6n);
		expect(modInverse(215n, 25n)).toBeNull();
		expect(modInverse(215n, 26n)).toBe(15n);
		expect(modInverse(0n, 1n)).toBe(0n);
		expect(extendedEuclid(0n, 7n).steps).toEqual([]);
	});
	it('normalizes modulo and preserves congruence', () =>
		fc.assert(
			fc.property(big, positive, (a, m) => {
				const r = mod(a, m);
				expect(r >= 0n && r < m).toBe(true);
				expect((a - r) % m).toBe(0n);
				expect(abs(a)).toBe(a < 0n ? -a : a);
			}),
		));
	it('gcd divides both operands and obeys Euclidean recurrence', () =>
		fc.assert(
			fc.property(big, positive, (a, b) => {
				const g = gcd(a, b);
				expect(g > 0n).toBe(true);
				expect(a % g).toBe(0n);
				expect(b % g).toBe(0n);
				expect(g).toBe(gcd(b, mod(a, b)));
			}),
		));
	it('extended Euclid maintains every quotient and coefficient invariant', () =>
		fc.assert(
			fc.property(big, positive, (a, n) => {
				const result = extendedEuclid(a, n);
				expect(result.a).toBe(a);
				expect(result.n).toBe(n);
				expect(result.aReduced).toBe(normalize(a, n));
				expect(result.gcd).toBe(gcd(a, n));
				let dividend = n,
					divisor = normalize(a, n),
					tp = 0n,
					t = 1n;
				result.steps.forEach((s, i) => {
					expect(s.i).toBe(i);
					expect(s.dividend).toBe(dividend);
					expect(s.divisor).toBe(divisor);
					expect(s.tPrev).toBe(tp);
					expect(s.t).toBe(t);
					expect(s.dividend).toBe(s.q * s.divisor + s.r);
					expect(s.r >= 0n && s.r < s.divisor).toBe(true);
					expect(s.tNext).toBe(tp - s.q * t);
					expect(normalize(s.r - s.tNext * a, n)).toBe(0n);
					[dividend, divisor, tp, t] = [divisor, s.r, t, s.tNext];
				});
				expect(divisor).toBe(0n);
				expect(dividend).toBe(result.gcd);
				expect(result.inverseBeforeMod).toBe(tp);
				const inv = modInverse(a, n);
				expect(inv !== null).toBe(gcd(a, n) === 1n);
				expect(result.inverse).toBe(inv);
				if (inv !== null) {
					expect(inv >= 0n && inv < n).toBe(true);
					expect(normalize(a * inv, n)).toBe(1n % n);
				}
			}),
		));
	it('brute force agrees with Euclid and records consecutive valid trials', () =>
		fc.assert(
			fc.property(big, fc.bigInt({ min: 1n, max: 500n }), (a, n) => {
				const r = inverseSearch(a, n);
				expect(r.inverse).toBe(modInverse(a, n));
				r.trials.forEach((row, i) => {
					expect(row.i).toBe(BigInt(i));
					expect(row.value).toBe(normalize(a * row.i, n));
				});
				if (r.inverse !== null) expect(r.trials.at(-1)?.i).toBe(r.inverse);
				else expect(r.trials).toEqual([]);
			}),
		));
});

describe('modular exponentiation', () => {
	it.each([
		[100000001n, 2n, 100000007n, 36n],
		[2n, 4294967296n, 7n, 2n],
		[-123n, 0n, 1n, 0n],
		[0n, 0n, 7n, 1n],
		[-3n, 3n, 26n, 25n],
	])('computes %s^%s mod %s', (a, e, m, result) => expect(modPow(a, e, m).result).toBe(result));
	it('agrees with naive multiplication for small exponents', () =>
		fc.assert(
			fc.property(big, fc.integer({ min: 0, max: 50 }), positive, (a, e, m) => {
				let r = 1n % m;
				for (let i = 0; i < e; i++) r = normalize(r * a, m);
				expect(modPow(a, BigInt(e), m).result).toBe(r);
			}),
		));
	it('agrees with reference powmod for large exponents and validates the entire trace', () =>
		fc.assert(
			fc.property(big, fc.bigInt({ min: 0n, max: 1n << 128n }), positive, (a, e, m) => {
				const r = modPow(a, e, m);
				expect(r.result).toBe(referencePow(a, e, m));
				expect(r.base).toBe(a);
				expect(r.exponent).toBe(e);
				expect(r.modulus).toBe(m);
				expect(r.binary).toBe(e.toString(2));
				const bits = [...r.binary].reverse();
				expect(r.steps).toHaveLength(bits.length + 1);
				expect(r.steps[0].x).toBe(1n % m);
				expect(r.steps[0].a).toBe(normalize(a, m));
				r.steps.forEach((row, i) => {
					expect(row.i).toBe(i);
					if (i > 0) {
						const prev = r.steps[i - 1];
						expect(row.x).toBe(prev.t === 1 ? normalize(prev.x * prev.a!, m) : prev.x);
						if (row.a !== null) expect(row.a).toBe(prev.a! ** 2n % m);
					}
					if (i === bits.length) {
						expect(row.a).toBeNull();
						expect(row.t).toBeNull();
						expect(row.x).toBe(r.result);
					} else expect(row.t).toBe(Number(bits[i]));
				});
			}),
		));
});

describe('primality', () => {
	it.each([-7n, 0n, 1n, 4n, 561n, 41041n, 2n ** 89n + 1n])('rejects composite or nonprime %s', (n) =>
		expect(isPrime(n)).toBe(false),
	);
	it.each([2n, 3n, 41n, 97n, 2147483647n, 2n ** 89n - 1n])('accepts known prime %s', (n) =>
		expect(isPrime(n)).toBe(true),
	);
	it('agrees exhaustively with trial division below 20000', () => {
		for (let n = 0; n < 20000; n++) {
			let prime = n >= 2;
			for (let d = 2; d * d <= n; d++)
				if (n % d === 0) {
					prime = false;
					break;
				}
			expect(isPrime(BigInt(n)), `n=${n}`).toBe(prime);
		}
	});
	it('rejects products of two primes including prime squares', () =>
		fc.assert(
			fc.property(
				fc.constantFrom(2n, 3n, 43n, 97n, 1009n, 2147483647n, 2n ** 89n - 1n),
				fc.constantFrom(2n, 43n, 97n, 1009n, 2147483647n),
				(p, q) => {
					expect(isPrime(p * q)).toBe(false);
				},
			),
		));
});

describe('modPow explanation at modulus 1', () => {
	it('notes the reduction of x₀', () => {
		const r = modPow(2n, 3n, 1n);
		expect(r.steps[0]!.x).toBe(0n);
		expect(r.steps[0]!.xNote).toBe('x₀ = 1 mod 1 = 0');
	});
});
