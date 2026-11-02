import { Link } from 'react-router';
import logo from '@/assets/logo.png';
import { groups } from '@/routes';

export default function Home() {
	return (
		<div className="grid gap-8">
			<div className="flex items-center gap-4">
				<img src={logo} alt="" width={64} height={64} className="size-16 invert dark:invert-0" />
				<div>
					<h1 className="text-2xl font-semibold sm:text-3xl">KryptoBreaker</h1>
					<p className="text-muted-foreground text-pretty">
						Enter your keys and messages and get the answer along with every step of the calculation.
					</p>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{groups.map((group) => (
					<section key={group.name} className="rounded-xl border p-4">
						<h2 className="mb-2 text-sm font-medium text-muted-foreground">{group.name}</h2>
						<ul className="grid gap-1">
							{group.routes.map((r) => (
								<li key={r.path}>
									<Link
										to={r.path}
										className="-mx-2 block rounded-md px-2 py-1.5 transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"
									>
										{r.name}
									</Link>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>

			<div className="grid gap-3 text-sm text-muted-foreground text-pretty">
				<p>
					I built this to help people learn cryptographic algorithms for free, and because I wanted an easier
					time in my college exams. Every page works offline and its inputs are kept in the URL, so you can
					share a calculation as a link.
				</p>
				<p>
					Found a mistake or want another algorithm?{' '}
					<a
						className="text-foreground underline underline-offset-4"
						href="mailto:krzysztofwidacki@gmail.com"
					>
						Email me
					</a>
					,{' '}
					<a
						className="text-foreground underline underline-offset-4"
						href="https://www.linkedin.com/in/krzysztof-widacki-68460712b/"
					>
						find me on LinkedIn
					</a>{' '}
					or open a pull request on{' '}
					<a
						className="text-foreground underline underline-offset-4"
						href="https://github.com/Angael/KryptoBreaker"
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</div>
	);
}
