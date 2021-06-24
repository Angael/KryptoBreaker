import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { mod, modInverse } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'diffie-hellman/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'diffie-hellman/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';
import OdwrotnoscTable from 'odwrotnosc/OdwrotnoscTable';

function ElGamalPodpis() {
	const [p, setP] = useNumberInput(1619);
	const [alpha, setAlpha] = useNumberInput(2);
	const [t, setT] = useNumberInput(937);
	const [h, setH] = useNumberInput(357);
	const [r, setR] = useNumberInput(515);

	const solutionPowBeta = useMemo(() => getFastPowerMod(p, alpha, t), [p, alpha, t]);
	const beta = solutionPowBeta.result;

	const inverted = modInverse(r, p - 1);
	const solutionPowA = useMemo(() => getFastPowerMod(p, alpha, r), [p, alpha, r]);

	const u = solutionPowA.result;
	const s = mod(inverted * (h - t * u), p - 1);

	return (
		<>
			<Box>
				<Paper elevation={3}>
					<Grid container>
						<Box>
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
											value={beta}
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
								<Grid item xs={12}>
									<Box p={2}>
										Alicja chce wysłać do Boba wiadomość, której skrót wynosi h={h}. Wygenerować
										przez Alicję podpis cyfrowy ElGamala dla tej wiadomości, wiedząc, że Alicja
										użyła randomizera r={r}.
									</Box>
								</Grid>
								<Grid item xs={3}>
									<Box p={2}>
										<TextField
											label='h'
											onChange={setH}
											value={h}
											type='number'
											helperText='skrót wiadomości'
										/>
									</Box>
								</Grid>
								<Grid item xs={3}>
									<Box p={2}>
										<TextField
											label='r'
											onChange={setR}
											value={r}
											type='number'
											helperText='randomizer'
										/>
									</Box>
								</Grid>
							</Grid>
							<Box p={2} pb={2} textAlign='center'>
								<DisplayFormula p={p} g={alpha} power={r} variant={'h4'} />
							</Box>
							<Grid container justify='center'>
								<Grid item xs={6}>
									<FastPowerTable stepsObj={solutionPowA} pow={p} />
								</Grid>
							</Grid>

							<Grid item xs={12} justify='center'>
								<Box p={2}>
									<Box p={2}>
										<Typography variant='h3' align='center' m={2}>
											Generowanie podpisu:
										</Typography>
									</Box>
									<Box p={2} align='center'>
										<OdwrotnoscTable a={r} b={p - 1} />
									</Box>
									<Typography component='p'>
										<b>u</b> = 
										<DisplayFormula g={'α'} power={'r'} p={'p'} variant={'body1'} /> = 
										<DisplayFormula g={alpha} power={r} p={p} variant={'body1'} /> = {u}
									</Typography>
									<Typography component='p'>
										<b>s</b> = α<sup>-1</sup> * (h - t * u) mod (p -1) = ({inverted} * ({h} - {t} *{' '}
										{solutionPowA.result})) mod {p - 1} = {s}
									</Typography>
								</Box>

								<Box p={2} align='center'>
									<Typography variant='body1' component='p'>
										Podpis: <b>(u, s)</b> ={' '}
										<b>
											({u}, {s})
										</b>
									</Typography>
								</Box>
							</Grid>
						</Box>
					</Grid>
				</Paper>
			</Box>
		</>
	);
}
export default ElGamalPodpis;
