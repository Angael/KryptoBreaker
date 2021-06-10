import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isPrime, modInverse } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'diffie-hellman/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'diffie-hellman/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';

function RSASzyfrowanie() {
	//Wiadomość x
	const [message, setMessage] = useNumberInput(20);
	const [e, setE] = useNumberInput(1001);
	const [d, setD] = useNumberInput(761);
	const [n, setN] = useNumberInput(1739);

	const solutionPow = useMemo(() => getFastPowerMod(n, message, e), [n, message, e]);

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
								Bob chce wysłać do Alicji wiadomość, której wartość wynosi x={message} zaszyfrowaną
								przy użyciu algorytmu RSA. Oblicz wartość szyfrogramu y.
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
								y = c =<DisplayFormula g={'x'} power={'n'} p={'e'} variant={'body1'} /> ={' '}
								<DisplayFormula g={message} power={e} p={n} variant={'body1'} /> ={' '}
								{solutionPow.result}
							</Box>
							<Box p={2} align='center'>
								Szyfrogram y = {solutionPow.result}
							</Box>
						</Grid>

						<Grid container justify='center'>
							<Grid item xs={6}>
								<FastPowerTable stepsObj={solutionPow} />
							</Grid>
						</Grid>
						{/* <Grid item xs={12}>
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
								d = <DisplayFormula p={phi} g={e} power={-1} variant={'body1'} /> = {d}
							</Box>
							<hr />
							<Box p={2}>Tutaj wstaw tabelke z liczenia odwrotności modularnej, tej tuż wyżej</Box>
						</Grid>*/}
					</Grid>
				</Paper>
			</Box>
		</>
	);
}

export default RSASzyfrowanie;
