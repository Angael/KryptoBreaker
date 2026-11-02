import { useState } from 'react';
import type { PowResult } from '@/lib/crypto';
import { DataTable, M, PowExpr } from '@/components/calc';
import { cn } from '@/lib/utils';

/**
 * Square-and-multiply trace. Hovering or focusing x(i) highlights the values it was computed from.
 */
export function PowTable({ pow, className }: { pow: PowResult; className?: string }) {
	const [active, setActive] = useState<number | null>(null);
	const { steps, binary } = pow;
	const lastIndex = steps.length - 1;
	const reversed = [...binary].reverse().join(', ');
	const source = active === null || active === 0 ? null : steps[active - 1]!;

	return (
		<div className={cn('grid min-w-0 gap-3', className)}>
			<div className="text-center">
				<PowExpr base={pow.base.toString()} exp={pow.exponent.toString()} mod={pow.modulus.toString()} />
				<span className="font-mono"> = {pow.result.toString()}</span>
			</div>
			<p className="text-sm text-muted-foreground">
				<M className="text-foreground">{pow.exponent.toString()}</M> in binary is{' '}
				<M className="break-all text-foreground">{binary}</M>; reversed, t = [
				<M className="break-all">{reversed}</M>]
			</p>
			<DataTable label="Square-and-multiply steps">
				<thead>
					<tr>
						<th scope="col">i</th>
						<th scope="col">
							x<sub>i</sub>
						</th>
						<th scope="col">
							a<sub>i</sub>
						</th>
						<th scope="col">
							t<sub>i</sub>
						</th>
					</tr>
				</thead>
				<tbody>
					{steps.map((s) => {
						const isLast = s.i === lastIndex;
						const isSource = source !== null && s.i === active! - 1;
						return (
							<tr key={s.i} className="even:bg-muted/40">
								<td className="text-muted-foreground">{s.i}</td>
								<td
									title={s.xNote}
									tabIndex={0}
									onMouseEnter={() => setActive(s.i)}
									onMouseLeave={() => setActive(null)}
									onFocus={() => setActive(s.i)}
									onBlur={() => setActive(null)}
									className={cn(
										'cursor-default outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
										isLast && 'bg-success/15 font-semibold text-success',
										isSource && 'bg-highlight',
									)}
								>
									{s.x.toString()}
								</td>
								<td title={s.aNote} className={cn(isSource && s.t === 1 && 'bg-highlight')}>
									{s.a?.toString() ?? ''}
								</td>
								<td className="text-muted-foreground">{s.t ?? ''}</td>
							</tr>
						);
					})}
				</tbody>
			</DataTable>
			<p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
				{active !== null ? (
					<M>
						x<sub>{active}</sub>: {steps[active]!.xNote}
					</M>
				) : (
					<>
						x<sub>i+1</sub> = x<sub>i</sub>·a<sub>i</sub> when t<sub>i</sub> = 1; a<sub>i+1</sub> = a
						<sub>i</sub>². Hover a value of x to trace it.
					</>
				)}
			</p>
		</div>
	);
}
