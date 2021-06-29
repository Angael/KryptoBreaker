import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isPrime, modInverse } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';

function RSADeszyfrowanie() {
	//Zaszyfrowana wiadomosc x, szyfrogram y
	const [y, setY] = useNumberInput(1327);
	const [e, setE] = useNumberInput(1001);
	const [d, setD] = useNumberInput(761);
	const [n, setN] = useNumberInput(1739);

	// y^d mod n
	const solutionPow = useMemo(() => getFastPowerMod(y, d, n), [n, y, d]);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={12}>
							<KluczeDisplay e={e} n={n} d={d} />
						</Grid>
						<Grid item xs={12}>
							<Box p={2}>
								Alicja otrzymała od Boba szyfrogram y={y}. Obliczyć przez Alicję wartość tekstu
								jawnego x.
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
									label='y'
									onChange={setY}
									value={y}
									type='number'
									helperText='Szyfrogram'
								/>
							</Box>
						</Grid>

						<Grid item xs={12} justify='center'>
							<Box p={2} align='center'>
								<Typography variant='h3'>Deszyfrowanie:</Typography>x = wiadomość ={' '}
								<DisplayFormula number={'y'} power={'d'} modulo={'n'} variant={'body1'} /> ={' '}
								<DisplayFormula number={y} power={d} number={n} variant={'body1'} /> ={' '}
								{solutionPow.result}
							</Box>
							<Box p={2} align='center'>
								Wiadomość x = {solutionPow.result}
							</Box>
						</Grid>

						<Grid container justify='center'>
							<Grid item xs={12} sm={8} md={6}>
								<FastPowerTable stepsObj={solutionPow} pow={d} />
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	);
}

export default RSADeszyfrowanie;
