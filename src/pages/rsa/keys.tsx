import { Field, Note, Fields, M, Page, Result, Section } from '@/components/calc';
import { EuclidTable } from '@/components/math/euclid-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { rsaKeys } from '@/lib/crypto';
import { KeyPair } from './key-fields';

export default function RsaKeys() {
	const t = useT();
	const [p, setP] = useParam('p', '37');
	const [q, setQ] = useParam('q', '47');
	const [e, setE] = useParam('e', '1001');

	const keys = compute(() => rsaKeys(int(p, 'p'), int(q, 'q'), int(e, 'e')));

	return (
		<Page>
			<Note>{t.rsa.keysIntro}</Note>
			<Section title={t.common.inputs}>
				<Fields>
					<Field label="p" value={p} onChange={setP} invalid={fieldError(keys, 'p')} hint={t.rsa.hintP} />
					<Field label="q" value={q} onChange={setQ} invalid={fieldError(keys, 'q')} hint={t.rsa.hintQ} />
					<Field label="e" value={e} onChange={setE} invalid={fieldError(keys, 'e')} hint={t.rsa.hintE} />
				</Fields>
			</Section>
			{keys.ok && (
				<Section title={t.common.calculation}>
					<div className="grid gap-4">
						<div className="grid gap-1 font-mono text-sm tabular-nums">
							<div>
								n = p · q = {p} · {q} = {keys.value.n.toString()}
							</div>
							<div>
								φ = (p − 1)(q − 1) = {(int(p, 'p') - 1n).toString()} · {(int(q, 'q') - 1n).toString()} ={' '}
								{keys.value.phi.toString()}
							</div>
							<div>
								d ={' '}
								<M>
									e<sup>-1</sup> mod φ
								</M>{' '}
								= {e}
								<sup>-1</sup> mod {keys.value.phi.toString()} = {keys.value.d.toString()}
							</div>
						</div>
						<p className="text-sm text-muted-foreground">{t.rsa.keysHowTo}</p>
						<EuclidTable euclid={keys.value.euclid} />
					</div>
				</Section>
			)}
			<Result
				computed={keys}
				label={t.common.keys}
				render={(k) => (
					<span className="text-base sm:text-lg">
						<KeyPair e={k.e.toString()} d={k.d.toString()} n={k.n.toString()} />
					</span>
				)}
			/>
		</Page>
	);
}
