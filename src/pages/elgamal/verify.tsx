import { Field, Fields, Formula, M, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { elgamalVerify } from '@/lib/crypto';
import { ElGamalKeyFields, useElGamalKeys } from './key-fields';

export default function ElGamalVerify() {
	const state = useElGamalKeys();
	const [h, setH] = useParam('h', '357');
	const [u, setU] = useParam('u', '1310');
	const [s, setS] = useParam('s', '1579');
	const check = compute(() => {
		if (!state.keys.ok) throw state.keys.error;
		return elgamalVerify(state.keys.value, int(h, 'h'), int(u, 'u'), int(s, 's'));
	});

	return (
		<Page>
			<ElGamalKeyFields state={state} computed={check} />
			<Section title="Signed message">
				<Fields>
					<Field label="h" value={h} onChange={setH} invalid={fieldError(check, 'h')} hint="Message hash" />
					<Field
						label="u"
						value={u}
						onChange={setU}
						invalid={fieldError(check, 'u')}
						hint="First part of the signature"
					/>
					<Field
						label="s"
						value={s}
						onChange={setS}
						invalid={fieldError(check, 's')}
						hint="Second part of the signature"
					/>
				</Fields>
			</Section>
			<Formula className="grid gap-1">
				<div>
					f = <PowExpr base="α" exp="h" mod="p" />
				</div>
				<div>
					g = β<sup>u</sup> · u<sup>s</sup> mod p
				</div>
				<div className="text-sm text-muted-foreground">The signature is valid when f = g.</div>
			</Formula>
			<Result
				computed={check}
				label="Verification"
				render={(c) => (
					<span className={c.valid ? 'text-success' : 'text-destructive'}>
						f = {c.f.result.toString()} {c.valid ? '=' : '≠'} {c.g.toString()} = g ·{' '}
						{c.valid ? 'valid signature' : 'invalid signature'}
					</span>
				)}
			/>
			{check.ok && (
				<>
					<Section title="Calculate f">
						<PowTable pow={check.value.f} />
					</Section>
					<Section title="Calculate g">
						<div className="grid gap-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div className="grid content-start gap-2">
									<h3 className="text-sm font-medium">
										<PowExpr base="β" exp="u" mod="p" />
									</h3>
									<PowTable pow={check.value.left} />
								</div>
								<div className="grid content-start gap-2">
									<h3 className="text-sm font-medium">
										<PowExpr base="u" exp="s" mod="p" />
									</h3>
									<PowTable pow={check.value.right} />
								</div>
							</div>
							<M className="text-sm">
								g = {check.value.left.result.toString()} · {check.value.right.result.toString()} mod {state.p}{' '}
								= {check.value.g.toString()}
							</M>
						</div>
					</Section>
				</>
			)}
		</Page>
	);
}
