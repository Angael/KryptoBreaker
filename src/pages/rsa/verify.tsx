import { Field, Note, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { rsaVerify } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaVerify() {
	const t = useT();
	const keys = useRsaKeyParams();
	const [h, setH] = useParam('h', '357');
	const [s, setS] = useParam('s', '1630');
	const check = compute(() => rsaVerify(int(h, 'h'), int(s, 's'), int(keys.e, 'e'), int(keys.n, 'n')));

	return (
		<Page>
			<Note>{t.rsa.verifyIntro}</Note>
			<RsaKeyFields keys={keys} computed={check} />
			<Section title={t.common.signedMessage}>
				<Fields>
					<Field
						label="h"
						value={h}
						onChange={setH}
						invalid={fieldError(check, 'h')}
						hint={t.rsa.hintHVerify}
					/>
					<Field label="s" value={s} onChange={setS} invalid={fieldError(check, 's')} hint={t.rsa.hintS} />
				</Fields>
			</Section>
			<Formula>
				<PowExpr base="s" exp="e" mod="n" /> = <PowExpr base={s} exp={keys.e} mod={keys.n} /> = h ?
			</Formula>
			{check.ok && (
				<Section title={t.common.squareMultiply}>
					<PowTable pow={check.value.pow} />
				</Section>
			)}
			<Result
				computed={check}
				label={t.rsa.verification}
				render={(c) => (
					<span className={c.valid ? 'text-success' : 'text-destructive'}>
						{c.pow.result.toString()} {c.valid ? '=' : '≠'} {h} · {c.valid ? t.rsa.matches : t.rsa.mismatch}
					</span>
				)}
			/>
		</Page>
	);
}
