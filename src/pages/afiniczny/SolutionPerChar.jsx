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

function SolutionPerChar({ letter, a, b, isEncryption: isEncr, p = 26 }) {
	const letterCode = isNaN(letter) ? getCode(letter) : letter;

	let code;
	let invertedA = NaN;
	let calculationJsx;
	if (!isEncr) {
		invertedA = modInverse(a, p);
		code = invertedA * (letterCode - b);
		calculationJsx = (
			<>
				{invertedA} * ({letterCode} - {b})
			</>
		);
	} else {
		code = letterCode * a + b;
		calculationJsx = (
			<>
				{a} * ({letterCode} + {b})
			</>
		);
	}

	const afterMod = mod(code, p);

	const resultLetter = isNaN(letter) ? getLetter(afterMod) : null;

	return (
		<LineForLetter letter={letter} resultLetter={resultLetter}>
			{isEncr ? 'y' : 'x'} = {isEncr ? 'e' : 'd'}
			<sub>
				({a},{b})
			</sub>
			({letterCode}) = ({calculationJsx}) mod {p} = {code} mod {p} = {afterMod}
		</LineForLetter>
	);
}

export default SolutionPerChar;
