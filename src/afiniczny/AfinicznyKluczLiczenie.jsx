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

const getStepsForInverseKey = (num) => {
	const results = [];
	for (let i = 0; i < 26; i++) {
		results.push(`${num} * ${i} mod 26 = ${mod(num * i, 26)}`);
		if ((num * i) % 26 === 1) {
			results.push('Found inverted key = ' + i);
			return results;
		}
	}
	return results;
};

function AfinicznyKluczLiczenie({ a }) {
	console.log({ a });
	const steps = getStepsForInverseKey(a);
	return steps.map((step) => (
		<Box>
			<Typography>{step}</Typography>
		</Box>
	));
}

export default AfinicznyKluczLiczenie;
