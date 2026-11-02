import { Field, Fields, M, Page, Result, Section } from '@/components/calc';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { mod } from '@/lib/crypto';

export default function Modulo() {
	const [x, setX] = useParam('x', '2');
	const [m, setM] = useParam('m', '1019');

	const result = compute(() => {
		const xv = int(x, 'x', 'Number');
		const mv = int(m, 'modulus', 'Modulo');
		const r = mod(xv, mv);
		return { xv, mv, q: (xv - r) / mv, r };
	});

	return (
		<Page>
			<Section title="Inputs">
				<Fields>
					<Field label="Number" value={x} onChange={setX} invalid={fieldError(result, 'x')} />
					<Field label="Modulo" value={m} onChange={setM} invalid={fieldError(result, 'modulus')} />
				</Fields>
			</Section>
			<Result
				computed={result}
				label={<M>{`${x} mod ${m}`}</M>}
				render={(v) => v.r.toString()}
				copy={(v) => v.r.toString()}
			/>
			{result.ok && (
				<Section title="Calculation">
					<p className="font-mono text-sm tabular-nums">
						{result.value.xv.toString()} = {result.value.q.toString()} · {result.value.mv.toString()} +{' '}
						<strong>{result.value.r.toString()}</strong>
					</p>
				</Section>
			)}
		</Page>
	);
}
