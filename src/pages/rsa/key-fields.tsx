import { Field, Fields, M, Section } from '@/components/calc';
import { type Computed, fieldError } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';

export function useRsaKeyParams() {
	const [e, setE] = useParam('e', '1001');
	const [d, setD] = useParam('d', '761');
	const [n, setN] = useParam('n', '1739');
	return { e, setE, d, setD, n, setN };
}

export function RsaKeyFields({
	keys,
	computed,
}: {
	keys: ReturnType<typeof useRsaKeyParams>;
	computed: Computed<unknown>;
}) {
	const t = useT();
	const { e, setE, d, setD, n, setN } = keys;
	return (
		<Section title={t.common.keys}>
			<div className="grid gap-4">
				<Fields>
					<Field label="e" value={e} onChange={setE} invalid={fieldError(computed, 'e')} />
					<Field label="n" value={n} onChange={setN} invalid={fieldError(computed, 'n')} />
					<Field label="d" value={d} onChange={setD} invalid={fieldError(computed, 'd')} />
				</Fields>
				<KeyPair e={e} d={d} n={n} />
			</div>
		</Section>
	);
}

export function KeyPair({ e, d, n }: { e: string; d: string; n: string }) {
	const t = useT();
	return (
		<dl className="grid gap-1 text-sm sm:grid-cols-2">
			<div>
				<dt className="text-muted-foreground">{t.common.publicKey}</dt>
				<dd>
					<M>
						k<sub>1</sub> = (e, n) = ({e}, {n})
					</M>
				</dd>
			</div>
			<div>
				<dt className="text-muted-foreground">{t.common.privateKey}</dt>
				<dd>
					<M>
						k<sub>2</sub> = (d, n) = ({d}, {n})
					</M>
				</dd>
			</div>
		</dl>
	);
}
