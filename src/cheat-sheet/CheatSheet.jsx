import { useState } from 'react';

import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'diffie-hellman/useNumberInput';
import { getLetter, getCode, modInverse, mod } from 'utils/numHelpers';
import AfinicznyKluczLiczenie from 'afiniczny/AfinicznyKluczLiczenie';

function CheatSheet() {
	const letters = new Array(26).fill(0).map((_, i) => {
		const index = i;
		const letter = getLetter(index);
		return {
			index,
			letter,
		};
	});

	return (
		<Box my={4}>
			<Paper elevation={3}>
				<Box p={2} align='center'>
					{letters.map(({ index, letter }) => (
						<Typography variant='h5'>
							{index} = {letter}
						</Typography>
					))}
				</Box>
			</Paper>
		</Box>
	);
}

export default CheatSheet;
