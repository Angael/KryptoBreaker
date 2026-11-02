import { NavLink } from 'react-router';
import { groups } from '@/routes';
import { cn } from '@/lib/utils';

export function Nav({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<nav aria-label="Calculators" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
			{groups.map((group) => (
				<div key={group.name} className="mb-5 last:mb-0">
					<h2 className="px-3 pb-1.5 text-xs font-medium text-muted-foreground">{group.name}</h2>
					<ul className="grid gap-0.5">
						{group.routes.map((route) => (
							<li key={route.path}>
								<NavLink
									to={route.path}
									onClick={onNavigate}
									className={({ isActive }) =>
										cn(
											'block rounded-md px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
											isActive
												? 'bg-accent font-medium text-accent-foreground'
												: 'text-foreground/80 hover:bg-accent/60 hover:text-foreground',
										)
									}
								>
									{route.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	);
}
