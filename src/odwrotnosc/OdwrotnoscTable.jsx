import { useState, useMemo } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
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


const cellCss = css`
	background: #f0e98b;
`;

const noSelect = css`
	user-select: none;
`;


function OdwrotnoscTable({ a, b }) {
	const getValues = (given_a, given_b) => {
		const rows = [];

		let i = 0;
		let r, b, u, v;
		while (r != 0) {
			const prevRow = i === 0 ? null : rows[i - 1];
			const a = prevRow ? prevRow['b'] : given_a;
			b = prevRow ? prevRow['r'] : given_b;
			u = prevRow
				? prevRow['uprim'] - (prevRow['q'] * prevRow['u'])
				: 0;
			const uprim = prevRow ? prevRow['u'] : 1;
			v = prevRow
				? prevRow['vprim'] - (prevRow['q'] * prevRow['v'])
				: 1;
			const vprim = prevRow ? prevRow['v'] : 0;
			const q = Math.floor(a / b);
			r = mod(a, b)

			rows.push({ u, uprim, v, vprim, a, b, q, r });

			i++;
		}

		return [rows, u];
	}

	const [ values, inverted ] = getValues(a, b);
	values.shift() // dont ask

	return b != 0 && (
		<>
			<TableContainer component={(props) => <Paper variant='outlined' {...props} />}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align='center'>
								i
							</TableCell>
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
						</TableRow>
					</TableHead>
					<TableBody>
						{values.map((el, index) => {
							const { u, uprim, v, vprim, a, b, q, r } = el;
							const isLast = values.length - 1 === index;

							return (
								<TableRow>
									<TableCell align='center'>{index}</TableCell>
									<TableCell align='center'>{v}</TableCell>
									<TableCell align='center'>{vprim}</TableCell>
									<TableCell align='center' className={isLast && cellCss}>{u}</TableCell>
									<TableCell align='center'>{uprim}</TableCell>
									<TableCell align='center'>{a}</TableCell>
									<TableCell align='center'>{b}</TableCell>
									<TableCell align='center'>{q}</TableCell>
									<TableCell align='center'>{r}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Box py={1}>
				<Typography variant='body1'>
					a<sup>-1</sup> = {inverted} mod {b} = {mod(inverted, b)}
				</Typography>
			</Box>
			<Box>
				<Typography variant='body1'>
					<span className={noSelect}>Sprawdzenie: </span>{a} * {mod(inverted, b)} mod {b} = {mod(a * mod(inverted, b), b)}
				</Typography>
			</Box>
		</>
	);
}

export default OdwrotnoscTable;
