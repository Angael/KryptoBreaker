import { Field, Fields, Page, PowExpr, Result, Section } from '@/components/calc';
import { EuclidTable } from '@/components/math/euclid-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { InputError, extendedEuclid } from '@/lib/crypto';

export default function Inverse() {
	const [a, setA] = useParam('a', '215');
	const [n, setN] = useParam('n', '26');

	const euclid = compute(() => {
		const nv = int(n, 'n', 'Modulo');
		if (nv < 2n) throw new InputError('Modulo must be at least 2.', 'n');
		return extendedEuclid(int(a, 'a', 'Number'), nv);
	});
	const inverse = compute(() => {
		if (!euclid.ok) throw euclid.error;
		const { inverse, gcd } = euclid.value;
		if (inverse === null) throw new InputError(`No inverse: gcd(${a}, ${n}) = ${gcd}.`, 'a');
		return inverse;
	});

	return (
		<Page>
			<Section title="Inputs">
				<Fields>
					<Field label="Number" value={a} onChange={setA} invalid={fieldError(euclid, 'a')} />
					<Field label="Modulo" value={n} onChange={setN} invalid={fieldError(euclid, 'n')} />
				</Fields>
			</Section>
			<Result
				computed={inverse}
				label={<PowExpr base={a} exp="-1" mod={n} />}
				render={(v) => v.toString()}
				copy={(v) => v.toString()}
			/>
			{euclid.ok && (
				<Section title="Extended Euclidean algorithm">
					<EuclidTable euclid={euclid.value} />
				</Section>
			)}
		</Page>
	);
}
