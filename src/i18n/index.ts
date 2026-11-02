import { useSyncExternalStore } from 'react';
import type { InputError } from '@/lib/crypto';
import { en } from './en';
import { pl } from './pl';

export type Lang = 'en' | 'pl';
export type Dict = typeof en;

const dicts: Record<Lang, Dict> = { en, pl };
export const LANGS: { value: Lang; label: string }[] = [
	{ value: 'en', label: 'English' },
	{ value: 'pl', label: 'Polski' },
];

function initialLang(): Lang {
	try {
		const stored = localStorage.getItem('lang');
		if (stored === 'en' || stored === 'pl') return stored;
	} catch {
		// storage unavailable
	}
	return typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('pl') ? 'pl' : 'en';
}

let current: Lang = initialLang();
if (typeof document !== 'undefined') document.documentElement.lang = current;

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
	listeners.add(cb);
	return () => listeners.delete(cb);
};

export function setLang(lang: Lang) {
	current = lang;
	document.documentElement.lang = lang;
	try {
		localStorage.setItem('lang', lang);
	} catch {
		// storage unavailable: language still applies for this session
	}
	for (const l of listeners) l();
}

export function useLang(): [Lang, (lang: Lang) => void] {
	const lang = useSyncExternalStore(
		subscribe,
		() => current,
		() => 'en' as Lang,
	);
	return [lang, setLang];
}

/** The dictionary for the current language. */
export function useT(): Dict {
	return dicts[useLang()[0]];
}

/** Translated text for a calculation error; falls back to the library's English message. */
export function errorText(t: Dict, error: InputError): string {
	const fmt = t.errors[error.code as keyof Dict['errors']] as
		| ((p: Record<string, string>) => string)
		| undefined;
	if (!fmt) return error.message;
	const params = { ...error.params };
	if (params.label) params.label = t.terms[params.label as keyof Dict['terms']] ?? params.label;
	return fmt(params);
}
