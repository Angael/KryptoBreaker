import { type ReactNode, useState } from 'react';
import type { PowResult } from '@/lib/crypto';
import { DataTable, M, PowExpr } from '@/components/calc';
import { Tooltip } from '@/components/ui/tooltip';
import { useT } from '@/i18n';
import { cn } from '@/lib/utils';

const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n: number) => [...String(n)].map((d) => SUBSCRIPTS[Number(d)]).join('');

type Active = { col: 'x' | 'a'; i: number } | null;

/** A table cell that explains how its value was calculated, on hover, focus or tap. */
function NoteCell({
	note,
	open,
	onOpenChange,
	className,
	children,
}: {
	note: ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	className?: string;
	children: ReactNode;
}) {
	return (
		<Tooltip content={note} open={open} onOpenChange={onOpenChange}>
			<td
				tabIndex={0}
				// Taps open the note (touch has no hover). preventDefault keeps Radix from closing it again.
				onPointerDown={(e) => e.preventDefault()}
				onClick={(e) => {
					e.preventDefault();
					onOpenChange(true);
				}}
				className={cn(
					'cursor-help outline-none transition-colors hover:bg-primary/10 hover:shadow-[inset_0_0_0_1px_var(--color-ring)] focus-visible:shadow-[inset_0_0_0_2px_var(--color-ring)]',
					open && 'bg-primary/10 shadow-[inset_0_0_0_1px_var(--color-ring)]',
					className,
				)}
			>
				{children}
			</td>
		</Tooltip>
	);
}

/** Square-and-multiply trace. Pointing at x(i) explains it and highlights the values it came from. */
export function PowTable({ pow, className }: { pow: PowResult; className?: string }) {
	const t = useT();
	const [active, setActive] = useState<Active>(null);
	const { steps, binary, modulus } = pow;
	const lastIndex = steps.length - 1;
	const reversed = [...binary].reverse().join(', ');
	const sourceRow = active?.col === 'x' && active.i > 0 ? active.i - 1 : null;
	const setOpen = (col: 'x' | 'a', i: number) => (open: boolean) =>
		setActive((cur) => (open ? { col, i } : cur?.col === col && cur.i === i ? null : cur));

	const xNote = (i: number): string => {
		const s = steps[i]!;
		if (i === 0) return modulus === 1n ? t.pow.x0mod1 : t.pow.x0;
		const prev = steps[i - 1]!;
		return prev.t
			? `x${sub(i)} = ${prev.x} · ${prev.a} mod ${modulus} = ${s.x}`
			: `x${sub(i)} = x${sub(i - 1)}: ${t.pow.unchanged(sub(i - 1))}`;
	};
	const aNote = (i: number): string => {
		const s = steps[i]!;
		if (i === 0) return s.aNote;
		return `a${sub(i)} = ${steps[i - 1]!.a}² mod ${modulus} = ${s.a}`;
	};

	return (
		<div className={cn('grid min-w-0 content-start gap-3', className)}>
			<div className="text-center">
				<PowExpr base={pow.base.toString()} exp={pow.exponent.toString()} mod={pow.modulus.toString()} />
				<span className="font-mono"> = {pow.result.toString()}</span>
			</div>
			<p className="text-sm text-muted-foreground text-pretty">
				{t.pow.binary(
					<M className="text-foreground">{pow.exponent.toString()}</M>,
					<M className="break-all text-foreground">{binary}</M>,
					<M className="break-all">{reversed}</M>,
				)}
			</p>
			<DataTable label={t.pow.tableLabel}>
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
						const isSource = sourceRow === s.i;
						return (
							<tr key={s.i}>
								<td className="text-muted-foreground">{s.i}</td>
								<NoteCell
									note={xNote(s.i)}
									open={active?.col === 'x' && active.i === s.i}
									onOpenChange={setOpen('x', s.i)}
									className={cn(
										isLast && 'bg-success/15 font-semibold text-success',
										isSource && 'bg-highlight',
									)}
								>
									{s.x.toString()}
								</NoteCell>
								{s.a === null ? (
									<td>{''}</td>
								) : (
									<NoteCell
										note={aNote(s.i)}
										open={active?.col === 'a' && active.i === s.i}
										onOpenChange={setOpen('a', s.i)}
										className={cn(isSource && s.t === 1 && 'bg-highlight')}
									>
										{s.a.toString()}
									</NoteCell>
								)}
								<td className={cn('text-muted-foreground', isSource && 'bg-highlight text-foreground')}>
									{s.t ?? ''}
								</td>
							</tr>
						);
					})}
				</tbody>
			</DataTable>
			<p className="text-xs text-muted-foreground text-pretty">{t.pow.howTo}</p>
		</div>
	);
}
