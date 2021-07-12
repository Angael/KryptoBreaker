import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'pages/diffie-hellman/useNumberInput';
import OdwrotnoscTable from './OdwrotnoscTable';

function Odwrotnosc() {
	const [a, setA] = useNumberInput(215);
	const [n, setN] = useNumberInput(25);

	return (
		<>
			<Grid container>
				<Grid item xs={6}>
					<Box p={2}>
						<TextField label='Liczba' type='number' onChange={setA} value={a} />
					</Box>
				</Grid>
			</Grid>
			<Box p={2}>
				<TextField label='modulo' placeholder={26} type='number' onChange={setN} value={n} />
			</Box>

			<Box p={2}>
				<Typography variant='h4'>Odwrotność modularna:</Typography>

				<OdwrotnoscTable a={a} b={n} />
			</Box>
		</>
	);
}

export default Odwrotnosc;
