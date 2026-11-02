import { Field, Fields, Formula, Page, PowExpr, Result, Section } from '@/components/calc';
import { PowTable } from '@/components/math/pow-table';
import { compute, fieldError, int } from '@/hooks/use-compute';
import { useParam } from '@/hooks/use-param';
import { rsaSign } from '@/lib/crypto';
import { RsaKeyFields, useRsaKeyParams } from './key-fields';

export default function RsaSign() {
	const keys = useRsaKeyParams();
	const [h, setH] = useParam('h', '357');
	const pow = compute(() => rsaSign(int(h, 'h'), int(keys.d, 'd'), int(keys.n, 'n')));

	return (
		<Page>
			<RsaKeyFields keys={keys} computed={pow} />
			<Section title="Message">
				<Fields>
					<Field
						label="h"
						value={h}
						onChange={setH}
						invalid={fieldError(pow, 'h')}
						hint="Message or its hash, 0 ≤ h < n"
					/>
				</Fields>
			</Section>
			<Formula>
				s = <PowExpr base="h" exp="d" mod="n" /> = <PowExpr base={h} exp={keys.d} mod={keys.n} />
			</Formula>
			<Result
				computed={pow}
				label="Signature s"
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
