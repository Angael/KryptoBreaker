import type { ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function KeyUsageDialog({ children }: { children: ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle>When to use which key</DialogTitle>
				<DialogDescription className="sr-only">
					Which key encrypts, decrypts, signs and verifies.
				</DialogDescription>
				<div className="grid gap-5 text-sm">
					<section className="grid gap-2">
						<h3 className="font-medium">Encrypting a message</h3>
						<ol className="grid list-decimal gap-1 pl-5 text-muted-foreground">
							<li>
								The <strong className="text-foreground">sender</strong> encrypts with the{' '}
								<strong className="text-foreground">receiver's public key</strong>.
							</li>
							<li>
								The <strong className="text-foreground">receiver</strong> decrypts with{' '}
								<strong className="text-foreground">their own private key</strong>.
							</li>
						</ol>
					</section>
					<section className="grid gap-2">
						<h3 className="font-medium">Signing a message</h3>
						<ol className="grid list-decimal gap-1 pl-5 text-muted-foreground">
							<li>
								The <strong className="text-foreground">sender</strong> signs with{' '}
								<strong className="text-foreground">their own private key</strong>.
							</li>
							<li>
								The <strong className="text-foreground">receiver</strong> verifies with the{' '}
								<strong className="text-foreground">sender's public key</strong>.
							</li>
						</ol>
					</section>
				</div>
			</DialogContent>
		</Dialog>
	);
}
