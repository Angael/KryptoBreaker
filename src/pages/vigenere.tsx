import { ENCRYPT_DECRYPT, Field, Fields, Page, Result, Section, Segmented } from '@/components/calc';
import { LetterSteps, LetterTable } from '@/components/math/letters';
import { compute, fieldError } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { type Mode, vigenere } from '@/lib/crypto';

export default function Vigenere() {
	const [mode, setMode] = useParam('mode', 'encrypt');
	const [text, setText] = useParam('text', 'kryptografia');
	const [key, setKey] = useParam('key', 'wakacje');
	const encrypt = mode !== 'decrypt';

	const result = compute(() => vigenere(text, key, encrypt ? 'encrypt' : 'decrypt'));

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
							value={key}
							onChange={setKey}
							numeric={false}
							invalid={fieldError(result, 'key')}
							hint="Repeated over the letters of the text"
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
						<LetterTable
							steps={result.value.steps}
							encrypt={encrypt}
							keyRow={result.value.steps.map((s) => s.keyCode)}
						/>
					</Section>
					<Section title="Calculation">
						<LetterSteps
							steps={result.value.steps}
							render={(s) => (
								<>
									({s.code} {encrypt ? '+' : '−'} {s.keyCode}
									<sub className="text-muted-foreground">{s.keyChar}</sub>) mod 26 = {s.raw?.toString()} mod
									26 = {s.result}
								</>
							)}
						/>
					</Section>
				</>
			)}
		</Page>
	);
}
