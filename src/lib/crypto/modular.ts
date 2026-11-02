/** Thrown when an input is outside an algorithm's domain. `field` names the offending input. */
export class InputError extends Error {
	readonly field?: string;
	constructor(message: string, field?: string) {
		super(message);
		this.name = 'InputError';
		this.field = field;
	}
}

/** Parses a signed decimal integer. Returns null for anything else (empty, decimals, exponents, junk). */
export function parseInteger(raw: string): bigint | null {
	const s = raw.trim();
	if (!/^[+-]?\d+$/.test(s)) return null;
	return BigInt(s);
}

export function assertModulus(m: bigint, field = 'modulus'): void {
	if (m < 1n) throw new InputError('Modulus must be a positive integer.', field);
}

/** Mathematical modulo: result is always in [0, m). Requires m ≥ 1. */
export function mod(a: bigint, m: bigint): bigint {
	assertModulus(m);
	const r = a % m;
	return r < 0n ? r + m : r;
}

export function abs(a: bigint): bigint {
	return a < 0n ? -a : a;
}

export function gcd(a: bigint, b: bigint): bigint {
	a = abs(a);
	b = abs(b);
	while (b !== 0n) [a, b] = [b, a % b];
	return a;
}

export interface EuclidStep {
	i: number;
	/** Dividend r(i-1). */
	dividend: bigint;
	/** Divisor r(i). */
	divisor: bigint;
	/** Quotient ⌊dividend / divisor⌋. */
	q: bigint;
	/** Remainder dividend − q·divisor. */
	r: bigint;
	/** Coefficient t(i-1) of the dividend. */
	tPrev: bigint;
	/** Coefficient t(i) of the divisor. */
	t: bigint;
	/** New coefficient t(i+1) = t(i-1) − q·t(i), paired with r. */
	tNext: bigint;
}

export interface EuclidResult {
	a: bigint;
	n: bigint;
	/** a reduced into [0, n). The table starts from (n, aReduced). */
	aReduced: bigint;
	steps: EuclidStep[];
	gcd: bigint;
	/** Bézout coefficient of a before reduction mod n (only meaningful when gcd = 1). */
	inverseBeforeMod: bigint;
	/** a⁻¹ mod n, or null when gcd(a, n) ≠ 1. */
	inverse: bigint | null;
}

/**
 * Extended Euclidean algorithm tracking only the coefficient of `a`:
 * every remainder r(i) satisfies r(i) ≡ t(i)·a (mod n).
 */
export function extendedEuclid(a: bigint, n: bigint): EuclidResult {
	assertModulus(n, 'n');
	const aReduced = mod(a, n);
	const steps: EuclidStep[] = [];
	let rPrev = n;
	let r = aReduced;
	let tPrev = 0n;
	let t = 1n;
	let i = 0;
	while (r !== 0n) {
		const q = rPrev / r;
		const rNext = rPrev - q * r;
		const tNext = tPrev - q * t;
		steps.push({ i, dividend: rPrev, divisor: r, q, r: rNext, tPrev, t, tNext });
		[rPrev, r] = [r, rNext];
		[tPrev, t] = [t, tNext];
		i++;
	}
	const g = rPrev;
	return {
		a,
		n,
		aReduced,
		steps,
		gcd: g,
		inverseBeforeMod: tPrev,
		inverse: g === 1n ? mod(tPrev, n) : null,
	};
}

export function modInverse(a: bigint, n: bigint): bigint | null {
	return extendedEuclid(a, n).inverse;
}

/** Brute-force inverse search a·i mod n for i = 0, 1, … — the "by hand" method. */
export function inverseSearch(
	a: bigint,
	n: bigint,
): { trials: { i: bigint; value: bigint }[]; inverse: bigint | null } {
	assertModulus(n, 'n');
	const trials: { i: bigint; value: bigint }[] = [];
	if (gcd(a, n) !== 1n) {
		return { trials, inverse: null };
	}
	for (let i = 0n; i < n; i++) {
		const value = mod(a * i, n);
		trials.push({ i, value });
		if (value === mod(1n, n)) return { trials, inverse: i };
	}
	return { trials, inverse: null };
}

