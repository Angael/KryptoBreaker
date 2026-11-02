import { Field, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { fieldError } from '@/hooks/use-compute';
import { ElGamalKeyPair, useElGamalKeys } from './key-fields';

export default function ElGamalKeysPage() {
	const { p, setP, alpha, setAlpha, t, setT, keys } = useElGamalKeys();
	return (
		<Page>
			<Section title="Inputs">
				<Fields>
					<Field
						label="α"
						value={alpha}
						onChange={setAlpha}
						invalid={fieldError(keys, 'alpha')}
						hint="Public base (generator order is not checked)"
					/>
					<Field label="p" value={p} onChange={setP} invalid={fieldError(keys, 'p')} hint="Prime modulus" />
					<Field
						label="t"
						value={t}
						onChange={setT}
						invalid={fieldError(keys, 't')}
						hint="Random private exponent"
					/>
				</Fields>
			</Section>
			<Formula>
				β = <PowExpr base="α" exp="t" mod="p" /> = <PowExpr base={alpha} exp={t} mod={p} />
			</Formula>
			<Result
				computed={keys}
				label="Keys"
				render={(k) => (
					<span className="text-base sm:text-lg">
						<ElGamalKeyPair p={p} alpha={alpha} beta={k.beta.result.toString()} t={t} />
					</span>
				)}
			/>
			{keys.ok && (
				<Section title="Square and multiply">
					<PowTable pow={keys.value.beta} />
				</Section>
			)}
		</Page>
	);
}
