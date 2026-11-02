import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { InputError } from './modular';
import {
	diffieHellman,
	rsaKeys,
	rsaEncrypt,
	rsaDecrypt,
	rsaSign,
	rsaVerify,
	elgamalKeys,
	elgamalEncrypt,
	elgamalDecrypt,
	elgamalSign,
	elgamalVerify,
} from './public-key';

const primes = [5n, 7n, 11n, 23n, 47n, 1019n, 1000000000039n, 2305843009213693951n];
const prime = fc.constantFrom(...primes);
const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? a : gcd(b, a % b));
function pow(a: bigint, b: bigint, n: bigint): bigint {
	let result = 1n;
	for (; b > 0n; b >>= 1n, a = (a * a) % n) if (b & 1n) result = (result * a) % n;
	return result;
}
function error(field: string, action: () => unknown) {
	try {
		action();
	} catch (e) {
		expect(e).toBeInstanceOf(InputError);
		expect((e as InputError).field).toBe(field);
		return;
	}
	throw new Error(`Expected InputError for ${field}`);
}
const keys = elgamalKeys(23n, 5n, 6n);
const cases: [string, () => unknown][] = [];
for (const p of [3n, 9n]) cases.push(['p', () => diffieHellman(p, 2n, 2n, 2n)]);
for (const i of [1, 2, 3])
	for (const v of [1n, 22n]) {
		const args: [bigint, bigint, bigint, bigint] = [23n, 5n, 6n, 7n];
		args[i] = v;
		cases.push([['p', 'g', 'a', 'b'][i], () => diffieHellman(...args)]);
	}
cases.push(
	['p', () => rsaKeys(9n, 5n, 3n)],
	['q', () => rsaKeys(3n, 9n, 3n)],
	['q', () => rsaKeys(5n, 5n, 3n)],
);
for (const e of [1n, 8n, 2n]) cases.push(['e', () => rsaKeys(3n, 5n, e)]);
for (const [op, field, exponent] of [
	[rsaEncrypt, 'x', 'e'],
	[rsaDecrypt, 'y', 'd'],
	[rsaSign, 'h', 'd'],
] as const) {
	for (const n of [-1n, 0n, 1n]) cases.push(['n', () => op(0n, 1n, n)]);
	for (const e of [-1n, 0n]) cases.push([exponent, () => op(0n, e, 5n)]);
	for (const x of [-1n, 5n]) cases.push([field, () => op(x, 1n, 5n)]);
}
for (const n of [0n, 1n]) cases.push(['n', () => rsaVerify(0n, 0n, 1n, n)]);
for (const e of [-1n, 0n]) cases.push(['e', () => rsaVerify(0n, 0n, e, 5n)]);
for (const v of [-1n, 5n])
	cases.push(['h', () => rsaVerify(v, 0n, 1n, 5n)], ['s', () => rsaVerify(0n, v, 1n, 5n)]);
for (const p of [2n, 9n]) cases.push(['p', () => elgamalKeys(p, 2n, 1n)]);
it('accepts the smallest ElGamal group p = 3', () => expect(elgamalKeys(3n, 2n, 1n).beta.result).toBe(2n));
for (const a of [0n, 1n, 23n]) cases.push(['alpha', () => elgamalKeys(23n, a, 6n)]);
for (const t of [0n, 22n]) cases.push(['t', () => elgamalKeys(23n, 5n, t)]);
for (const x of [-1n, 23n]) cases.push(['x', () => elgamalEncrypt(keys, x, 1n)]);
for (const r of [0n, 22n])
	cases.push(['r', () => elgamalEncrypt(keys, 0n, r)], ['r', () => elgamalSign(keys, 13n, r)]);
cases.push(['r', () => elgamalSign(keys, 13n, 2n)]);
for (const v of [-1n, 0n, 23n])
	cases.push(['y1', () => elgamalDecrypt(keys, v, 0n)], ['u', () => elgamalVerify(keys, 0n, v, 0n)]);
for (const v of [-1n, 23n]) cases.push(['y2', () => elgamalDecrypt(keys, 1n, v)]);
for (const s of [-1n, 22n]) cases.push(['s', () => elgamalVerify(keys, 0n, 1n, s)]);
cases.push(['h', () => elgamalSign(keys, -1n, 1n)], ['h', () => elgamalVerify(keys, -1n, 1n, 0n)]);

