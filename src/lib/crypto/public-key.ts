import {
	type EuclidResult,
	type PowResult,
	InputError,
	assertPrime,
	assertRange,
	extendedEuclid,
	gcd,
	isPrime,
	mod,
	modPow,
} from './modular';

/* ---------------------------------- Diffie–Hellman ---------------------------------- */

export interface DiffieHellmanResult {
	/** A = gᵃ mod p, sent by party 1. */
	publicA: PowResult;
	/** B = gᵇ mod p, sent by party 2. */
	publicB: PowResult;
	/** Bᵃ mod p, computed by party 1. */
	sharedFromA: PowResult;
	/** Aᵇ mod p, computed by party 2. */
	sharedFromB: PowResult;
	shared: bigint;
}

export function diffieHellman(p: bigint, g: bigint, a: bigint, b: bigint): DiffieHellmanResult {
	assertPrime(p);
	if (p < 5n) throw new InputError('p must be at least 5.', 'p');
	assertRange(g, 2n, p - 2n, 'g');
	assertRange(a, 2n, p - 2n, 'a');
	assertRange(b, 2n, p - 2n, 'b');
	const publicA = modPow(g, a, p);
	const publicB = modPow(g, b, p);
	const sharedFromA = modPow(publicB.result, a, p);
	const sharedFromB = modPow(publicA.result, b, p);
	return { publicA, publicB, sharedFromA, sharedFromB, shared: sharedFromA.result };
}

/* --------------------------------------- RSA --------------------------------------- */

export interface RsaKeys {
	n: bigint;
	phi: bigint;
	e: bigint;
	d: bigint;
	euclid: EuclidResult;
}

export function rsaKeys(p: bigint, q: bigint, e: bigint): RsaKeys {
	assertPrime(p, 'p');
	assertPrime(q, 'q');
	if (p === q) throw new InputError('p and q must be different primes.', 'q');
	const n = p * q;
	const phi = (p - 1n) * (q - 1n);
	assertRange(e, 2n, phi - 1n, 'e');
	const euclid = extendedEuclid(e, phi);
	if (euclid.inverse === null) {
		throw new InputError(`e must be coprime with φ = ${phi} (gcd = ${euclid.gcd}).`, 'e');
	}
	return { n, phi, e, d: euclid.inverse, euclid };
}

function assertRsaModulus(n: bigint): void {
	if (n < 2n) throw new InputError('n must be at least 2.', 'n');
}

function assertExponent(v: bigint, field: string): void {
	if (v < 1n) throw new InputError(`${field} must be a positive integer.`, field);
}

/** y = xᵉ mod n. Requires 0 ≤ x < n. */
export function rsaEncrypt(x: bigint, e: bigint, n: bigint): PowResult {
	assertRsaModulus(n);
	assertExponent(e, 'e');
	assertRange(x, 0n, n - 1n, 'x');
	return modPow(x, e, n);
}

/** x = yᵈ mod n. Requires 0 ≤ y < n. */
export function rsaDecrypt(y: bigint, d: bigint, n: bigint): PowResult {
	assertRsaModulus(n);
	assertExponent(d, 'd');
	assertRange(y, 0n, n - 1n, 'y');
	return modPow(y, d, n);
}

/** s = hᵈ mod n. Requires 0 ≤ h < n. */
export function rsaSign(h: bigint, d: bigint, n: bigint): PowResult {
	assertRsaModulus(n);
	assertExponent(d, 'd');
	assertRange(h, 0n, n - 1n, 'h');
	return modPow(h, d, n);
}

/** Valid when sᵉ mod n = h. Requires 0 ≤ h, s < n. */
export function rsaVerify(h: bigint, s: bigint, e: bigint, n: bigint): { pow: PowResult; valid: boolean } {
	assertRsaModulus(n);
	assertExponent(e, 'e');
	assertRange(h, 0n, n - 1n, 'h');
	assertRange(s, 0n, n - 1n, 's');
	const pow = modPow(s, e, n);
	return { pow, valid: pow.result === h };
}

/* ------------------------------------- ElGamal ------------------------------------- */

export interface ElGamalKeys {
	p: bigint;
	alpha: bigint;
	/** Private exponent. */
	t: bigint;
	/** β = αᵗ mod p. */
	beta: PowResult;
}

