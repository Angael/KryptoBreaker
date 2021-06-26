import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isPrime } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';

function ElGamal() {
	const [g, setG] = useNumberInput(2);
	const [p, setP] = useNumberInput(1619);
	const [t, setT] = useNumberInput(937);

	const solutionPowA = useMemo(() => getFastPowerMod(g, t, p), [p, g, t]);

	return (
		<>
			<Box>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={12}>
							<Box p={2}>
								Alicja chce wygenerować klucze asymetryczne ElGamala. W tym celu przyjęła wartość{' '}
								<b>p={p}</b> oraz generator <b>g={g}</b>.<br />
								Wyznacz klucze asymetryczne Alicji dla jej wartości prywatnej <b>t={t}</b>.
							</Box>
						</Grid>
						<Grid item xs={4}>
							<Box p={2}>
								<TextField
									label='g albo α'
									onChange={setG}
									value={g}
									type='number'
									helperText='Generator'
								/>
							</Box>
						</Grid>

						<Grid item xs={4}>
							<Box p={2}>
								<TextField label='p' onChange={setP} value={p} type='number' helperText='p?' />
							</Box>
						</Grid>

						<Grid item xs={4}>
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
					</Grid>
					<Box p={2} pb={2} textAlign='center'>
						<DisplayFormula number={g} modulo={p} power={t} variant={'h4'} />
					</Box>
					<Grid container justify='center'>
						<Grid item xs={12} sm={8} md={6}>
							<FastPowerTable stepsObj={solutionPowA} pow={p} />
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<KluczeDisplay p={p} g={g} beta={solutionPowA.result} t={t} />
					</Grid>
				</Paper>
			</Box>
		</>
	);
}

export default ElGamal;
