import { Field, Fields, Note, Page, PowExpr, Result, Section } from '@/components/calc';
import { EuclidTable } from '@/components/math/euclid-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { InputError, extendedEuclid } from '@/lib/crypto';

export default function Inverse() {
	const t = useT();
	const [a, setA] = useParam('a', '215');
	const [n, setN] = useParam('n', '26');

	const euclid = compute(() => {
		const nv = int(n, 'n', 'Modulo');
		if (nv < 2n)
			throw new InputError('Modulo must be at least 2.', 'n', 'atLeast', { label: 'Modulo', min: '2' });
		return extendedEuclid(int(a, 'a', 'Number'), nv);
	});
	const inverse = compute(() => {
		if (!euclid.ok) throw euclid.error;
		const { inverse, gcd } = euclid.value;
		if (inverse === null) {
			throw new InputError(`No inverse: gcd(${a}, ${n}) = ${gcd}.`, 'a', 'noInverse', {
				a,
				n,
				gcd: String(gcd),
			});
		}
		return inverse;
	});

	return (
		<Page>
			<Note>{t.inverse.intro}</Note>
			<Section title={t.common.inputs}>
				<Fields>
					<Field label={t.common.number} value={a} onChange={setA} invalid={fieldError(euclid, 'a')} />
					<Field label={t.common.modulo} value={n} onChange={setN} invalid={fieldError(euclid, 'n')} />
				</Fields>
			</Section>
			{euclid.ok && (
				<Section title={t.inverse.euclid}>
					<EuclidTable euclid={euclid.value} />
				</Section>
			)}
			<Result
				computed={inverse}
				label={<PowExpr base={a} exp="-1" mod={n} />}
				render={(v) => v.toString()}
				copy={(v) => v.toString()}
			/>
		</Page>
	);
}
