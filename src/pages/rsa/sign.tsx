import { Field, Note, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { rsaSign } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaSign() {
	const t = useT();
	const keys = useRsaKeyParams();
	const [h, setH] = useParam('h', '357');
	const pow = compute(() => rsaSign(int(h, 'h'), int(keys.d, 'd'), int(keys.n, 'n')));

	return (
		<Page>
			<Note>{t.rsa.signIntro}</Note>
			<RsaKeyFields keys={keys} computed={pow} />
			<Section title={t.common.message}>
				<Fields>
					<Field label="h" value={h} onChange={setH} invalid={fieldError(pow, 'h')} hint={t.rsa.hintH} />
				</Fields>
			</Section>
			<Formula>
				s = <PowExpr base="h" exp="d" mod="n" /> = <PowExpr base={h} exp={keys.d} mod={keys.n} />
			</Formula>
			{pow.ok && (
				<Section title={t.common.squareMultiply}>
					<PowTable pow={pow.value} />
				</Section>
			)}
			<Result
				computed={pow}
				label={t.rsa.signatureS}
				render={(p) => p.result.toString()}
				copy={(p) => p.result.toString()}
			/>
		</Page>
	);
}
