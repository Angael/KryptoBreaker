import type { Matrix } from '@/lib/crypto';
import { cn } from '@/lib/utils';

const bracket =
	'relative px-2.5 before:absolute before:inset-y-0 before:left-0 before:w-2 before:rounded-l-sm before:border before:border-r-0 before:border-foreground/60 after:absolute after:inset-y-0 after:right-0 after:w-2 after:rounded-r-sm after:border after:border-l-0 after:border-foreground/60';

export function MatrixView({
	matrix,
	label,
	className,
}: {
	matrix: Matrix;
	label?: string;
	className?: string;
}) {
	return (
		<div className={cn('inline-block max-w-full overflow-x-auto', className)}>
			<table
				aria-label={label}
				className={cn(bracket, 'border-separate border-spacing-x-1 font-mono text-sm tabular-nums')}
			>
				<tbody>
					{matrix.map((row, i) => (
						<tr key={i}>
							{row.map((v, j) => (
								<td key={j} className="min-w-8 px-1 py-0.5 text-center">
									{v.toString()}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function MatrixInput({
	values,
	onChange,
	invalid,
	label,
}: {
	values: string[][];
	onChange: (row: number, col: number, value: string) => void;
	invalid?: boolean;
	label: string;
}) {
	return (
		<div className="max-w-full overflow-x-auto">
			<table aria-label={label} className={cn(bracket, 'border-separate border-spacing-1')}>
				<tbody>
					{values.map((row, i) => (
						<tr key={i}>
							{row.map((v, j) => (
								<td key={j}>
									<input
										value={v}
										inputMode="numeric"
										aria-label={`${label} row ${i + 1} column ${j + 1}`}
										aria-invalid={invalid || undefined}
										onChange={(e) => onChange(i, j, e.target.value)}
										onFocus={(e) => e.target.select()}
										className="h-10 w-12 rounded-md border border-input bg-transparent text-center font-mono text-base tabular-nums outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 aria-invalid:border-destructive sm:text-sm"
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
