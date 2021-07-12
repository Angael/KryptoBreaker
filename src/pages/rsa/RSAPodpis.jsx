import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'pages/diffie-hellman/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';

function RSAPodpis() {
	//Wiadomość x
	const [x, setX] = useNumberInput(357);
	const [e, setE] = useNumberInput(1001);
	const [d, setD] = useNumberInput(761);
	const [n, setN] = useNumberInput(1739);

	// x^n mod e
	const solutionPow = useMemo(() => getFastPowerMod(x, d, n), [n, x, d]);

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<KluczeDisplay e={e} n={n} d={d} />
				</Grid>
				<Grid item xs={12}>
					<Box p={2}>
						Alicja chce wysłać do Boba wiadomość, której skrót wynosi h={x}. Wygenerować przez
						Alicję podpis cyfrowy RSA dla tej wiadomości.
					</Box>
				</Grid>

				<Grid item xs={4}>
					<Box p={2}>
						<TextField
							label='n'
							onChange={setN}
							value={n}
							type='number'
							helperText='Druga wartość obu kluczy'
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
							helperText='Pierwsza wartość klucza 1 - publicznego'
						/>
					</Box>
				</Grid>

				<Grid item xs={4}>
					<Box p={2}>
						<TextField
							label='d'
							onChange={setD}
							value={d}
							type='number'
							helperText='Pierwsza wartość klucza 2 - prywatnego'
						/>
					</Box>
				</Grid>

				<Grid item xs={12}>
					<Box p={2}>
						<TextField
							label='x albo h'
							onChange={setX}
							value={x}
							type='number'
							helperText='Wiadomość lub skrót wiadomości'
						/>
					</Box>
				</Grid>

				<Grid item xs={12} justify='center'>
					<Box p={2} align='center'>
						<Typography variant='h3'>Generowanie podpisu:</Typography>
						podpis s = <DisplayFormula
							number={'h'}
							power={'d'}
							modulo={'n'}
							variant={'body1'}
						/> = <DisplayFormula number={x} power={d} number={n} variant={'body1'} /> ={' '}
						{solutionPow.result}
					</Box>
					<Box p={2} align='center'>
						Podpis s = {solutionPow.result}
					</Box>
				</Grid>

				<Grid container justify='center'>
					<Grid item xs={12} sm={8} md={6}>
						<FastPowerTable stepsObj={solutionPow} pow={d} />
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default RSAPodpis;
