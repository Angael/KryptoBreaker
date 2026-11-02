import { Field, Fields, Formula, M, Page, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { elgamalDecrypt } from '@/lib/crypto';
import { ElGamalKeyFields, useElGamalKeys } from './key-fields';

export default function ElGamalDecrypt() {
	const state = useElGamalKeys();
	const [y1, setY1] = useParam('y1', '130');
	const [y2, setY2] = useParam('y2', '414');
	const pt = compute(() => {
		if (!state.keys.ok) throw state.keys.error;
		return elgamalDecrypt(state.keys.value, int(y1, 'y1', 'y₁'), int(y2, 'y2', 'y₂'));
	});

	return (
		<Page>
			<ElGamalKeyFields state={state} computed={pt} />
			<Section title="Ciphertext">
				<Fields>
					<Field
						label={
							<>
								y<sub>1</sub>
							</>
						}
						value={y1}
						onChange={setY1}
						invalid={fieldError(pt, 'y1')}
					/>
					<Field
						label={
							<>
								y<sub>2</sub>
							</>
						}
						value={y2}
						onChange={setY2}
						invalid={fieldError(pt, 'y2')}
					/>
				</Fields>
			</Section>
			<Formula>
				x = y<sub>2</sub> · y<sub>1</sub>
				<sup>p − 1 − t</sup> mod p
			</Formula>
			<Result computed={pt} label="Message x" render={(v) => v.x.toString()} copy={(v) => v.x.toString()} />
			{pt.ok && (
				<Section title="Calculation">
					<div className="grid gap-3">
						<M className="text-sm">
							p − 1 − t = {state.p} − 1 − {state.t} = {pt.value.exponent.toString()}
						</M>
						<PowTable pow={pt.value.pow} />
						<M className="text-sm">
							x = {y2} · {pt.value.pow.result.toString()} mod {state.p} = {pt.value.x.toString()}
						</M>
					</div>
				</Section>
			)}
		</Page>
	);
}
