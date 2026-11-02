import type { ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useT } from '@/i18n';

const b = (s: string) => <strong className="text-foreground">{s}</strong>;

export function KeyUsageDialog({ children }: { children: ReactNode }) {
	const t = useT();
	const k = t.keyUsage;
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle>{t.shell.keyUsage}</DialogTitle>
				<DialogDescription className="sr-only">{k.description}</DialogDescription>
				<div className="grid gap-5 text-sm">
					<section className="grid gap-2">
						<h3 className="font-medium">{k.encrypting}</h3>
						<ol className="grid list-decimal gap-1 pl-5 text-muted-foreground">
							<li>{k.enc1(b)}</li>
							<li>{k.enc2(b)}</li>
						</ol>
					</section>
					<section className="grid gap-2">
						<h3 className="font-medium">{k.signing}</h3>
						<ol className="grid list-decimal gap-1 pl-5 text-muted-foreground">
							<li>{k.sign1(b)}</li>
							<li>{k.sign2(b)}</li>
						</ol>
					</section>
				</div>
			</DialogContent>
		</Dialog>
	);
}
