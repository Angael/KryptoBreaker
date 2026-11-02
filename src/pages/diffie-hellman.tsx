import { Field, Fields, Note, Page, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { diffieHellman } from '@/lib/crypto';

export default function DiffieHellman() {
	const [p, setP] = useParam('p', '1019');
	const [g, setG] = useParam('g', '2');
	const [a, setA] = useParam('a', '638');
	const [b, setB] = useParam('b', '719');

	const dh = compute(() => diffieHellman(int(p, 'p'), int(g, 'g'), int(a, 'a'), int(b, 'b')));

	return (
		<Page>
			<Note>
				Both parties derive the same shared key over a public channel without ever sending it. Each picks a
				private key, publishes g<sup>private</sup> mod p, and raises the other's public value to their own
				private key.
			</Note>
			<Section title="Inputs">
				<Fields className="lg:grid-cols-4">
					<Field
						label="p"
						value={p}
						onChange={setP}
						invalid={fieldError(dh, 'p')}
						hint="Public prime modulus"
					/>
					<Field label="g" value={g} onChange={setG} invalid={fieldError(dh, 'g')} hint="Public base" />
					<Field
						label="a"
						value={a}
						onChange={setA}
						invalid={fieldError(dh, 'a')}
						hint="Party 1 private key"
					/>
					<Field
						label="b"
						value={b}
						onChange={setB}
						invalid={fieldError(dh, 'b')}
						hint="Party 2 private key"
					/>
				</Fields>
			</Section>
			<Result
				computed={dh}
				label="Shared key"
				render={(r) => r.shared.toString()}
				copy={(r) => r.shared.toString()}
			/>
			{dh.ok && (
				<>
					<Section title="Public keys">
						<div className="grid gap-6 md:grid-cols-2">
							<div className="grid gap-2">
								<h3 className="text-sm font-medium">
									Party 1: A = g<sup>a</sup> mod p
								</h3>
								<PowTable pow={dh.value.publicA} />
							</div>
							<div className="grid gap-2">
								<h3 className="text-sm font-medium">
									Party 2: B = g<sup>b</sup> mod p
								</h3>
								<PowTable pow={dh.value.publicB} />
							</div>
						</div>
					</Section>
					<Section title="Shared key">
						<div className="grid gap-6 md:grid-cols-2">
							<div className="grid gap-2">
								<h3 className="text-sm font-medium">
									Party 1: B<sup>a</sup> mod p
								</h3>
								<PowTable pow={dh.value.sharedFromA} />
							</div>
							<div className="grid gap-2">
								<h3 className="text-sm font-medium">
									Party 2: A<sup>b</sup> mod p
								</h3>
								<PowTable pow={dh.value.sharedFromB} />
							</div>
						</div>
					</Section>
				</>
			)}
		</Page>
	);
}
