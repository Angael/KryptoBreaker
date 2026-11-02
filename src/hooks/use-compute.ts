import { InputError, parseInteger } from '@/lib/crypto';

export type Computed<T> = { ok: true; value: T } | { ok: false; error: InputError };

/** Runs a calculation, turning domain errors into a value the UI can render next to the inputs. */
export function compute<T>(fn: () => T): Computed<T> {
	try {
		return { ok: true, value: fn() };
	} catch (e) {
		if (e instanceof InputError) return { ok: false, error: e };
		throw e;
	}
}

/** Parses an integer input or throws an InputError for that field. */
export function int(raw: string, field: string, label = field): bigint {
	const v = parseInteger(raw);
	if (v === null) throw new InputError(`${label} must be a whole number.`, field, 'wholeNumber', { label });
	return v;
}

export function fieldError(c: Computed<unknown>, field: string): boolean {
	return !c.ok && c.error.field === field;
}
