import { Field, Fields, Formula, M, Note, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { elgamalEncrypt } from '@/lib/crypto';
import { ElGamalKeyFields, useElGamalKeys } from './key-fields';

export default function ElGamalEncrypt() {
	const t = useT();
	const state = useElGamalKeys();
	const [x, setX] = useParam('x', '20');
	const [r, setR] = useParam('r', '320');
	const ct = compute(() => {
		if (!state.keys.ok) throw state.keys.error;
		return elgamalEncrypt(state.keys.value, int(x, 'x'), int(r, 'r'));
	});

	return (
		<Page>
			<Note>{t.elgamal.encryptIntro}</Note>
			<ElGamalKeyFields state={state} computed={ct} />
			<Section title={t.common.message}>
				<Fields>
					<Field label="x" value={x} onChange={setX} invalid={fieldError(ct, 'x')} hint={t.elgamal.hintX} />
					<Field label="r" value={r} onChange={setR} invalid={fieldError(ct, 'r')} hint={t.elgamal.hintR} />
				</Fields>
			</Section>
			<Formula>
				C = (y<sub>1</sub>, y<sub>2</sub>) = (<PowExpr base="α" exp="r" mod="p" />, (x · β<sup>r</sup>) mod p)
			</Formula>
			{ct.ok && (
				<Section title={t.common.calculation}>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="grid content-start gap-2">
							<h3 className="text-sm font-medium">
								y<sub>1</sub> = <PowExpr base="α" exp="r" mod="p" />
							</h3>
							<PowTable pow={ct.value.y1} />
						</div>
						<div className="grid content-start gap-2">
							<h3 className="text-sm font-medium">
								<PowExpr base="β" exp="r" mod="p" />
							</h3>
							<PowTable pow={ct.value.mask} />
							<M className="text-sm">
								y<sub>2</sub> = {x} · {ct.value.mask.result.toString()} mod {state.p} ={' '}
								{ct.value.y2.toString()}
							</M>
						</div>
					</div>
				</Section>
			)}
			<Result
				computed={ct}
				label={
					<>
						(y<sub>1</sub>, y<sub>2</sub>)
					</>
				}
				render={(c) => `(${c.y1.result}, ${c.y2})`}
				copy={(c) => `(${c.y1.result}, ${c.y2})`}
			/>
		</Page>
	);
}
