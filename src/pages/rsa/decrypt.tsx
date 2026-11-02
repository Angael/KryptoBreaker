import { Field, Note, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { rsaDecrypt } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaDecrypt() {
	const t = useT();
	const keys = useRsaKeyParams();
	const [y, setY] = useParam('y', '1327');
	const pow = compute(() => rsaDecrypt(int(y, 'y'), int(keys.d, 'd'), int(keys.n, 'n')));

	return (
		<Page>
			<Note>{t.rsa.decryptIntro}</Note>
			<RsaKeyFields keys={keys} computed={pow} />
			<Section title={t.common.ciphertext}>
				<Fields>
					<Field label="y" value={y} onChange={setY} invalid={fieldError(pow, 'y')} hint={t.rsa.hintY} />
				</Fields>
			</Section>
			<Formula>
				x = <PowExpr base="y" exp="d" mod="n" /> = <PowExpr base={y} exp={keys.d} mod={keys.n} />
			</Formula>
			{pow.ok && (
				<Section title={t.common.squareMultiply}>
					<PowTable pow={pow.value} />
				</Section>
			)}
			<Result
				computed={pow}
				label={t.rsa.messageX}
				render={(p) => p.result.toString()}
				copy={(p) => p.result.toString()}
			/>
		</Page>
	);
}
