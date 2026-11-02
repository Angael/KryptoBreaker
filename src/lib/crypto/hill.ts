import { ALPHABET_SIZE, codeToLetter, letterToCode } from './classical';
import { InputError, gcd, mod, modInverse } from './modular';

export type Matrix = bigint[][];
export type HillMode = 'encrypt' | 'decrypt' | 'decrypt-with-inverse';

export const HILL_MIN_SIZE = 2;
export const HILL_MAX_SIZE = 7;

export function identity(size: number): Matrix {
	return Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => (i === j ? 1n : 0n)));
}

export function isSquare(m: Matrix): boolean {
	return m.length > 0 && m.every((row) => row.length === m.length);
}

export function matMul(a: Matrix, b: Matrix): Matrix {
	const inner = b.length;
	const isRect = (m: Matrix) => m.every((row) => row.length === (m[0]?.length ?? 0));
	if (!isRect(a) || !isRect(b))
		throw new InputError('Matrix rows must all have the same length.', undefined, 'square');
	if (a.some((row) => row.length !== inner))
		throw new InputError('Matrix dimensions do not match.', undefined, 'square');
	const cols = b[0]?.length ?? 0;
	return a.map((row) =>
		Array.from({ length: cols }, (_, j) => row.reduce((s, v, k) => s + v * b[k]![j]!, 0n)),
	);
}

export function matMod(m: Matrix, n: bigint = ALPHABET_SIZE): Matrix {
	return m.map((row) => row.map((v) => mod(v, n)));
}

/** Exact integer determinant (Bareiss fraction-free elimination). */
export function determinant(m: Matrix): bigint {
	if (!isSquare(m)) throw new InputError('Matrix must be square.', undefined, 'square');
	const n = m.length;
	const a = m.map((row) => [...row]);
	let sign = 1n;
	let prev = 1n;
	for (let k = 0; k < n - 1; k++) {
		if (a[k]![k] === 0n) {
			const swap = a.findIndex((row, i) => i > k && row[k] !== 0n);
			if (swap === -1) return 0n;
			[a[k], a[swap]] = [a[swap]!, a[k]!];
			sign = -sign;
		}
		for (let i = k + 1; i < n; i++) {
			for (let j = k + 1; j < n; j++) {
				a[i]![j] = (a[i]![j]! * a[k]![k]! - a[i]![k]! * a[k]![j]!) / prev;
			}
		}
		prev = a[k]![k]!;
	}
	return sign * a[n - 1]![n - 1]!;
}

function minor(m: Matrix, row: number, col: number): Matrix {
	return m.filter((_, i) => i !== row).map((r) => r.filter((_, j) => j !== col));
}

/** Adjugate (transpose of the cofactor matrix). */
export function adjugate(m: Matrix): Matrix {
	if (!isSquare(m)) throw new InputError('Matrix must be square.', undefined, 'square');
	const n = m.length;
	if (n === 1) return [[1n]];
	return Array.from({ length: n }, (_, i) =>
		Array.from({ length: n }, (_, j) => ((i + j) % 2 === 0 ? 1n : -1n) * determinant(minor(m, j, i))),
	);
}

export interface MatrixInverse {
	det: bigint;
	detMod: bigint;
	detInverse: bigint;
	adjugate: Matrix;
	inverse: Matrix;
}

/** Inverse of a square matrix modulo n, or null when gcd(det, n) ≠ 1. */
export function invertMatrixMod(m: Matrix, n: bigint = ALPHABET_SIZE): MatrixInverse | null {
	const det = determinant(m);
	const detMod = mod(det, n);
	if (gcd(detMod, n) !== 1n) return null;
	const detInverse = modInverse(detMod, n)!;
	const adj = adjugate(m);
	return {
		det,
		detMod,
		detInverse,
		adjugate: matMod(adj, n),
		inverse: adj.map((r) => r.map((v) => mod(v * detInverse, n))),
	};
}

export function isKeyInvertible(key: Matrix): boolean {
	return isSquare(key) && gcd(mod(determinant(key), ALPHABET_SIZE), ALPHABET_SIZE) === 1n;
}

export interface HillResult {
	/** Letters of the input as row blocks of `size`, padded with `a` (0) when encrypting. */
	textMatrix: Matrix;
	/** Number of `a` letters appended to fill the last block. */
	padding: number;
	/** Number of non-letter characters that were dropped. */
	ignored: number;
	/** The matrix the text was multiplied by (the key, or its inverse for `decrypt`). */
	multiplier: Matrix;
	inverse: MatrixInverse | null;
	productBeforeMod: Matrix;
	product: Matrix;
	output: string;
	keyInvertible: boolean;
}

/**
 * Hill cipher with row vectors: C = P·K mod 26.
 * - `encrypt`: multiply by K.
 * - `decrypt`: multiply by K⁻¹ mod 26 (computed here).
 * - `decrypt-with-inverse`: the given matrix already is K⁻¹; multiply by it.
 */
export function hill(text: string, key: Matrix, mode: HillMode): HillResult {
	if (!isSquare(key)) throw new InputError('Key must be a square matrix.', 'key', 'square');
	const size = key.length;
	if (size < HILL_MIN_SIZE || size > HILL_MAX_SIZE) {
		throw new InputError(
			`Key size must be between ${HILL_MIN_SIZE} and ${HILL_MAX_SIZE}.`,
			'key',
			'keySize',
			{
				min: String(HILL_MIN_SIZE),
				max: String(HILL_MAX_SIZE),
			},
		);
	}
	const chars = [...text];
	const codes = chars.map(letterToCode).filter((c): c is number => c !== null);
	const ignored = chars.length - codes.length;
	if (codes.length === 0)
		throw new InputError('Text must contain at least one letter.', 'text', 'textLetter');

	const remainder = codes.length % size;
	let padding = 0;
	if (remainder !== 0) {
		if (mode !== 'encrypt') {
			throw new InputError(
				`Ciphertext length must be a multiple of ${size} (got ${codes.length} letters).`,
				'text',
				'blockMultiple',
				{ size: String(size), count: String(codes.length) },
			);
		}
		padding = size - remainder;
		codes.push(...Array<number>(padding).fill(0));
	}

	const textMatrix: Matrix = [];
	for (let i = 0; i < codes.length; i += size) textMatrix.push(codes.slice(i, i + size).map(BigInt));

	const keyInvertible = isKeyInvertible(key);
	let inverse: MatrixInverse | null = null;
	let multiplier = key;
	if (mode === 'decrypt') {
		inverse = invertMatrixMod(key);
		if (!inverse) {
			throw new InputError('Key is not invertible mod 26: gcd(det K, 26) must be 1.', 'key', 'notInvertible');
		}
		multiplier = inverse.inverse;
	}

	const productBeforeMod = matMul(textMatrix, multiplier);
	const product = matMod(productBeforeMod);
	const output = product.flat().map(codeToLetter).join('');
	return {
		textMatrix,
		padding,
		ignored,
		multiplier,
		inverse,
		productBeforeMod,
		product,
		output,
		keyInvertible,
	};
}
