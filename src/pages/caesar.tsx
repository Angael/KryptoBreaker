import { ENCRYPT_DECRYPT, Field, Fields, Page, Result, Section, Segmented } from '@/components/calc';
import { LetterSteps, LetterTable } from '@/components/math/letters';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { type Mode, caesar } from '@/lib/crypto';

export default function Caesar() {
	const [mode, setMode] = useParam('mode', 'encrypt');
	const [text, setText] = useParam('text', 'kryptografia');
	const [k, setK] = useParam('k', '3');
	const encrypt = mode !== 'decrypt';

	const result = compute(() => {
		const key = int(k, 'k', 'Key');
		return { key, ...caesar(text, key, encrypt ? 'encrypt' : 'decrypt') };
	});

	return (
		<Page>
			<Section title="Inputs">
				<div className="grid gap-4">
					<Segmented label="Mode" value={mode as Mode} onChange={setMode} options={ENCRYPT_DECRYPT} />
					<Fields>
						<Field
							label={encrypt ? 'Plaintext' : 'Ciphertext'}
							value={text}
							onChange={setText}
							numeric={false}
							className="sm:col-span-2"
						/>
						<Field
							label="Key"
							value={k}
							onChange={setK}
							invalid={fieldError(result, 'k')}
							hint={encrypt ? 'Added to every letter' : 'Subtracted from every letter'}
						/>
					</Fields>
				</div>
			</Section>
			<Result
				computed={result}
				label={encrypt ? 'Ciphertext' : 'Plaintext'}
				render={(r) => r.output || '—'}
				copy={(r) => r.output}
			/>
			{result.ok && (
				<>
					<Section title="Table">
						<LetterTable steps={result.value.steps} encrypt={encrypt} />
					</Section>
					<Section title="Calculation">
						<LetterSteps
							steps={result.value.steps}
							render={(s) => (
								<>
									({s.code} {encrypt ? '+' : '−'} {result.value.key.toString()}) mod 26 = {s.raw?.toString()}{' '}
									mod 26 = {s.result}
								</>
							)}
						/>
					</Section>
				</>
			)}
		</Page>
	);
}
