import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode, mod } from 'utils/numHelpers';
import KryptoTable from '../utils/KryptoTable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { methods } from '../App';

function SolutionPerChar({ method = methods.Cezar, letter, keyValue: key, isEncryption: isEncr }) {
	const letterCode = getCode(letter);
	const letterAndCode = isEncr ? letterCode + key : letterCode - key;
	const afterMod = mod(letterAndCode, 26);
	return (
		<Box>
			<Box my={4}>
				{isEncr ? 'y' : 'x'} = {isEncr ? 'e' : 'd'}
				<sub>{key}</sub>({letterCode}) = ({letterCode} {isEncr ? '+' : '-'} {key}) mod 26 ={' '}
				{letterAndCode} mod 26 = {afterMod}
			</Box>
		</Box>
	);
}

export default SolutionPerChar;
