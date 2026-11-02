import { Field, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { rsaEncrypt } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaEncrypt() {
	const keys = useRsaKeyParams();
	const [x, setX] = useParam('x', '20');
	const pow = compute(() => rsaEncrypt(int(x, 'x'), int(keys.e, 'e'), int(keys.n, 'n')));

	return (
		<Page>
			<RsaKeyFields keys={keys} computed={pow} />
			<Section title="Message">
				<Fields>
					<Field
						label="x"
						value={x}
						onChange={setX}
						invalid={fieldError(pow, 'x')}
						hint="Message, 0 ≤ x < n"
					/>
				</Fields>
			</Section>
			<Formula>
				y = <PowExpr base="x" exp="e" mod="n" /> = <PowExpr base={x} exp={keys.e} mod={keys.n} />
			</Formula>
			<Result
				computed={pow}
				label="Ciphertext y"
				render={(p) => p.result.toString()}
				copy={(p) => p.result.toString()}
			/>
			{pow.ok && (
				<Section title="Square and multiply">
					<PowTable pow={pow.value} />
				</Section>
			)}
		</Page>
	);
}
