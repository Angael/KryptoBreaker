import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';

function RSASzyfrowanie() {
	//Wiadomość x
	const [message, setMessage] = useNumberInput(20);
	const [e, setE] = useNumberInput(1001);
	const [d, setD] = useNumberInput(761);
	const [n, setN] = useNumberInput(1739);

	// x^n mod e
	const solutionPow = useMemo(() => getFastPowerMod(message, e, n), [n, message, e]);

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<KluczeDisplay e={e} n={n} d={d} />
				</Grid>
				<Grid item xs={12}>
					<Box p={2}>
						Bob chce wysłać do Alicji wiadomość, której wartość wynosi x={message} zaszyfrowaną przy
						użyciu algorytmu RSA. Oblicz wartość szyfrogramu y.
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
							label='x'
							onChange={setMessage}
							value={message}
							type='number'
							helperText='Wiadomość'
						/>
					</Box>
				</Grid>

				<Grid item xs={12} justify='center'>
					<Box p={2} align='center'>
						<Typography variant='h3'>Szyfrowanie:</Typography>
						y = c =<DisplayFormula number={'x'} power={'e'} modulo={'n'} variant={'body1'} /> ={' '}
						<DisplayFormula number={message} power={e} modulo={n} variant={'body1'} /> ={' '}
						{solutionPow.result}
					</Box>
					<Box p={2} align='center'>
						Szyfrogram y = {solutionPow.result}
					</Box>
				</Grid>

				<Grid container justify='center'>
					<Grid item xs={12} sm={8} md={6}>
						<FastPowerTable stepsObj={solutionPow} pow={e} />
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default RSASzyfrowanie;
