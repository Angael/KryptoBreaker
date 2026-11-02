import { ENCRYPT_DECRYPT, Field, Fields, M, Page, Result, Section, Segmented } from '@/components/calc';
import { LetterSteps, LetterTable } from '@/components/math/letters';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { type Mode, ALPHABET_SIZE, affine, affineNumber, inverseSearch } from '@/lib/crypto';

export default function Affine() {
	const [mode, setMode] = useParam('mode', 'encrypt');
	const [input, setInput] = useParam('input', 'word');
	const [text, setText] = useParam('text', 'kryptografia');
	const [x, setX] = useParam('x', '25');
	const [a, setA] = useParam('a', '3');
	const [b, setB] = useParam('b', '7');
	const [p, setP] = useParam('p', '31');
	const encrypt = mode !== 'decrypt';
	const isWord = input !== 'number';
	const m: Mode = encrypt ? 'encrypt' : 'decrypt';

	const key = compute(() => ({ a: int(a, 'a'), b: int(b, 'b') }));
	const word = compute(() => {
		if (!key.ok) throw key.error;
		return affine(text, key.value, m);
	});
	const num = compute(() => {
		if (!key.ok) throw key.error;
		const n = int(p, 'n', 'p');
		return { n, x: int(x, 'x'), ...affineNumber(int(x, 'x'), key.value, m, n) };
	});
	const active = isWord ? word : num;
	const n = isWord ? ALPHABET_SIZE : num.ok ? num.value.n : null;
	const search = key.ok && n !== null && !encrypt ? inverseSearch(key.value.a, n) : null;
	const fmtKey = `(${a},${b})`;

	return (
		<Page>
			<Section title="Inputs">
				<div className="grid gap-4">
					<div className="flex flex-wrap gap-2">
						<Segmented label="Mode" value={mode as Mode} onChange={setMode} options={ENCRYPT_DECRYPT} />
						<Segmented
							label="Input type"
							value={isWord ? 'word' : 'number'}
							onChange={setInput}
							options={[
								{ value: 'word', label: 'Word' },
								{ value: 'number', label: 'Number' },
							]}
						/>
					</div>
					<Fields>
						{isWord ? (
							<Field
								label={encrypt ? 'Plaintext' : 'Ciphertext'}
								value={text}
								onChange={setText}
								numeric={false}
								className="sm:col-span-2 lg:col-span-3"
							/>
						) : (
							<>
								<Field
									label="x"
									value={x}
									onChange={setX}
									invalid={fieldError(num, 'x')}
									hint="Number to transform"
								/>
								<Field
									label="p"
									value={p}
									onChange={setP}
									invalid={fieldError(num, 'n')}
									hint={
										<>
											Works in Z<sub>{p}</sub>
										</>
									}
								/>
							</>
						)}
						<Field
							label="a"
							value={a}
							onChange={setA}
							invalid={fieldError(active, 'a')}
							hint={`Must be coprime with ${isWord ? 26 : p}`}
						/>
						<Field label="b" value={b} onChange={setB} invalid={fieldError(active, 'b')} />
					</Fields>
				</div>
			</Section>

			{isWord ? (
				<Result
					computed={word}
					label={encrypt ? 'Ciphertext' : 'Plaintext'}
					render={(r) => r.output || '—'}
					copy={(r) => r.output}
				/>
			) : (
				<Result
					computed={num}
					label={
						<M>
							{encrypt ? 'e' : 'd'}
							<sub>{fmtKey}</sub>({x})
						</M>
					}
					render={(r) => r.result.toString()}
					copy={(r) => r.result.toString()}
				/>
			)}

			{word.ok && isWord && (
				<Section title="Table">
					<LetterTable steps={word.value.steps} encrypt={encrypt} />
				</Section>
			)}

			{search && search.inverse !== null && (
				<Section title="Inverse of a">
					<ol className="grid gap-0.5 font-mono text-sm tabular-nums">
						{search.trials.map((t) => (
							<li
								key={t.i.toString()}
								className={t.value === 1n ? 'font-semibold text-success' : 'text-muted-foreground'}
							>
								{a} · {t.i.toString()} mod {n!.toString()} = {t.value.toString()}
							</li>
						))}
					</ol>
					<p className="mt-2 font-mono text-sm">
						a<sup>-1</sup> = {search.inverse.toString()}
					</p>
				</Section>
			)}

			{active.ok && key.ok && (
				<Section title="Calculation">
					{isWord && word.ok ? (
						<LetterSteps
							steps={word.value.steps}
							render={(s) =>
								encrypt ? (
									<>
										({a}·{s.code} + {b}) mod 26 = {s.raw?.toString()} mod 26 = {s.result}
									</>
								) : (
									<>
										{word.value.aInverse.toString()}·({s.code} − {b}) mod 26 = {s.raw?.toString()} mod 26 ={' '}
										{s.result}
									</>
								)
							}
						/>
					) : num.ok ? (
						<p className="font-mono text-sm tabular-nums">
							{encrypt
								? `(${a}·${x} + ${b}) mod ${p} = ${num.value.raw} mod ${p} = ${num.value.result}`
								: `${num.value.aInverse}·(${x} − ${b}) mod ${p} = ${num.value.raw} mod ${p} = ${num.value.result}`}
						</p>
					) : null}
				</Section>
			)}
		</Page>
	);
}
