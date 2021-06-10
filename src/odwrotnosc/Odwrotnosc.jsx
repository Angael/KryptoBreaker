import { useState } from 'react';

import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { getLetter, getCode, modInverse, mod } from 'utils/numHelpers';
import AfinicznyKluczLiczenie from 'afiniczny/AfinicznyKluczLiczenie';
import OdwrotnoscTable from './OdwrotnoscTable';

function Odwrotnosc() {
	const [a, setA] = useState(215);
	const [n, setN] = useState(25);

	const changeA = (event) => setA(Number(event.target.value));
	const changeN = (event) => setN(Number(event.target.value));

	const odwrotnosc = modInverse(a, n);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={6}>
							<Box p={2}>
								<TextField label='Liczba' type='number' onChange={changeA} value={a} />
							</Box>
						</Grid>
					</Grid>
					<Box p={2}>
						<TextField label='modulo' placeholder={26} type='number' onChange={changeN} value={n} />
					</Box>

					<Box p={2}>
						<Typography variant='h4'>Odwrotność modularna:</Typography>
						{/* <AfinicznyKluczLiczenie a={a} n={n} /> */}

						<OdwrotnoscTable a={a} b={n} />

						
					</Box>
				</Paper>
			</Box>
		</>
	);
}

export default Odwrotnosc;
