import type { EuclidResult } from '@/lib/crypto';
import { DataTable, M } from '@/components/calc';
import { cn } from '@/lib/utils';

/**
 * Extended Euclid table. Each row divides n(i) by a(i); t tracks the coefficient so that r ≡ t·a (mod n).
 */
export function EuclidTable({ euclid, className }: { euclid: EuclidResult; className?: string }) {
	const { a, n, aReduced, steps, gcd, inverse, inverseBeforeMod } = euclid;
	const lastIndex = steps.length - 1;
	return (
		<div className={cn('grid min-w-0 gap-3', className)}>
			{a !== aReduced && (
				<p className="text-sm text-muted-foreground">
					First reduce: <M className="text-foreground">{`${a} mod ${n} = ${aReduced}`}</M>
				</p>
			)}
			{steps.length > 0 && (
				<DataTable label="Extended Euclidean algorithm steps">
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
							<tr key={s.i} className="even:bg-muted/40">
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
			<p className="text-sm text-muted-foreground">
				n<sub>i+1</sub> = a<sub>i</sub>, a<sub>i+1</sub> = r<sub>i</sub>, r<sub>i</sub> = n<sub>i</sub> − q
				<sub>i</sub>·a
				<sub>i</sub>, t<sub>i+1</sub> = t<sub>i-1</sub> − q<sub>i</sub>·t<sub>i</sub>. Stop when r = 0; the
				last a is the gcd.
			</p>
			{inverse !== null ? (
				<div className="grid gap-1 font-mono text-sm tabular-nums">
					<div>
						{a.toString()}
						<sup>-1</sup> mod {n.toString()} = {inverseBeforeMod.toString()} mod {n.toString()} ={' '}
						<strong>{inverse.toString()}</strong>
					</div>
					<div className="text-muted-foreground">
						check: {a.toString()} · {inverse.toString()} mod {n.toString()} = {(((a * inverse) % n) + n) % n}
					</div>
				</div>
			) : (
				<p className="text-sm text-destructive">
					gcd({a.toString()}, {n.toString()}) = {gcd.toString()} ≠ 1, so {a.toString()} has no inverse modulo{' '}
					{n.toString()}.
				</p>
			)}
		</div>
	);
}
