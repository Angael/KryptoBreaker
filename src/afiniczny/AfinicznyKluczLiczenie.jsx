import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode, mod, modInverse } from 'utils/numHelpers';
import KryptoTable from 'utils/KryptoTable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { methods } from 'App';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LineForLetter from 'utils/line-for-letter/LineForLetter';

const getStepsForInverseKey = (num, n = 26) => {
	const results = [];
	for (let i = 0; i < n; i++) {
		results.push(`${num} * ${i} mod ${n} = ${mod(num * i, n)}`);
		if ((num * i) % n === 1) {
			results.push('Found inverted key = ' + i);
			return results;
		}
	}
	return results;
};

function AfinicznyKluczLiczenie({ a, n }) {
	const steps = getStepsForInverseKey(a, n);
	return steps.map((step) => (
		<Box key={step}>
			<Typography>{step}</Typography>
		</Box>
	));
}

export default AfinicznyKluczLiczenie;
