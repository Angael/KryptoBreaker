import { Field, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { rsaVerify } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaVerify() {
	const keys = useRsaKeyParams();
	const [h, setH] = useParam('h', '357');
	const [s, setS] = useParam('s', '1630');
	const check = compute(() => rsaVerify(int(h, 'h'), int(s, 's'), int(keys.e, 'e'), int(keys.n, 'n')));

	return (
		<Page>
			<RsaKeyFields keys={keys} computed={check} />
			<Section title="Signed message">
				<Fields>
					<Field
						label="h"
						value={h}
						onChange={setH}
						invalid={fieldError(check, 'h')}
						hint="Message or its hash"
					/>
					<Field
						label="s"
						value={s}
						onChange={setS}
						invalid={fieldError(check, 's')}
						hint="Signature sent with it"
					/>
				</Fields>
			</Section>
			<Formula>
				<PowExpr base="s" exp="e" mod="n" /> = <PowExpr base={s} exp={keys.e} mod={keys.n} /> = h ?
			</Formula>
			<Result
				computed={check}
				label="Verification"
				render={(c) => (
					<span className={c.valid ? 'text-success' : 'text-destructive'}>
						{c.pow.result.toString()} {c.valid ? '=' : '≠'} {h} ·{' '}
						{c.valid ? 'valid signature' : 'invalid signature'}
					</span>
				)}
			/>
			{check.ok && (
				<Section title="Square and multiply">
					<PowTable pow={check.value.pow} />
				</Section>
			)}
		</Page>
	);
}
