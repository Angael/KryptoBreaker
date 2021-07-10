import { useState, useMemo } from 'react';
import { Paper, Box, Typography, useMediaQuery } from '@material-ui/core';
import { css } from '@emotion/css';
import {
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	Tooltip,
} from '@material-ui/core';

import { mod } from '../utils/numHelpers';
import { useTheme, makeStyles, withStyles } from '@material-ui/core/styles';

const cellCss = css`
	background: #f0e98b;
`;

const noSelect = css`
	user-select: none;
`;

const TableRowHeader = withStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		'& th': {
			color: theme.palette.primary.contrastText,
		},
	},
}))(TableRow);

const TableRowColored = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 'calc(100vw - 66px)',
	},
}));

function OdwrotnoscTable({ a, b }) {
	const getValues = (given_a, given_b) => {
		const rows = [];

		let i = 0;
		let r, b, u, v;
		while (r != 0) {
			const prevRow = i === 0 ? null : rows[i - 1];
			const a = prevRow ? prevRow['b'] : given_a;
			b = prevRow ? prevRow['r'] : given_b;
			u = prevRow ? prevRow['uprim'] - prevRow['q'] * prevRow['u'] : 0;
			const uprim = prevRow ? prevRow['u'] : 1;
			v = prevRow ? prevRow['vprim'] - prevRow['q'] * prevRow['v'] : 1;
			const vprim = prevRow ? prevRow['v'] : 0;
			const q = Math.floor(a / b);
			r = mod(a, b);

			rows.push({ u, uprim, v, vprim, a, b, q, r });

			i++;
			if (isNaN(r)) {
				break;
			}
		}

		return [rows, u];
	};

	const [values, inverted] = getValues(a, b);
	values.shift(); // dont ask

	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

	const classes = useStyles(isPhone);

	return (
		b != 0 && (
			<>
				<Box my={2}>
					<Typography variant='h5'>
						{a}
						<sup>-1</sup> mod {b}
					</Typography>
				</Box>

				<TableContainer
					classes={classes}
					component={(props) => <Paper variant='outlined' {...props} />}
				>
					<Table>
						<TableHead>
							<TableRowHeader>
								<TableCell align='center'>i</TableCell>
								<TableCell align='center'>
									u<sub>i</sub>
								</TableCell>
								<TableCell align='center'>
									u<sub>i</sub>'
								</TableCell>
								<TableCell align='center'>
									v<sub>i</sub>
								</TableCell>
								<TableCell align='center'>
									v<sub>i</sub>'
								</TableCell>
								<TableCell align='center'>
									n<sub>i</sub>
								</TableCell>
								<TableCell align='center'>
									a<sub>i</sub>
								</TableCell>
								<TableCell align='center'>
									q<sub>i</sub>
								</TableCell>
								<TableCell align='center'>
									r<sub>i</sub>
								</TableCell>
							</TableRowHeader>
						</TableHead>
						<TableBody>
							{values.map((el, index) => {
								const { u, uprim, v, vprim, a, b, q, r } = el;
								const isLast = values.length - 1 === index;

								return (
									<TableRowColored>
										<TableCell align='center'>{index}</TableCell>
										<TableCell align='center'>{v}</TableCell>
										<TableCell align='center'>{vprim}</TableCell>
										<TableCell align='center' className={isLast && cellCss}>
											{u}
										</TableCell>
										<TableCell align='center'>{uprim}</TableCell>
										<TableCell align='center'>{a}</TableCell>
										<TableCell align='center'>{b}</TableCell>
										<TableCell align='center'>{q}</TableCell>
										<TableCell align='center'>{r}</TableCell>
									</TableRowColored>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<Box py={1}>
					<Typography variant='h4'>
						{inverted} mod {b} = <u>{mod(inverted, b)}</u>
					</Typography>
				</Box>
				<Box>
					<Typography variant='caption'>
						<span className={noSelect}>Sprawdzenie: </span>
						{a} * {mod(inverted, b)} mod {b} = {mod(a * mod(inverted, b), b)}
					</Typography>
				</Box>
			</>
		)
	);
}

export default OdwrotnoscTable;
