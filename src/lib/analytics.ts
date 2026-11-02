const config = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

type Logger = (path: string) => void;
let logger: Promise<Logger | null> | null = null;

/** Firebase Analytics, loaded lazily so it never blocks first paint. No-op without config. */
function load(): Promise<Logger | null> {
	if (!config.apiKey || !config.appId) return Promise.resolve(null);
	logger ??= Promise.all([import('firebase/app'), import('firebase/analytics')])
		.then(async ([{ initializeApp }, { getAnalytics, isSupported, logEvent }]) => {
			if (!(await isSupported())) return null;
			const analytics = getAnalytics(initializeApp(config));
			return (path: string) => logEvent(analytics, 'route_visit', { path });
		})
		.catch(() => null);
	return logger;
}

export function logRouteVisit(path: string) {
	void load().then((log) => log?.(path));
}
