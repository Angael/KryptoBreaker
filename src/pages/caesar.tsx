import { Field, Fields, Note, Page, Result, Section, Segmented, useEncryptDecrypt } from '@/components/calc';
import { LetterSteps, LetterTable } from '@/components/math/letters';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { type Mode, caesar } from '@/lib/crypto';

export default function Caesar() {
	const t = useT();
	const modes = useEncryptDecrypt();
	const [mode, setMode] = useParam('mode', 'encrypt');
	const [text, setText] = useParam('text', 'kryptografia');
	const [k, setK] = useParam('k', '3');
	const encrypt = mode !== 'decrypt';
	const textLabel = encrypt ? t.common.plaintext : t.common.ciphertext;
	const outLabel = encrypt ? t.common.ciphertext : t.common.plaintext;

	const result = compute(() => {
		const key = int(k, 'k', 'Key');
		return { key, ...caesar(text, key, encrypt ? 'encrypt' : 'decrypt') };
	});

	return (
		<Page>
			<Note>{t.caesar.intro}</Note>
			<Section title={t.common.inputs}>
				<div className="grid gap-4">
					<Segmented label={t.common.mode} value={mode as Mode} onChange={setMode} options={modes} />
					<Fields>
						<Field
							label={textLabel}
							value={text}
							onChange={setText}
							numeric={false}
							className="sm:col-span-2"
						/>
						<Field
							label={t.common.key}
							value={k}
							onChange={setK}
							invalid={fieldError(result, 'k')}
							hint={encrypt ? t.caesar.hintEncrypt : t.caesar.hintDecrypt}
						/>
					</Fields>
				</div>
			</Section>
			{result.ok && (
				<>
					<Section title={t.common.table}>
						<LetterTable steps={result.value.steps} encrypt={encrypt} />
					</Section>
					<Section title={t.common.calculation}>
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
			<Result computed={result} label={outLabel} render={(r) => r.output || '—'} copy={(r) => r.output} />
		</Page>
	);
}
