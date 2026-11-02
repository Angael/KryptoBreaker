import { Field, Fields, Formula, Note, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { fieldError } from '@/hooks/use-compute';
import { useT } from '@/i18n';
import { ElGamalKeyPair, useElGamalKeys } from './key-fields';

export default function ElGamalKeysPage() {
	const tr = useT();
	const { p, setP, alpha, setAlpha, t, setT, keys } = useElGamalKeys();
	return (
		<Page>
			<Note>{tr.elgamal.keysIntro}</Note>
			<Section title={tr.common.inputs}>
				<Fields>
					<Field
						label="α"
						value={alpha}
						onChange={setAlpha}
						invalid={fieldError(keys, 'alpha')}
						hint={tr.elgamal.hintAlphaKeys}
					/>
					<Field
						label="p"
						value={p}
						onChange={setP}
						invalid={fieldError(keys, 'p')}
						hint={tr.elgamal.hintP}
					/>
					<Field
						label="t"
						value={t}
						onChange={setT}
						invalid={fieldError(keys, 't')}
						hint={tr.elgamal.hintT}
					/>
				</Fields>
			</Section>
			<Formula>
				β = <PowExpr base="α" exp="t" mod="p" /> = <PowExpr base={alpha} exp={t} mod={p} />
			</Formula>
			{keys.ok && (
				<Section title={tr.common.squareMultiply}>
					<PowTable pow={keys.value.beta} />
				</Section>
			)}
			<Result
				computed={keys}
				label={tr.common.keys}
				render={(k) => (
					<span className="text-base sm:text-lg">
						<ElGamalKeyPair p={p} alpha={alpha} beta={k.beta.result.toString()} t={t} />
					</span>
				)}
			/>
		</Page>
	);
}
