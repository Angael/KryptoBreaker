import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

/**
 * String state stored in the URL query, so every calculation is a shareable link.
 * The default value is not written to the URL.
 */
export function useParam(name: string, defaultValue: string): [string, (value: string) => void] {
	const [params, setParams] = useSearchParams();
	const value = params.get(name) ?? defaultValue;
	const set = useCallback(
		(next: string) =>
			setParams(
				(prev) => {
					const p = new URLSearchParams(prev);
					if (next === defaultValue) p.delete(name);
					else p.set(name, next);
					return p;
				},
				{ replace: true, preventScrollReset: true },
			),
		[name, defaultValue, setParams],
	);
	return [value, set];
}
