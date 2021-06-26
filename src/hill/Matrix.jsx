import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import { css } from '@emotion/css';

const tdCss = css`
	height: 42px;
	width: 4rem;
`;

const centeredInputCss = css`
	* {
		text-align: center; !important
	}
`;

function Matrix({ rows, changeValue, error, helperText }) {
	const handleChangeField = (row, column) => (e) => {
		if (changeValue) {
			const onlyNumbers = Number(e.target.value.replace(/\D/g, ''));
			changeValue(onlyNumbers, row, column);
		}
	};

	const useInput = !!changeValue;

	return (
		<>
			<Box
				my={2}
				flexDirection='column'
				display='flex'
				alignContent='center'
				justifyItems='center'
				justifyContent='center'
			>
				<table>
					<tbody>
						{rows?.map((row, i) => (
							<tr key={i}>
								{row.map((field, j) => (
									<td className={tdCss} key={j}>
										{useInput ? (
											<TextField
												value={field}
												variant={'outlined'}
												size='small'
												className={centeredInputCss}
												onChange={handleChangeField(i, j)}
												error={error}
											/>
										) : (
											<Typography align='center'>{field}</Typography>
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<FormHelperText error={!!helperText}>{helperText}</FormHelperText>
			</Box>
		</>
	);
}

export default Matrix;