describe('public-key validation', () => {
	cases.forEach(([field, action], i) => it(`rejects invalid ${field} (${i})`, () => error(field, action)));
});
it('matches all application default vectors', () => {
	const dh = diffieHellman(1019n, 2n, 638n, 719n);
	expect(dh.shared).toBe(498n);
	expect(dh.sharedFromA.result).toBe(dh.sharedFromB.result);
	expect(rsaKeys(37n, 47n, 1001n)).toMatchObject({ n: 1739n, phi: 1656n, d: 761n });
	expect(rsaEncrypt(20n, 1001n, 1739n).result).toBe(1327n);
	expect(rsaDecrypt(1327n, 761n, 1739n).result).toBe(20n);
	expect(rsaSign(357n, 761n, 1739n).result).toBe(1630n);
	expect(rsaVerify(357n, 1630n, 1001n, 1739n).valid).toBe(true);
	expect(rsaVerify(358n, 1630n, 1001n, 1739n).valid).toBe(false);
	expect(rsaVerify(357n, 1631n, 1001n, 1739n).valid).toBe(false);
	const k = elgamalKeys(1619n, 2n, 937n);
	expect(k.beta.result).toBe(1454n);
	const s = elgamalSign(k, 357n, 515n);
	expect(s.u.result).toBe(1310n);
	expect(s.s).toBe(1579n);
	expect(elgamalVerify(k, 357n, s.u.result, s.s).valid).toBe(true);
	const c = elgamalEncrypt(k, 20n, 320n);
	expect(c.y1.result).toBe(130n);
	expect(c.y2).toBe(414n);
	expect(elgamalDecrypt(k, 130n, 414n).x).toBe(20n);
});
it('DH agrees with independent modular exponentiation', () => {
	fc.assert(
		fc.property(
			prime.chain((p) =>
				fc.tuple(fc.constant(p), ...Array.from({ length: 3 }, () => fc.bigInt({ min: 2n, max: p - 2n }))),
			),
			([p, g, a, b]) => {
				const d = diffieHellman(p, g, a, b);
				expect(d.shared).toBe(pow(g, a * b, p));
				expect(d.sharedFromA.result).toBe(d.sharedFromB.result);
			},
		),
		{ numRuns: 100 },
	);
});
it('RSA round trips and rejects changed hashes for random valid keys', () => {
	const arb = fc
		.tuple(prime, prime)
		.filter(([p, q]) => p !== q)
		.chain(([p, q]) => {
			const phi = (p - 1n) * (q - 1n);
			return fc.tuple(
				fc.constant(p),
				fc.constant(q),
				fc.bigInt({ min: 2n, max: phi - 1n }).filter((e) => gcd(e, phi) === 1n),
				fc.bigInt({ min: 0n, max: p * q - 1n }),
			);
		});
	fc.assert(
		fc.property(arb, ([p, q, e, x]) => {
			const k = rsaKeys(p, q, e);
			expect((e * k.d) % k.phi).toBe(1n);
			expect(rsaDecrypt(rsaEncrypt(x, e, k.n).result, k.d, k.n).result).toBe(x);
			const s = rsaSign(x, k.d, k.n).result;
			expect(rsaVerify(x, s, e, k.n).valid).toBe(true);
			expect(rsaVerify((x + 1n) % k.n, s, e, k.n).valid).toBe(false);
		}),
		{ numRuns: 100 },
	);
});
it('ElGamal encryption and signing round trip across BigInt groups', () => {
	const arb = prime.chain((p) =>
		fc.tuple(
			fc.constant(p),
			fc.bigInt({ min: 2n, max: p - 1n }),
			fc.bigInt({ min: 1n, max: p - 2n }),
			fc.bigInt({ min: 0n, max: p - 1n }),
			fc.bigInt({ min: 1n, max: p - 2n }),
			fc.bigInt({ min: 0n, max: p * p }),
			fc.bigInt({ min: 1n, max: p - 2n }).filter((r) => gcd(r, p - 1n) === 1n),
		),
	);
	fc.assert(
		fc.property(arb, ([p, a, t, x, r, h, nonce]) => {
			const k = elgamalKeys(p, a, t),
				c = elgamalEncrypt(k, x, r);
			expect(elgamalDecrypt(k, c.y1.result, c.y2).x).toBe(x);
			const s = elgamalSign(k, h, nonce);
			expect(elgamalVerify(k, h, s.u.result, s.s).valid).toBe(true);
		}),
		{ numRuns: 100 },
	);
});
it('generator signatures reject a hash increment', () => {
	// 22 = 2*11; these checks establish that 5 has order 22 modulo 23.
	expect(pow(5n, 2n, 23n)).not.toBe(1n);
	expect(pow(5n, 11n, 23n)).not.toBe(1n);
	fc.assert(
		fc.property(
			fc.bigInt({ min: 0n, max: 1n << 100n }),
			fc.constantFrom(1n, 3n, 5n, 7n, 9n, 13n, 15n, 17n, 19n, 21n),
			(h, r) => {
				const s = elgamalSign(keys, h, r);
				expect(elgamalVerify(keys, h, s.u.result, s.s).valid).toBe(true);
				expect(elgamalVerify(keys, h + 1n, s.u.result, s.s).valid).toBe(false);
			},
		),
	);
});
it('accepts endpoint plaintexts and exponents', () => {
	for (const x of [0n, 1n, 1729n, 1738n])
		expect(rsaDecrypt(rsaEncrypt(x, 1001n, 1739n).result, 761n, 1739n).result).toBe(x);
	for (const x of [0n, 22n])
		for (const r of [1n, 21n]) {
			const c = elgamalEncrypt(keys, x, r);
			expect(elgamalDecrypt(keys, c.y1.result, c.y2).x).toBe(x);
		}
	expect(rsaEncrypt(1n, 1n, 2n).result).toBe(1n);
	expect(elgamalKeys(23n, 22n, 21n).beta.result).toBe(22n);
});

describe('RSA with the smallest primes', () => {
	it('round-trips every message for p = 2, q = 5, e = 3', () => {
		const k = rsaKeys(2n, 5n, 3n);
		expect(k.d).toBe(3n);
		for (let x = 0n; x < k.n; x++) {
			expect(rsaDecrypt(rsaEncrypt(x, k.e, k.n).result, k.d, k.n).result).toBe(x);
		}
	});
});
