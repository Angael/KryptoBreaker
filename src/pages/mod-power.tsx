import { Field, Fields, Note, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { modPow } from '@/lib/crypto';

export default function ModPower() {
	const t = useT();
	const [g, setG] = useParam('g', '2');
	const [e, setE] = useParam('e', '638');
	const [m, setM] = useParam('m', '1019');

	const pow = compute(() => {
		const base = int(g, 'base', 'Number');
		const exponent = int(e, 'exponent', 'Power');
		const modulus = int(m, 'modulus', 'Modulo');
		return modPow(base, exponent, modulus);
	});

	return (
		<Page>
			<Note>{t.modPower.intro}</Note>
			<Section title={t.common.inputs}>
				<Fields>
					<Field label={t.common.number} value={g} onChange={setG} invalid={fieldError(pow, 'base')} />
					<Field label={t.common.power} value={e} onChange={setE} invalid={fieldError(pow, 'exponent')} />
					<Field label={t.common.modulo} value={m} onChange={setM} invalid={fieldError(pow, 'modulus')} />
				</Fields>
			</Section>
			{pow.ok && (
				<Section title={t.common.squareMultiply}>
					<PowTable pow={pow.value} />
				</Section>
			)}
			<Result
				computed={pow}
				label={<PowExpr base={g} exp={e} mod={m} />}
				render={(p) => p.result.toString()}
				copy={(p) => p.result.toString()}
			/>
		</Page>
	);
}
