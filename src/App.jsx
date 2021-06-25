import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Container from '@material-ui/core/Container';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Cezar from './cezar/Cezar';
import Vigener from './vigener/Vigener';
import Afiniczny from './afiniczny/Afiniczny';
import Hill from './hill/Hill';
import DiffieHellman from './diffie-hellman/DiffieHellman';
import Odwrotnosc from './odwrotnosc/Odwrotnosc';
import PotegaMod from './potega-mod/PotegaMod';
import RSAKlucze from './rsa/RSAKlucze';
import RSASzyfrowanie from 'rsa/RSASzyfrowanie';
import RSADeszyfrowanie from 'rsa/RSADeszyfrowanie';
import RSAPodpis from './rsa/RSAPodpis';
import RSAPodpisWeryfikacja from './rsa/RSAPodpisWeryfikacja';
import ElGamal from './elgamal/ElGamal';
import Mod from './mod/Mod';

import useLocalStorage from 'utils/useLocalStorage';
import ElGamalSzyfrowanie from './elgamal/ElGamalSzyfrowanie';
import ElGamalDeszyfrowanie from './elgamal/ElGamalDeszyfrowanie';
import ElGamalPodpis from './elgamal/ElGamalPodpis';
import ElGamalPodpisWeryfikacja from './elgamal/ElGamalPodpisWeryfikacja';

import GitHubIcon from '@material-ui/icons/GitHub';
import componentList from './componentList';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: 'whitesmoke',
		padding: theme.spacing(3),
	},
}));

function App() {
	// Category and component indexes in componentList.js
	const [indexes, setIndexes] = useLocalStorage('method', [0, 0]);

	const selectedCategory = componentList[indexes[0]];
	const selectedMethod = selectedCategory.methods[indexes[1]] || {};

	const classes = useStyles();

	const handleChange = (categoryIndex, componentIndex) => {
		setIndexes([categoryIndex, componentIndex]);
	};

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				PaperProps={{
					elevation: 3,
				}}
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='left'
			>
				<List>
					<ListItem>
						<Typography variant='h5'>KryptoBreaker</Typography>
					</ListItem>
					<Divider />

					{componentList.map((category, i) => (
						<Box py={0} key={i}>
							<ListItem disabled>
								<Box display='flex' align='center'>
									<ArrowForwardIosIcon />
									<Typography variant='button'>{category.categoryName}</Typography>
								</Box>
							</ListItem>

							{category.methods.map((c, j) => (
								<ListItem
									button
									key={j}
									onClick={() => handleChange(i, j)}
									selected={i == indexes[0] && j == indexes[1]}
								>
									<ListItemText primary={c.name} />
								</ListItem>
							))}

							<Divider />
						</Box>
					))}
					<ListItem component='a' href='https://github.com/Angael/KryptoBreaker' target='_blank'>
						<ListItemIcon>
							<GitHubIcon />
						</ListItemIcon>
						<ListItemText primary='Github repository' secondary='source code' />
					</ListItem>
				</List>
			</Drawer>

			<Paper className={classes.content} elevation={0}>
				<Container maxWidth='md'>
					<Box mb={4}>
						<Typography variant='h5'>{selectedCategory.categoryName}</Typography>
						<hr />
						<Typography variant='h2'>{selectedMethod.name}</Typography>
					</Box>

					<Box my={4}>{selectedMethod.component}</Box>
				</Container>
			</Paper>
		</div>
	);
}

export default App;
