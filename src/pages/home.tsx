import { Link } from 'react-router';
import logo from '@/assets/logo.png';
import { useT } from '@/i18n';
import { groups } from '@/routes';

const linkClass = 'text-foreground underline underline-offset-4';

export default function Home() {
	const t = useT();
	return (
		<div className="grid gap-8">
			<div className="flex items-center gap-4">
				<img src={logo} alt="" width={64} height={64} className="size-16 invert dark:invert-0" />
				<div>
					<h1 className="text-2xl font-semibold sm:text-3xl">KryptoBreaker</h1>
					<p className="text-muted-foreground text-pretty">{t.home.lead}</p>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{groups.map((group) => (
					<section key={group.id} className="rounded-xl border p-4">
						<h2 className="mb-2 text-sm font-medium text-muted-foreground">{t.groups[group.id]}</h2>
						<ul className="grid gap-1">
							{group.routes.map((r) => (
								<li key={r.path}>
									<Link
										to={r.path}
										className="-mx-2 block rounded-md px-2 py-1.5 transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"
									>
										{t.routes[r.id]}
									</Link>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>

			<div className="grid gap-3 text-sm text-muted-foreground text-pretty">
				<p>{t.home.about}</p>
				<p>
					{t.home.contact(
						<a className={linkClass} href="mailto:krzysztofwidacki@gmail.com">
							{t.home.email}
						</a>,
						<a className={linkClass} href="https://www.linkedin.com/in/krzysztof-widacki-68460712b/">
							{t.home.linkedin}
						</a>,
						<a className={linkClass} href="https://github.com/Angael/KryptoBreaker">
							GitHub
						</a>,
					)}
				</p>
			</div>
		</div>
	);
}
