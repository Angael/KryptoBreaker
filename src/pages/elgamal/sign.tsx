import { Field, Fields, Formula, M, Note, Page, PowExpr, Result, Section } from '@/components/calc';
import { EuclidTable } from '@/components/math/euclid-table';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { elgamalSign } from '@/lib/crypto';
import { ElGamalKeyFields, useElGamalKeys } from './key-fields';

export default function ElGamalSign() {
	const t = useT();
	const state = useElGamalKeys();
	const [h, setH] = useParam('h', '357');
	const [r, setR] = useParam('r', '515');
	const sig = compute(() => {
		if (!state.keys.ok) throw state.keys.error;
		return elgamalSign(state.keys.value, int(h, 'h'), int(r, 'r'));
	});

	return (
		<Page>
			<Note>{t.elgamal.signIntro}</Note>
			<ElGamalKeyFields state={state} computed={sig} />
			<Section title={t.common.message}>
				<Fields>
					<Field label="h" value={h} onChange={setH} invalid={fieldError(sig, 'h')} hint={t.elgamal.hintH} />
					<Field
						label="r"
						value={r}
						onChange={setR}
						invalid={fieldError(sig, 'r')}
						hint={t.elgamal.hintRSign}
					/>
				</Fields>
			</Section>
			<Formula className="grid gap-1">
				<div>
					u = <PowExpr base="α" exp="r" mod="p" />
				</div>
				<div>
					s = r<sup>-1</sup> · (h − t · u) mod (p − 1)
				</div>
			</Formula>
			{sig.ok && (
				<>
					<Section title={t.elgamal.calcU}>
						<PowTable pow={sig.value.u} />
					</Section>
					<Section title={t.elgamal.calcS}>
						<div className="grid gap-4">
							<EuclidTable euclid={sig.value.rInverse} />
							<M className="text-sm">
								s = {sig.value.rInverse.inverse!.toString()} · ({h} − {state.t} ·{' '}
								{sig.value.u.result.toString()}) mod {(int(state.p, 'p') - 1n).toString()} ={' '}
								{sig.value.s.toString()}
							</M>
						</div>
					</Section>
				</>
			)}
			<Result
				computed={sig}
				label={t.elgamal.signature}
				render={(v) => `(${v.u.result}, ${v.s})`}
				copy={(v) => `(${v.u.result}, ${v.s})`}
			/>
		</Page>
	);
}
