import { useState } from 'react';
import { Field, M, Note, Page, Result, Section, Segmented } from '@/components/calc';
import { LetterTable } from '@/components/math/letters';
import { MatrixInput, MatrixView } from '@/components/math/matrix';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import {
	type HillMode,
	HILL_MAX_SIZE,
	HILL_MIN_SIZE,
	type LetterStep,
	InputError,
	codeToLetter,
	hill,
	letterToCode,
} from '@/lib/crypto';

const DEFAULT_KEY = '9,3,4;7,2,1;6,5,8';

const parseKey = (s: string) => s.split(';').map((row) => row.split(','));
const serializeKey = (rows: string[][]) => rows.map((r) => r.join(',')).join(';');
const identityKey = (n: number) =>
	Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? '1' : '0')));

export default function Hill() {
	const t = useT();
	const [mode, setMode] = useParam('mode', 'encrypt');
	const [text, setText] = useParam('text', 'telewizor');
	const [keyParam, setKeyParam] = useParam('key', DEFAULT_KEY);
	const [afterMod, setAfterMod] = useState(true);

	const rows = parseKey(keyParam);
	const size = rows.length;
	const hillMode = mode as HillMode;
	const encrypt = hillMode === 'encrypt';

	const result = compute(() => {
		const key = rows.map((r) => {
			if (r.length !== size) throw new InputError('Key must be a square matrix.', 'key', 'square');
			return r.map((v) => int(v, 'key', 'keyEntry'));
		});
		return hill(text, key, hillMode);
	});

	const setCell = (i: number, j: number, value: string) =>
		setKeyParam(serializeKey(rows.map((r, ri) => r.map((v, ci) => (ri === i && ci === j ? value : v)))));

	const outputSteps: LetterStep[] = result.ok
		? (() => {
				const letters = [...text].filter((c) => letterToCode(c) !== null);
				const padded = [...letters, ...Array<string>(result.value.padding).fill('a')];
				return result.value.product.flat().map((v, i) => {
					const char = padded[i] ?? '';
					const code = letterToCode(char);
					return { char, code, raw: null, result: Number(v), out: codeToLetter(v) };
				});
			})()
		: [];

	return (
		<Page>
			<Note>{t.hill.intro}</Note>
			<Section title={t.common.inputs}>
				<div className="grid gap-5">
					<Segmented
						label={t.common.mode}
						value={hillMode}
						onChange={setMode}
						options={[
							{ value: 'encrypt', label: t.common.encrypt },
							{ value: 'decrypt', label: t.hill.decrypt },
							{ value: 'decrypt-with-inverse', label: t.hill.decryptWithInverse },
						]}
					/>
					<Field
						label={encrypt ? t.common.plaintext : t.common.ciphertext}
						value={text}
						onChange={setText}
						numeric={false}
						invalid={fieldError(result, 'text')}
					/>
					<div className="grid gap-3">
						<div className="flex items-center justify-between gap-4">
							<Label id="hill-size">{t.hill.keySize}</Label>
							<M className="text-sm text-muted-foreground">
								{size}×{size}
							</M>
						</div>
						<Slider
							aria-labelledby="hill-size"
							aria-label={t.hill.keySize}
							min={HILL_MIN_SIZE}
							max={HILL_MAX_SIZE}
							step={1}
							value={[size]}
							onValueChange={([n]) => n && n !== size && setKeyParam(serializeKey(identityKey(n)))}
							className="max-w-sm"
						/>
					</div>
					<div className="grid gap-2">
						<span className="text-sm font-medium">
							{hillMode === 'decrypt-with-inverse' ? t.hill.inverseKey : t.hill.key}
						</span>
						<MatrixInput
							label={t.hill.keyLabel}
							cellLabel={(r, c) => t.hill.cell(t.hill.keyLabel, r, c)}
							values={rows}
							onChange={setCell}
							invalid={fieldError(result, 'key') || (result.ok && !result.value.keyInvertible)}
						/>
						{result.ok && !result.value.keyInvertible && (
							<p className="text-sm text-destructive">{t.hill.notInvertible}</p>
						)}
					</div>
				</div>
			</Section>

			{result.ok && (
				<>
					{(result.value.padding > 0 || result.value.ignored > 0) && (
						<Note>
							{result.value.ignored > 0 && t.hill.skipped(result.value.ignored)}
							{result.value.padding > 0 && t.hill.padded(result.value.padding, size)}
						</Note>
					)}

					{result.value.inverse && (
						<Section title={t.hill.inverseTitle}>
							<div className="grid gap-4">
								<p className="text-sm text-muted-foreground text-pretty">{t.hill.inverseHowTo}</p>
								<p className="font-mono text-sm tabular-nums">
									det K = {result.value.inverse.det.toString()} ≡ {result.value.inverse.detMod.toString()}{' '}
									(mod 26), (det K)
									<sup>-1</sup> = {result.value.inverse.detInverse.toString()}
								</p>
								<div className="flex flex-wrap items-center gap-3 font-mono text-sm">
									<span>
										K<sup>-1</sup> = {result.value.inverse.detInverse.toString()} · adj K =
									</span>
									<MatrixView matrix={result.value.inverse.adjugate} label={t.hill.adjugate} />
									<span>· {result.value.inverse.detInverse.toString()} mod 26 =</span>
									<MatrixView matrix={result.value.inverse.inverse} label={t.hill.inverseKey} />
								</div>
							</div>
						</Section>
					)}

					<Section title={t.common.calculation}>
						<div className="grid gap-4">
							<p className="text-sm text-muted-foreground text-pretty">{t.hill.calcHowTo}</p>
							<div className="flex flex-wrap items-center gap-3 font-mono">
								<MatrixView matrix={result.value.textMatrix} label={t.hill.textMatrix} />
								<span aria-hidden>·</span>
								<MatrixView matrix={result.value.multiplier} label={t.hill.keyMatrix} />
								<span aria-hidden>{afterMod ? '≡' : '='}</span>
								<MatrixView
									matrix={afterMod ? result.value.product : result.value.productBeforeMod}
									label={t.hill.resultMatrix}
								/>
								{afterMod && <span className="text-sm text-muted-foreground">(mod 26)</span>}
							</div>
							<div className="flex items-center gap-2">
								<Switch id="after-mod" checked={afterMod} onCheckedChange={setAfterMod} />
								<Label htmlFor="after-mod" className="font-normal">
									{t.hill.afterMod}
								</Label>
							</div>
						</div>
					</Section>

					<Section title={t.common.table}>
						<LetterTable steps={outputSteps} encrypt={encrypt} />
					</Section>
				</>
			)}
			<Result
				computed={result}
				label={encrypt ? t.common.ciphertext : t.common.plaintext}
				render={(r) => r.output}
				copy={(r) => r.output}
			/>
		</Page>
	);
}
