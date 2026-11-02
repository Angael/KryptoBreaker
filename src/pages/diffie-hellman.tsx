import type { ReactNode } from 'react';
import { Field, Fields, Note, Page, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { type PowResult, diffieHellman } from '@/lib/crypto';

function Side({ title, pow }: { title: ReactNode; pow: PowResult }) {
	return (
		<div className="grid content-start gap-2">
			<h3 className="text-sm font-medium">{title}</h3>
			<PowTable pow={pow} />
		</div>
	);
}

export default function DiffieHellman() {
	const t = useT();
	const [p, setP] = useParam('p', '1019');
	const [g, setG] = useParam('g', '2');
	const [a, setA] = useParam('a', '638');
	const [b, setB] = useParam('b', '719');

	const dh = compute(() => diffieHellman(int(p, 'p'), int(g, 'g'), int(a, 'a'), int(b, 'b')));

	return (
		<Page>
			<div className="grid gap-2">
				{t.dh.intro.map((line) => (
					<Note key={line}>{line}</Note>
				))}
			</div>
			<Section title={t.common.inputs}>
				<Fields className="lg:grid-cols-4">
					<Field label="p" value={p} onChange={setP} invalid={fieldError(dh, 'p')} hint={t.dh.hintP} />
					<Field label="g" value={g} onChange={setG} invalid={fieldError(dh, 'g')} hint={t.dh.hintG} />
					<Field label="a" value={a} onChange={setA} invalid={fieldError(dh, 'a')} hint={t.dh.hintA} />
					<Field label="b" value={b} onChange={setB} invalid={fieldError(dh, 'b')} hint={t.dh.hintB} />
				</Fields>
			</Section>
			{dh.ok && (
				<>
					<Section title={t.dh.publicKeys}>
						<div className="grid gap-4">
							<Note>{t.dh.publicKeysHowTo}</Note>
							<div className="grid gap-6 md:grid-cols-2">
								<Side
									title={
										<>
											{t.dh.person1}: A = g<sup>a</sup> mod p
										</>
									}
									pow={dh.value.publicA}
								/>
								<Side
									title={
										<>
											{t.dh.person2}: B = g<sup>b</sup> mod p
										</>
									}
									pow={dh.value.publicB}
								/>
							</div>
						</div>
					</Section>
					<Section title={t.dh.sharedKey}>
						<div className="grid gap-4">
							<Note>{t.dh.sharedHowTo}</Note>
							<div className="grid gap-6 md:grid-cols-2">
								<Side
									title={
										<>
											{t.dh.person1}: B<sup>a</sup> mod p
										</>
									}
									pow={dh.value.sharedFromA}
								/>
								<Side
									title={
										<>
											{t.dh.person2}: A<sup>b</sup> mod p
										</>
									}
									pow={dh.value.sharedFromB}
								/>
							</div>
						</div>
					</Section>
				</>
			)}
			<Result
				computed={dh}
				label={t.dh.resultLabel}
				render={(r) => r.shared.toString()}
				copy={(r) => r.shared.toString()}
			/>
			{dh.ok && <Note>{t.dh.bothGot(dh.value.shared.toString())}</Note>}
		</Page>
	);
}
