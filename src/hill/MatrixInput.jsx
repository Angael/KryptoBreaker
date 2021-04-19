import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { css } from '@emotion/css';

const tdCss = css`
	width: 4rem;
`;

function MatrixInput() {
	const [word, setWord] = useState('telewizor');
	const [matrixSize, setMatrixSize] = useState(3);
	const [isEncrypt, setIsEncrypt] = useState(true);

	let result = 'placeholder'; // useMemo || hillEncrypt();

	const changeSize = (event) => setMatrixSize(Number(event.target.value));
	const changeIsEncryption = (event) => setIsEncrypt(event.target.value);
	const changeWord = (event) => setWord(event.target.value);

	return (
		<>
			<Box my={4}>
				<TextField label='Size of matrix' type='number' value={matrixSize} onChange={changeSize} />
				<table>
					<tr>
						<td className={tdCss}>
							<TextField variant={'outlined'} size='small' />
						</td>
					</tr>
				</table>
			</Box>
		</>
	);
}

export default MatrixInput;
