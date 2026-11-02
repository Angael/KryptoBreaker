import type { EuclidResult } from '@/lib/crypto';
import { DataTable, M } from '@/components/calc';
import { useT } from '@/i18n';
import { cn } from '@/lib/utils';

/**
 * Extended Euclid table. Each row divides n(i) by a(i); t tracks the coefficient so that r ≡ t·a (mod n).
 */
export function EuclidTable({ euclid, className }: { euclid: EuclidResult; className?: string }) {
	const t = useT();
	const { a, n, aReduced, steps, gcd, inverse, inverseBeforeMod } = euclid;
	const lastIndex = steps.length - 1;
	return (
		<div className={cn('grid min-w-0 gap-3', className)}>
			{a !== aReduced && (
				<p className="text-sm text-muted-foreground">
					{t.euclid.reduce} <M className="text-foreground">{`${a} mod ${n} = ${aReduced}`}</M>
				</p>
			)}
			{steps.length > 0 && (
				<DataTable label={t.euclid.tableLabel}>
					<thead>
						<tr>
							<th scope="col">i</th>
							<th scope="col">
								n<sub>i</sub>
							</th>
							<th scope="col">
								a<sub>i</sub>
							</th>
							<th scope="col">
								q<sub>i</sub>
							</th>
							<th scope="col">
								r<sub>i</sub>
							</th>
							<th scope="col">
								t<sub>i-1</sub>
							</th>
							<th scope="col">
								t<sub>i</sub>
							</th>
							<th scope="col">
								t<sub>i+1</sub>
							</th>
						</tr>
					</thead>
					<tbody>
						{steps.map((s) => (
							<tr key={s.i}>
								<td className="text-muted-foreground">{s.i}</td>
								<td>{s.dividend.toString()}</td>
								<td>{s.divisor.toString()}</td>
								<td>{s.q.toString()}</td>
								<td className={cn(s.i === lastIndex - 1 && gcd === 1n && 'font-semibold')}>
									{s.r.toString()}
								</td>
								<td>{s.tPrev.toString()}</td>
								<td
									className={cn(
										s.i === lastIndex && inverse !== null && 'bg-success/15 font-semibold text-success',
									)}
								>
									{s.t.toString()}
								</td>
								<td>{s.tNext.toString()}</td>
							</tr>
						))}
					</tbody>
				</DataTable>
			)}
			<p className="text-sm text-muted-foreground text-pretty">{t.euclid.howTo}</p>
			{inverse !== null ? (
				<div className="grid gap-1 font-mono text-sm tabular-nums">
					<div>
						{a.toString()}
						<sup>-1</sup> mod {n.toString()} = {inverseBeforeMod.toString()} mod {n.toString()} ={' '}
						<strong>{inverse.toString()}</strong>
					</div>
					<div className="text-muted-foreground">
						{t.euclid.check} {a.toString()} · {inverse.toString()} mod {n.toString()} ={' '}
						{(((a * inverse) % n) + n) % n}
					</div>
				</div>
			) : (
				<p className="text-sm text-destructive">
					{t.euclid.noInverse(a.toString(), n.toString(), gcd.toString())}
				</p>
			)}
		</div>
	);
}
