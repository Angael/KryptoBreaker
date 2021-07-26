import { useState } from 'react';
import {
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
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

const matrixContainerCss = (isPhone) => css`
	&::before {
		content: '';
		position: absolute;
		top: ${isPhone ? 0.5 : 1}rem;
		left: ${isPhone ? 0.1 : 1}rem;
		height: calc(100% - ${isPhone ? 1 : 2}rem);
		width: 0.8rem;
		border: 1px solid black;
		border-right: none;
	}
	&::after {
		content: '';
		position: absolute;
		top: ${isPhone ? 0.5 : 1}rem;
		right: ${isPhone ? 0.1 : 1}rem;
		height: calc(100% - ${isPhone ? 1 : 2}rem);
		width: 0.8rem;
		border: 1px solid black;
		border-left: none;
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

	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<Box
				mb={3}
				p={isPhone ? 0.5 : 2}
				mt={0}
				flexDirection='column'
				display='flex'
				alignContent='center'
				justifyItems='center'
				justifyContent='center'
				position='relative'
			>
				<table className={matrixContainerCss(isPhone)}>
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
