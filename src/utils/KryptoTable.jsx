import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function KryptoTable({ startStr = '', endStr = '', isEncryption = true }) {
	const startRow = (
		<TableRow>
			<TableCell component='th' scope='row'>
				{isEncryption ? 'PT' : 'CT'}
			</TableCell>
			{startStr.split('').map((v, i) => (
				<TableCell key={v + i} align='center'>
					{v}
				</TableCell>
			))}
		</TableRow>
	);

	const startNumbers = (
		<TableRow>
			<TableCell component='th' scope='row'>
				{isEncryption ? 'x' : 'y'}
			</TableCell>
			{startStr.split('').map((v, i) => (
				<TableCell key={v + i} align='center'>
					{getCode(v)}
				</TableCell>
			))}
		</TableRow>
	);

	const endNumbers = (
		<TableRow>
			<TableCell component='th' scope='row'>
				{isEncryption ? 'y' : 'x'}
			</TableCell>
			{endStr.split('').map((v, i) => (
				<TableCell key={v + i} align='center'>
					{getCode(v)}
				</TableCell>
			))}
		</TableRow>
	);

	const endRow = (
		<TableRow>
			<TableCell component='th' scope='row'>
				{isEncryption ? 'CT' : 'PT'}
			</TableCell>
			{endStr.split('').map((v, i) => (
				<TableCell key={v + i} align='center'>
					{v}
				</TableCell>
			))}
		</TableRow>
	);

	return (
		<>
			<TableContainer component={(props) => <Paper variant='outlined' {...props} />}>
				<Table>
					<TableBody>
						{startRow}
						{startNumbers}
						{endNumbers}
						{endRow}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default KryptoTable;
