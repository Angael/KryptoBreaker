import { Field, Fields, M, Section } from '@/components/calc';
import { type Computed, compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { elgamalKeys } from '@/lib/crypto';

export function useElGamalKeys() {
	const [p, setP] = useParam('p', '1619');
	const [alpha, setAlpha] = useParam('alpha', '2');
	const [t, setT] = useParam('t', '937');
	const keys = compute(() => elgamalKeys(int(p, 'p'), int(alpha, 'alpha', 'α'), int(t, 't')));
	return { p, setP, alpha, setAlpha, t, setT, keys };
}

export function ElGamalKeyFields({
	state,
	computed,
}: {
	state: ReturnType<typeof useElGamalKeys>;
	computed: Computed<unknown>;
}) {
	const tr = useT();
	const { p, setP, alpha, setAlpha, t, setT, keys } = state;
	const beta = keys.ok ? keys.value.beta.result.toString() : '';
	return (
		<Section title={tr.common.keys}>
			<div className="grid gap-4">
				<Fields className="lg:grid-cols-4">
					<Field
						label="p"
						value={p}
						onChange={setP}
						invalid={fieldError(computed, 'p')}
						hint={tr.elgamal.hintP}
					/>
					<Field
						label="α"
						value={alpha}
						onChange={setAlpha}
						invalid={fieldError(computed, 'alpha')}
						hint={tr.elgamal.hintAlpha}
					/>
					<Field
						label="t"
						value={t}
						onChange={setT}
						invalid={fieldError(computed, 't')}
						hint={tr.elgamal.hintT}
					/>
					<Field label="β" value={beta} hint={tr.elgamal.hintBeta} />
				</Fields>
				<ElGamalKeyPair p={p} alpha={alpha} beta={beta || '?'} t={t} />
			</div>
		</Section>
	);
}

export function ElGamalKeyPair({ p, alpha, beta, t }: { p: string; alpha: string; beta: string; t: string }) {
	const tr = useT();
	return (
		<dl className="grid gap-1 text-sm sm:grid-cols-2">
			<div>
				<dt className="text-muted-foreground">{tr.common.publicKey}</dt>
				<dd>
					<M>
						k<sub>1</sub> = (p, α, β) = ({p}, {alpha}, {beta})
					</M>
				</dd>
			</div>
			<div>
				<dt className="text-muted-foreground">{tr.common.privateKey}</dt>
				<dd>
					<M>
						k<sub>2</sub> = (p, t) = ({p}, {t})
					</M>
				</dd>
			</div>
		</dl>
	);
}
