import { useState } from 'react';
import {
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Card,
	useMediaQuery,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexDirection: (isPhone) => (isPhone ? 'column' : 'row'),
	},
	arrow: {
		transform: (isPhone) => (isPhone ? 'rotate(90deg)' : 'inherit'),
	},
}));

function WordAndSolution({ startStr = '', endStr = '' }) {
	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

	const classes = useStyles(isPhone);

	const boxCenterProps = { display: 'flex', justifyContent: 'space-around', alignItems: 'center' };
	return (
		<Card variant='outlined'>
			<Box p={2} {...boxCenterProps} className={classes.root}>
				<Box flex={9} {...boxCenterProps}>
					<Typography variant='h5'>{startStr}</Typography>
				</Box>
				<Box flex={1} {...boxCenterProps} className={classes.arrow}>
					<ArrowForwardIcon />
				</Box>
				<Box flex={9} {...boxCenterProps}>
					<Typography variant='h5'>{endStr}</Typography>
				</Box>
			</Box>
		</Card>
	);
}

export default WordAndSolution;
