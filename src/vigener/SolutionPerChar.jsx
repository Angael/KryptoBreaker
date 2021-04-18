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

function SolutionPerChar({ letter, keyValue, isEncryption: isEncr }) {
	const letterCode = getCode(letter);
	const keyCode = getCode(keyValue);

	const letterAndKey = isEncr ? letterCode + keyCode : letterCode - keyCode;

	const afterMod = mod(letterAndKey, 26);

	// let code;
	// let invertedA = NaN;
	// let calculationJsx;
	// if (!isEncr) {
	// 	invertedA = modInverse(a, 26);
	// 	code = invertedA * (letterCode - b);
	// 	calculationJsx = (
	// 		<>
	// 			{invertedA} * ({letterCode} - {b})
	// 		</>
	// 	);
	// } else {
	// 	code = letterCode * a + b;
	// 	calculationJsx = (
	// 		<>
	// 			{a} * ({letterCode} + {b})
	// 		</>
	// 	);
	// }

	return (
		<LineForLetter letter={letter} resultLetter={getLetter(afterMod)}>
			{isEncr ? 'y' : 'x'} = {isEncr ? 'e' : 'd'}
			<sub>({keyValue})</sub>({letterCode}) = ({letterCode} {isEncr ? '+' : '-'} {keyCode}) mod 26 ={' '}
			{letterAndKey} mod 26 = {afterMod}
		</LineForLetter>
	);
}

export default SolutionPerChar;
