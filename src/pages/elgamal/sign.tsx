import { Field, Fields, Formula, M, Page, PowExpr, Result, Section } from '@/components/calc';
import { EuclidTable } from '@/components/math/euclid-table';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { elgamalSign } from '@/lib/crypto';
import { ElGamalKeyFields, useElGamalKeys } from './key-fields';

export default function ElGamalSign() {
	const state = useElGamalKeys();
	const [h, setH] = useParam('h', '357');
	const [r, setR] = useParam('r', '515');
	const sig = compute(() => {
		if (!state.keys.ok) throw state.keys.error;
		return elgamalSign(state.keys.value, int(h, 'h'), int(r, 'r'));
	});

	return (
		<Page>
			<ElGamalKeyFields state={state} computed={sig} />
			<Section title="Message">
				<Fields>
					<Field label="h" value={h} onChange={setH} invalid={fieldError(sig, 'h')} hint="Message hash" />
					<Field
						label="r"
						value={r}
						onChange={setR}
						invalid={fieldError(sig, 'r')}
						hint="Random, coprime with p − 1"
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
			<Result
				computed={sig}
				label="Signature (u, s)"
				render={(v) => `(${v.u.result}, ${v.s})`}
				copy={(v) => `(${v.u.result}, ${v.s})`}
			/>
			{sig.ok && (
				<>
					<Section title="Calculate u">
						<PowTable pow={sig.value.u} />
					</Section>
					<Section title="Calculate s">
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
		</Page>
	);
}
