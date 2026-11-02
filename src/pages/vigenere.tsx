import { Field, Fields, Note, Page, Result, Section, Segmented, useEncryptDecrypt } from '@/components/calc';
import { LetterSteps, LetterTable } from '@/components/math/letters';
import { compute, fieldError } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { type Mode, vigenere } from '@/lib/crypto';

export default function Vigenere() {
	const t = useT();
	const modes = useEncryptDecrypt();
	const [mode, setMode] = useParam('mode', 'encrypt');
	const [text, setText] = useParam('text', 'kryptografia');
	const [key, setKey] = useParam('key', 'wakacje');
	const encrypt = mode !== 'decrypt';

	const result = compute(() => vigenere(text, key, encrypt ? 'encrypt' : 'decrypt'));

	return (
		<Page>
			<Note>{t.vigenere.intro}</Note>
			<Section title={t.common.inputs}>
				<div className="grid gap-4">
					<Segmented label={t.common.mode} value={mode as Mode} onChange={setMode} options={modes} />
					<Fields>
						<Field
							label={encrypt ? t.common.plaintext : t.common.ciphertext}
							value={text}
							onChange={setText}
							numeric={false}
							className="sm:col-span-2"
						/>
						<Field
							label={t.common.key}
							value={key}
							onChange={setKey}
							numeric={false}
							invalid={fieldError(result, 'key')}
							hint={t.vigenere.hintKey}
						/>
					</Fields>
				</div>
			</Section>
			{result.ok && (
				<>
					<Section title={t.common.table}>
						<LetterTable
							steps={result.value.steps}
							encrypt={encrypt}
							keyRow={result.value.steps.map((s) => s.keyCode)}
						/>
					</Section>
					<Section title={t.common.calculation}>
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
			<Result
				computed={result}
				label={encrypt ? t.common.ciphertext : t.common.plaintext}
				render={(r) => r.output || '—'}
				copy={(r) => r.output}
			/>
		</Page>
	);
}
