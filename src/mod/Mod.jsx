import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isPrime, mod } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';

function Mod() {
	const [num, setNum] = useNumberInput(2);
	const [modulo, setModulo] = useNumberInput(1019);

	const result = mod(num, modulo);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={6}>
							<Box p={2}>
								<TextField label='Number' onChange={setNum} value={num} type='number' />
							</Box>
						</Grid>

						<Grid item xs={6}>
							<Box p={2}>
								<TextField label='Modulo' onChange={setModulo} value={modulo} type='number' />
							</Box>
						</Grid>
					</Grid>
					<Box p={2} pb={2} textAlign='center'>
						<DisplayFormula number={num} power={''} modulo={modulo} variant={'h4'} />
						<Typography variant={'h4'} display='inline'>
							{' '}
							= {result}
						</Typography>
					</Box>
				</Paper>
			</Box>
		</>
	);
}

export default Mod;