export interface PowStep {
	i: number;
	/** Running result x(i). */
	x: bigint;
	/** Repeated square a(i) = base^(2^i) mod m; null on the final row. */
	a: bigint | null;
	/** Bit t(i) of the exponent (least significant first); null on the final row. */
	t: 0 | 1 | null;
	xNote: string;
	aNote: string;
}

export interface PowResult {
	base: bigint;
	exponent: bigint;
	modulus: bigint;
	/** Exponent in binary, most significant bit first. */
	binary: string;
	steps: PowStep[];
	result: bigint;
}

/** Square-and-multiply modular exponentiation with a full trace. Requires exponent ≥ 0 and modulus ≥ 1. */
export function modPow(base: bigint, exponent: bigint, modulus: bigint): PowResult {
	assertModulus(modulus);
	if (exponent < 0n) throw new InputError('Exponent must be a non-negative integer.', 'exponent');

	const binary = exponent.toString(2);
	const bits = [...binary].reverse().map((b) => (b === '1' ? 1 : 0) as 0 | 1);
	const a0 = mod(base, modulus);
	const steps: PowStep[] = [
		{
			i: 0,
			x: mod(1n, modulus),
			a: a0,
			t: bits[0] ?? 0,
			xNote: modulus === 1n ? 'x₀ = 1 mod 1 = 0' : 'x₀ = 1',
			aNote: base === a0 ? `a₀ = ${base}` : `a₀ = ${base} mod ${modulus} = ${a0}`,
		},
	];

	for (let i = 1; i <= bits.length; i++) {
		const prev = steps[i - 1]!;
		const prevA = prev.a!;
		const isLast = i === bits.length;
		const x = prev.t ? mod(prev.x * prevA, modulus) : prev.x;
		const a = isLast ? null : mod(prevA * prevA, modulus);
		steps.push({
			i,
			x,
			a,
			t: isLast ? null : bits[i]!,
			xNote: prev.t ? `${prev.x} · ${prevA} mod ${modulus} = ${x}` : `t${sub(i - 1)} = 0, unchanged`,
			aNote: a === null ? '' : `${prevA}² mod ${modulus} = ${a}`,
		});
	}

	return { base, exponent, modulus, binary, steps, result: steps[steps.length - 1]!.x };
}

const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉';
function sub(n: number): string {
	return [...String(n)].map((d) => SUBSCRIPTS[Number(d)]).join('');
}

const MR_BASES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n];

function powMod(b: bigint, e: bigint, m: bigint): bigint {
	let r = 1n;
	b %= m;
	while (e > 0n) {
		if (e & 1n) r = (r * b) % m;
		b = (b * b) % m;
		e >>= 1n;
	}
	return r;
}

/** Miller–Rabin. Deterministic for n < 3.3·10²⁴; for larger n a false positive is astronomically unlikely. */
export function isPrime(n: bigint): boolean {
	if (n < 2n) return false;
	for (const p of MR_BASES) {
		if (n === p) return true;
		if (n % p === 0n) return false;
	}
	let d = n - 1n;
	let s = 0;
	while ((d & 1n) === 0n) {
		d >>= 1n;
		s++;
	}
	outer: for (const a of MR_BASES) {
		let x = powMod(a, d, n);
		if (x === 1n || x === n - 1n) continue;
		for (let r = 1; r < s; r++) {
			x = (x * x) % n;
			if (x === n - 1n) continue outer;
		}
		return false;
	}
	return true;
}

/** Throws InputError unless lo ≤ v ≤ hi. */
export function assertRange(v: bigint, lo: bigint, hi: bigint, field: string, label = field): void {
	if (hi < lo) throw new InputError(`No valid ${label} exists for these parameters.`, field);
	if (v < lo || v > hi) throw new InputError(`${label} must be between ${lo} and ${hi}.`, field);
}

export function assertPrime(p: bigint, field = 'p'): void {
	if (!isPrime(p)) throw new InputError(`${field} must be prime.`, field);
}
