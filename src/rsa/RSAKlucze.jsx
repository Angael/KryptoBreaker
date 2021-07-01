import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { modInverse } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import KluczeDisplay from './KluczeDisplay';
import OdwrotnoscTable from 'odwrotnosc/OdwrotnoscTable';

function RSAKlucze() {
	const [p, setP] = useNumberInput(37);
	const [q, setQ] = useNumberInput(47);
	const [e, setE] = useNumberInput(1001);

	const n = p * q;
	const phi = (p - 1) * (q - 1);
	const d = modInverse(e, phi);

	return (
		<>
			<Grid container>
				<Grid item xs={4}>
					<Box p={2}>
						<TextField
							label='p'
							onChange={setP}
							value={p}
							type='number'
							helperText='Wylosowana wartość pierwsza'
						/>
					</Box>
				</Grid>

				<Grid item xs={4}>
					<Box p={2}>
						<TextField
							label='q'
							onChange={setQ}
							value={q}
							type='number'
							helperText='Wylosowana wartość druga'
						/>
					</Box>
				</Grid>

				<Grid item xs={4}>
					<Box p={2}>
						<TextField
							label='e'
							onChange={setE}
							value={e}
							type='number'
							helperText='Wylosowana liczba całkowita od 1 do Φ'
							error={e > phi || e <= 1 || e % 1 !== 0}
						/>
					</Box>
				</Grid>

				<Grid item xs={12}>
					<hr />
					<Box p={2}>
						n = {p} * {q} = {n}
					</Box>
					<hr />
					<Box p={2}>
						phi = Φ = ({p} - 1) * ({q}- 1)= {phi}
					</Box>
					<hr />
					<Box p={2}>
						d = <DisplayFormula number={e} power={-1} modulo={phi} variant={'body1'} /> = {d}
						<OdwrotnoscTable a={e} b={phi} />
					</Box>
				</Grid>
			</Grid>
			<KluczeDisplay e={e} n={n} d={d} />
		</>
	);
}

export default RSAKlucze;
