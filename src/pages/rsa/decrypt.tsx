import { Field, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { rsaDecrypt } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaDecrypt() {
	const keys = useRsaKeyParams();
	const [y, setY] = useParam('y', '1327');
	const pow = compute(() => rsaDecrypt(int(y, 'y'), int(keys.d, 'd'), int(keys.n, 'n')));

	return (
		<Page>
			<RsaKeyFields keys={keys} computed={pow} />
			<Section title="Ciphertext">
				<Fields>
					<Field
						label="y"
						value={y}
						onChange={setY}
						invalid={fieldError(pow, 'y')}
						hint="Ciphertext, 0 ≤ y < n"
					/>
				</Fields>
			</Section>
			<Formula>
				x = <PowExpr base="y" exp="d" mod="n" /> = <PowExpr base={y} exp={keys.d} mod={keys.n} />
			</Formula>
			<Result
				computed={pow}
				label="Message x"
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
