import { useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
	listeners.add(cb);
	return () => listeners.delete(cb);
};
const getSnapshot = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

export function useTheme() {
	const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light' as Theme);
	const toggle = useCallback(() => {
		const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.toggle('dark', next === 'dark');
		try {
			localStorage.setItem('theme', next);
		} catch {
			// storage unavailable (private mode): theme still applies for this session
		}
		for (const l of listeners) l();
	}, []);
	return { theme, toggle };
}
