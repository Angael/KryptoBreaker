import { Field, Note, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { useT } from '@/i18n';
import { rsaEncrypt } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaEncrypt() {
	const t = useT();
	const keys = useRsaKeyParams();
	const [x, setX] = useParam('x', '20');
	const pow = compute(() => rsaEncrypt(int(x, 'x'), int(keys.e, 'e'), int(keys.n, 'n')));

	return (
		<Page>
			<Note>{t.rsa.encryptIntro}</Note>
			<RsaKeyFields keys={keys} computed={pow} />
			<Section title={t.common.message}>
				<Fields>
					<Field label="x" value={x} onChange={setX} invalid={fieldError(pow, 'x')} hint={t.rsa.hintX} />
				</Fields>
			</Section>
			<Formula>
				y = <PowExpr base="x" exp="e" mod="n" /> = <PowExpr base={x} exp={keys.e} mod={keys.n} />
			</Formula>
			{pow.ok && (
				<Section title={t.common.squareMultiply}>
					<PowTable pow={pow.value} />
				</Section>
			)}
			<Result
				computed={pow}
				label={t.rsa.ciphertextY}
				render={(p) => p.result.toString()}
				copy={(p) => p.result.toString()}
			/>
		</Page>
	);
}
