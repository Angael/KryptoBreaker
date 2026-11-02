import { ArrowRightIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { LetterStep } from '@/lib/crypto';
import { DataTable } from '@/components/calc';

/** PT / x / k / y / CT grid, one column per character. */
export function LetterTable({
	steps,
	encrypt,
	keyRow,
}: {
	steps: LetterStep[];
	encrypt: boolean;
	keyRow?: (number | null)[];
}) {
	if (steps.length === 0) return null;
	const rows: [string, (s: LetterStep, i: number) => ReactNode][] = [
		[encrypt ? 'PT' : 'CT', (s) => s.char],
		[encrypt ? 'x' : 'y', (s) => s.code ?? ''],
		...(keyRow
			? [
					['k', (_: LetterStep, i: number) => keyRow[i] ?? ''] as [
						string,
						(s: LetterStep, i: number) => ReactNode,
					],
				]
			: []),
		[encrypt ? 'y' : 'x', (s) => s.result ?? ''],
		[encrypt ? 'CT' : 'PT', (s) => s.out],
	];
	return (
		<DataTable label="Letter table">
			<tbody>
				{rows.map(([label, cell], r) => (
					<tr key={label} className={r === rows.length - 1 ? 'font-semibold' : undefined}>
						<th scope="row" className="sticky left-0 w-12">
							{label}
						</th>
						{steps.map((s, i) => (
							<td key={i} className="min-w-9 whitespace-pre">
								{cell(s, i)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</DataTable>
	);
}

/** One line per letter: `k → formula → y`. */
export function LetterSteps<S extends LetterStep>({
	steps,
	render,
}: {
	steps: S[];
	render: (s: S) => ReactNode;
}) {
	const letters = steps.filter((s) => s.code !== null);
	if (letters.length === 0) return <p className="text-sm text-muted-foreground">Enter some letters.</p>;
	return (
		<ol className="grid gap-1 font-mono text-sm tabular-nums">
			{letters.map((s, i) => (
				<li key={i} className="flex min-w-0 items-center gap-3 rounded-md px-2 py-1.5 even:bg-muted/40">
					<span className="w-4 shrink-0 text-center font-semibold">{s.char}</span>
					<ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
					<span className="min-w-0 flex-1 text-pretty">{render(s)}</span>
					<ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
					<span className="w-4 shrink-0 text-center font-semibold">{s.out}</span>
				</li>
			))}
		</ol>
	);
}
