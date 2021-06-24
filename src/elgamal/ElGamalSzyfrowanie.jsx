import { useMemo } from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'diffie-hellman/getFastPowerMod';
import KluczeDisplay from './KluczeDisplay';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import { mod } from 'utils/numHelpers';
import FastPowerTable from './../diffie-hellman/FastPowerTable';

function ElGamalSzyfrowanie() {
	const [p, setP] = useNumberInput(1619);
	const [alpha, setAlpha] = useNumberInput(2);
	const [t, setT] = useNumberInput(937);
	const [x, setX] = useNumberInput(20);
	const [r, setR] = useNumberInput(320);

	const solutionPowA = useMemo(() => getFastPowerMod(p, alpha, t), [p, alpha, t]);

	const beta = solutionPowA.result;

	const solutionPowY1 = useMemo(() => getFastPowerMod(p, alpha, r), [p, alpha, r]);
	const solutionPowY2 = useMemo(() => getFastPowerMod(p, beta, r), [p, beta, r]);
	const y1 = solutionPowY1.result;
	const y2 = mod(x * solutionPowY2.result, p);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={12}>
							<Grid item xs={12}>
								<KluczeDisplay p={p} g={alpha} beta={beta} t={t} />
							</Grid>
						</Grid>

						<Grid item xs={3}>
							<Box p={2}>
								<TextField
									label='α'
									onChange={setAlpha}
									value={alpha}
									type='number'
									helperText='Generator'
								/>
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box p={2}>
								<TextField label='p' onChange={setP} value={p} type='number' />
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box p={2}>
								<TextField
									label='β'
									disabled
									value={solutionPowA.result}
									type='number'
									helperText='Wygenerowana liczba'
								/>
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box p={2}>
								<TextField
									label='t'
									onChange={setT}
									value={t}
									type='number'
									helperText='Wylosowana wartość pierwsza'
								/>
							</Box>
						</Grid>
						<Grid item xs={12} align='center'>
							<Box p={2}>
								<Typography variant='h4'>Opis zadania:</Typography>
								<Typography>
									Bob chce wysłać do Alicji wiadomość której wartość liczbowa wynosi x={x}.
								</Typography>
								<Typography>
									Oblicz wartość tekstu zaszyfrowanego y, wiedząc, że do zaszyfrowania wybrany
									został randomizer r={r}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={6} align='right'>
							<Box p={2}>
								<TextField
									label='x'
									onChange={setX}
									value={x}
									type='number'
									helperText='Wiadomość'
								/>
							</Box>
						</Grid>
						<Grid item xs={6} align='left'>
							<Box p={2}>
								<TextField
									label='r'
									onChange={setR}
									value={r}
									type='number'
									helperText='Randomizer'
								/>
							</Box>
						</Grid>
						<Grid item xs={12} align='center'>
							<Box m={2} p={2} display='inline-block'>
								<Paper variant='outlined'>
									<Box m={2}>
										<Typography variant='h4' align='center'>
											C = (y<sub>1</sub>, y<sub>2</sub>) = E
											<sub>
												k<sub>1</sub>
											</sub>
											(r,x) = (α<sup>r</sup> mod p, x * β<sup>r</sup> mod p)
										</Typography>
									</Box>
								</Paper>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box p={2} align='center'>
								<Typography variant='h4' gutterBottom>
									Liczenie y<sub>1</sub>
								</Typography>
								<DisplayFormula g={alpha} power={r} p={p} />
								<FastPowerTable stepsObj={solutionPowY1} pow={r} />{' '}
								<Box p={2}>
									y<sub>1</sub>= {y1}
								</Box>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box p={2} align='center'>
								<Typography variant='h4' gutterBottom>
									Liczenie y<sub>2</sub>
								</Typography>
								{x} * <DisplayFormula g={alpha} power={r} p={p} />
								<FastPowerTable stepsObj={solutionPowY2} pow={r} />
								<Box p={2}>
									y<sub>2</sub> = {x} * {solutionPowY2.result} mod {p} = {y2}
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box p={2}>
								<Typography variant='h4' gutterBottom align='center'>
									Wynik = (y<sub>1</sub>, y<sub>2</sub>) = ({y1}, {y2})
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	);
}

export default ElGamalSzyfrowanie;
