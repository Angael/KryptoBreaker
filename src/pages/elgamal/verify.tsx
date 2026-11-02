import { Field, Fields, Formula, M, Note, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { elgamalVerify } from '@/lib/crypto';
import { ElGamalKeyFields, useElGamalKeys } from './key-fields';

export default function ElGamalVerify() {
	const t = useT();
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
			<Note>{t.elgamal.verifyIntro}</Note>
			<ElGamalKeyFields state={state} computed={check} />
			<Section title={t.common.signedMessage}>
				<Fields>
					<Field
						label="h"
						value={h}
						onChange={setH}
						invalid={fieldError(check, 'h')}
						hint={t.elgamal.hintH}
					/>
					<Field
						label="u"
						value={u}
						onChange={setU}
						invalid={fieldError(check, 'u')}
						hint={t.elgamal.hintU}
					/>
					<Field
						label="s"
						value={s}
						onChange={setS}
						invalid={fieldError(check, 's')}
						hint={t.elgamal.hintSVerify}
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
				<div className="text-sm text-muted-foreground">{t.elgamal.validWhen}</div>
			</Formula>
			{check.ok && (
				<>
					<Section title={t.elgamal.calcF}>
						<PowTable pow={check.value.f} />
					</Section>
					<Section title={t.elgamal.calcG}>
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
			<Result
				computed={check}
				label={t.rsa.verification}
				render={(c) => (
					<span className={c.valid ? 'text-success' : 'text-destructive'}>
						f = {c.f.result.toString()} {c.valid ? '=' : '≠'} {c.g.toString()} = g ·{' '}
						{c.valid ? t.common.validSignature : t.common.invalidSignature}
					</span>
				)}
			/>
		</Page>
	);
}
