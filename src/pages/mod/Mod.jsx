import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { mod } from 'utils/numHelpers';

import useNumberInput from 'pages/diffie-hellman/useNumberInput';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';

function Mod() {
	const [num, setNum] = useNumberInput(2);
	const [modulo, setModulo] = useNumberInput(1019);

	const result = mod(num, modulo);

	return (
		<>
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
		</>
	);
}

export default Mod;
