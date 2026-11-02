import { KeyRoundIcon, MenuIcon, MoonIcon, SunIcon } from 'lucide-react';
import { type ReactNode, Suspense, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { version } from '../../../package.json';
import logo from '@/assets/logo.png';
import { KeyUsageDialog } from '@/components/layout/key-usage-dialog';
import { Nav } from '@/components/layout/nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Tooltip } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/use-theme';
import { LANGS, useLang, useT } from '@/i18n';
import { logRouteVisit } from '@/lib/analytics';
import { findRoute } from '@/routes';
import { cn } from '@/lib/utils';

const REPO_URL = 'https://github.com/Angael/KryptoBreaker';
const DESKTOP_QUERY = '(min-width: 1024px)';

function usePersistentBoolean(key: string, initial: boolean): [boolean, (v: boolean) => void] {
	const [value, setValue] = useState(() => {
		try {
			const stored = localStorage.getItem(key);
			return stored === null ? initial : stored === 'true';
		} catch {
			return initial;
		}
	});
	return [
		value,
		(v) => {
			setValue(v);
			try {
				localStorage.setItem(key, String(v));
			} catch {
				// ignore unavailable storage
			}
		},
	];
}

export function Shell({ children }: { children: ReactNode }) {
	const { pathname } = useLocation();
	const { group, route } = findRoute(pathname);
	const [sidebarOpen, setSidebarOpen] = usePersistentBoolean('sidebar-open', true);
	const [sheetOpen, setSheetOpen] = useState(false);
	const { theme, toggle } = useTheme();
	const t = useT();
	const [lang, setLang] = useLang();
	const nextLang = LANGS.find((l) => l.value !== lang)!;

	useEffect(() => {
		window.scrollTo(0, 0);
		logRouteVisit(pathname);
	}, [pathname]);

	const toggleMenu = () => {
		if (window.matchMedia(DESKTOP_QUERY).matches) setSidebarOpen(!sidebarOpen);
		else setSheetOpen(true);
	};

	return (
		<div className="min-h-dvh">
			<title>
				{route && route.path !== '/'
					? `${t.routes[route.id]}${group ? ` · ${t.groups[group.id]}` : ''} · KryptoBreaker`
					: 'KryptoBreaker'}
			</title>
			<a
				href="#main"
				className="fixed top-2 left-2 z-[60] -translate-y-16 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus:translate-y-0"
			>
				{t.shell.skip}
			</a>
			<header className="sticky top-0 z-40 border-b bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
				<div className="flex h-14 items-center gap-1 px-2 pr-[max(0.5rem,env(safe-area-inset-right))] pl-[max(0.5rem,env(safe-area-inset-left))]">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleMenu}
						aria-label={t.shell.toggleNav}
						aria-expanded={sheetOpen || undefined}
					>
						<MenuIcon className="size-5" />
					</Button>
					<Link
						to="/"
						className="flex items-center gap-2 rounded-md px-2 py-1 font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
					>
						<img src={logo} alt="" width={24} height={24} className="size-6 invert dark:invert-0" />
						KryptoBreaker
					</Link>
					<div className="ml-auto flex items-center gap-1">
						<Tooltip content={`${t.shell.language}: ${nextLang.label}`}>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setLang(nextLang.value)}
								aria-label={`${t.shell.language}: ${nextLang.label}`}
								lang={nextLang.value}
								className="font-mono text-xs font-semibold uppercase"
							>
								{nextLang.value}
							</Button>
						</Tooltip>
						<KeyUsageDialog>
							<Button variant="ghost" size="icon" aria-label={t.shell.keyUsage}>
								<KeyRoundIcon className="size-5" />
							</Button>
						</KeyUsageDialog>
						<Tooltip content={theme === 'dark' ? t.shell.lightTheme : t.shell.darkTheme}>
							<Button variant="ghost" size="icon" onClick={toggle} aria-label={t.shell.toggleTheme}>
								{theme === 'dark' ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
							</Button>
						</Tooltip>
						<Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
							<a href={REPO_URL} target="_blank" rel="noreferrer" aria-label={t.shell.github}>
								<GithubMark />
							</a>
						</Button>
					</div>
				</div>
			</header>

			<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
				<SheetContent aria-describedby={undefined}>
					<div className="flex h-14 shrink-0 items-center border-b px-4 pt-[env(safe-area-inset-top)]">
						<SheetTitle className="font-semibold">KryptoBreaker</SheetTitle>
						<SheetDescription className="sr-only">{t.shell.pages}</SheetDescription>
					</div>
					<Nav onNavigate={() => setSheetOpen(false)} />
					<SidebarFooter />
				</SheetContent>
			</Sheet>

			<aside
				aria-label={t.shell.pages}
				className={cn(
					'fixed top-14 bottom-0 left-0 z-30 hidden w-64 flex-col border-r bg-background pl-[env(safe-area-inset-left)]',
					sidebarOpen && 'lg:flex',
				)}
			>
				<Nav />
				<SidebarFooter />
			</aside>

			<div className={cn(sidebarOpen && 'lg:pl-64')}>
				<main
					id="main"
					className="mx-auto max-w-4xl px-4 pt-6 pb-[max(4rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-8"
				>
					{route && route.path !== '/' && (
						<header className="mb-6">
							{group && <p className="text-sm text-muted-foreground">{t.groups[group.id]}</p>}
							<h1 className="text-2xl font-semibold text-balance sm:text-3xl">{t.routes[route.id]}</h1>
						</header>
					)}
					<Suspense fallback={<div className="min-h-[50dvh]" aria-busy="true" />}>{children}</Suspense>
				</main>
			</div>
		</div>
	);
}

function SidebarFooter() {
	const t = useT();
	return (
		<div className="mt-auto grid gap-1 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-sm">
			<a
				href="https://www.paypal.me/krzysztofwidacki"
				target="_blank"
				rel="noreferrer"
				className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
			>
				{t.shell.coffee}
			</a>
			<a
				href={REPO_URL}
				target="_blank"
				rel="noreferrer"
				className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
			>
				{t.shell.source}
			</a>
			<p className="px-3 pt-1 text-xs text-muted-foreground">v{version}</p>
		</div>
	);
}

function GithubMark() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="currentColor">
			<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
		</svg>
	);
}