function assertElGamalGroup(p: bigint, alpha: bigint): void {
	assertPrime(p);
	if (p < 3n) throw new InputError('p must be at least 3.', 'p');
	assertRange(alpha, 2n, p - 1n, 'alpha', 'α');
}

/** Public key (p, α, β), private key t with β = αᵗ mod p. Requires p prime, 2 ≤ α < p, 1 ≤ t ≤ p − 2. */
export function elgamalKeys(p: bigint, alpha: bigint, t: bigint): ElGamalKeys {
	assertElGamalGroup(p, alpha);
	assertRange(t, 1n, p - 2n, 't');
	return { p, alpha, t, beta: modPow(alpha, t, p) };
}

export interface ElGamalCiphertext {
	/** y₁ = αʳ mod p. */
	y1: PowResult;
	/** βʳ mod p. */
	mask: PowResult;
	/** y₂ = x·βʳ mod p. */
	y2: bigint;
}

/** C = (αʳ mod p, x·βʳ mod p). Requires 0 ≤ x < p and 1 ≤ r ≤ p − 2. */
export function elgamalEncrypt(keys: ElGamalKeys, x: bigint, r: bigint): ElGamalCiphertext {
	const { p, alpha, beta } = keys;
	assertRange(x, 0n, p - 1n, 'x');
	assertRange(r, 1n, p - 2n, 'r');
	const y1 = modPow(alpha, r, p);
	const mask = modPow(beta.result, r, p);
	return { y1, mask, y2: mod(x * mask.result, p) };
}

/** x = y₂·y₁^(p−1−t) mod p. Requires p prime, 1 ≤ y₁ < p, 0 ≤ y₂ < p. */
export function elgamalDecrypt(
	keys: ElGamalKeys,
	y1: bigint,
	y2: bigint,
): { exponent: bigint; pow: PowResult; x: bigint } {
	const { p, t } = keys;
	assertRange(y1, 1n, p - 1n, 'y1', 'y₁');
	assertRange(y2, 0n, p - 1n, 'y2', 'y₂');
	const exponent = p - 1n - t;
	const pow = modPow(y1, exponent, p);
	return { exponent, pow, x: mod(y2 * pow.result, p) };
}

export interface ElGamalSignature {
	/** u = αʳ mod p. */
	u: PowResult;
	/** Extended Euclid for r⁻¹ mod (p − 1). */
	rInverse: EuclidResult;
	/** s = r⁻¹·(h − t·u) mod (p − 1). */
	s: bigint;
}

/** Requires 1 ≤ r ≤ p − 2 with gcd(r, p − 1) = 1. */
export function elgamalSign(keys: ElGamalKeys, h: bigint, r: bigint): ElGamalSignature {
	const { p, alpha, t } = keys;
	if (h < 0n) throw new InputError('h must be non-negative.', 'h');
	assertRange(r, 1n, p - 2n, 'r');
	if (gcd(r, p - 1n) !== 1n) {
		throw new InputError(`r must be coprime with p − 1 = ${p - 1n} (gcd = ${gcd(r, p - 1n)}).`, 'r');
	}
	const u = modPow(alpha, r, p);
	const rInverse = extendedEuclid(r, p - 1n);
	const s = mod(rInverse.inverse! * (h - t * u.result), p - 1n);
	return { u, rInverse, s };
}

export interface ElGamalVerification {
	/** f = αʰ mod p. */
	f: PowResult;
	/** βᵘ mod p. */
	left: PowResult;
	/** uˢ mod p. */
	right: PowResult;
	/** g = βᵘ·uˢ mod p. */
	g: bigint;
	valid: boolean;
}

/** Valid when αʰ ≡ βᵘ·uˢ (mod p). Requires 1 ≤ u ≤ p − 1 and 0 ≤ s ≤ p − 2. */
export function elgamalVerify(keys: ElGamalKeys, h: bigint, u: bigint, s: bigint): ElGamalVerification {
	const { p, alpha, beta } = keys;
	if (h < 0n) throw new InputError('h must be non-negative.', 'h');
	assertRange(u, 1n, p - 1n, 'u');
	assertRange(s, 0n, p - 2n, 's');
	const f = modPow(alpha, h, p);
	const left = modPow(beta.result, u, p);
	const right = modPow(u, s, p);
	const g = mod(left.result * right.result, p);
	return { f, left, right, g, valid: f.result === g };
}

export { isPrime };
