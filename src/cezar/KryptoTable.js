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

function KryptoTable({ publicStr = '', encryptedStr = '' }) {
	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell component='th' scope='row'>
								PT
							</TableCell>
							{publicStr.split('').map((v) => (
								<TableCell align='center'>{v}</TableCell>
							))}
						</TableRow>
						<TableRow>
							<TableCell component='th' scope='row'>
								x
							</TableCell>
							{publicStr.split('').map((v) => (
								<TableCell align='center'>{getCode(v)}</TableCell>
							))}
						</TableRow>
						<TableRow>
							<TableCell component='th' scope='row'>
								y
							</TableCell>
							{encryptedStr.split('').map((v) => (
								<TableCell align='center'>{getCode(v)}</TableCell>
							))}
						</TableRow>
						<TableRow>
							<TableCell component='th' scope='row'>
								CT
							</TableCell>
							{encryptedStr.split('').map((v) => (
								<TableCell align='center'>{v}</TableCell>
							))}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default KryptoTable;
