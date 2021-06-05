import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isPrime } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'diffie-hellman/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'diffie-hellman/FastPowerTable';

function PotegaMod() {
	const [g, setG] = useNumberInput(2);
	const [pow, setPow] = useNumberInput(638);
	const [modulo, setModulo] = useNumberInput(1019);

	const solutionPowA = useMemo(() => getFastPowerMod(modulo, g, pow), [modulo, g, pow]);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={4}>
							<Box p={2}>
								<TextField label='g' onChange={setG} value={g} type='number' />
							</Box>
						</Grid>

						<Grid item xs={4}>
							<Box p={2}>
								<TextField label='Potęga' onChange={setPow} value={pow} type='number' />
							</Box>
						</Grid>

						<Grid item xs={4}>
							<Box p={2}>
								<TextField label='Modulo' onChange={setModulo} value={modulo} type='number' />
							</Box>
						</Grid>
					</Grid>
					<Box p={2} pb={2} textAlign='center'>
						<DisplayFormula p={modulo} g={g} power={pow} variant={'h4'} />
					</Box>
					<Grid container justify='center'>
						<Grid item xs={6}>
							<FastPowerTable stepsObj={solutionPowA} />
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	);
}

export default PotegaMod;
