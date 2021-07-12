import { useMemo } from 'react';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'pages/diffie-hellman/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import KluczeDisplay from './KluczeDisplay';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import { mod } from 'utils/numHelpers';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import { useTheme } from '@material-ui/core/styles';

function ElGamalDeszyfrowanie() {
	const [p, setP] = useNumberInput(1619);
	const [alpha, setAlpha] = useNumberInput(2);
	const [t, setT] = useNumberInput(937);
	const [y1, setY1] = useNumberInput(130);
	const [y2, setY2] = useNumberInput(414);

	const solutionPowA = useMemo(() => getFastPowerMod(alpha, t, p), [p, alpha, t]);

	const beta = solutionPowA.result;

	const power = p - 1 - t;
	const error = power <= 0 || power % 1 !== 0;
	const solutionPowX = useMemo(() => getFastPowerMod(y1, power, p), [p, y1, power]);

	const x = mod(y2 * solutionPowX.result, p);

	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
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
							Alicja otrzymała od Boba szyfrogram Y=({y1}, {y2})
						</Typography>
						<Typography> Obliczyć przez Alicję wartość tekstu jawnego x.</Typography>
					</Box>
				</Grid>
				<Grid item xs={6} align='right'>
					<Box p={2}>
						<TextField
							label={
								<>
									y<sub>1</sub>
								</>
							}
							onChange={setY1}
							value={y1}
							type='number'
						/>
					</Box>
				</Grid>
				<Grid item xs={6} align='left'>
					<Box p={2}>
						<TextField
							label={
								<>
									y<sub>2</sub>
								</>
							}
							onChange={setY2}
							value={y2}
							type='number'
						/>
					</Box>
				</Grid>
				<Grid item xs={12} align='center'>
					<Box m={1} pt={2} display='inline-block'>
						<Paper variant='outlined'>
							<Box m={2}>
								<Typography variant={isPhone ? 'body1' : 'h4'} align='center'>
									X = P = y<sub>2</sub>* y<sub>1</sub>
									<sup>p - 1 - t</sup> mod p
								</Typography>
							</Box>
						</Paper>
					</Box>
					<Box m={1} pb={2} display='inline-block'>
						<Paper variant='outlined'>
							<Box m={2}>
								<Typography variant={isPhone ? 'body1' : 'h4'} align='center'>
									X = P = {y2} * {y1}
									<sup>{p - 1 - t}</sup> mod {p}
								</Typography>
							</Box>
						</Paper>
					</Box>
				</Grid>
				<Grid item xs={0} sm={2} md={3}></Grid>
				<Grid item xs={12} sm={8} md={6} align='center'>
					<Box py={2} align='center'>
						<Typography variant='h4' gutterBottom>
							Liczenie x (wiadomości)
						</Typography>
						{y2} * <DisplayFormula number={y1} modulo={p} power={power} />
						<FastPowerTable stepsObj={solutionPowX} pow={power} />{' '}
						<Box p={2}>
							x = {y2} * {solutionPowX.result} mod {p}
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box p={2}>
						<Typography variant='h4' gutterBottom align='center'>
							X = {x}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

export default ElGamalDeszyfrowanie;
