import { useState } from 'react';
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

export const helpers = {
	odwrotnosc: { key: 'odwrotnosc', name: 'Odwrotność multiplikatywna' },
	potegaMod: { key: 'potegaMod', name: 'Potęgowanie modularne' },
	mod: { key: 'mod', name: 'Modulo' },
};

export const methods = {
	cezar: { key: 'cezar', name: 'Cezar' },
	afiniczny: { key: 'afiniczny', name: 'Afiniczny' },
	vigener: { key: 'vigener', name: 'Vigener' },
	hill: { key: 'hill', name: 'Hill' },
	diffieHellman: { key: 'diffieHellman', name: 'Diffie Hellman', divider: true },

	rsaKlucze: { key: 'rsaKlucze', name: 'RSA | Klucze' },
	rsaSzyfrowanie: { key: 'rsaSzyfrowanie', name: 'RSA | Szyfrowanie' },
	rsaDeszyfrowanie: { key: 'rsaDeszyfrowanie', name: 'RSA | Deszyfrowanie' },
	rsaPodpis: { key: 'rsaPodpis', name: 'RSA | Podpis' },
	rsaWeryfikacjaPodpisu: {
		key: 'rsaWeryfikacjaPodpisu',
		name: 'RSA | Weryfikacja podpisu',
		divider: true,
	},
	elGamal: { key: 'elGamal', name: 'El Gamal' },
};

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
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: 'whitesmoke',
		// backgroundColor: 'oldlace',
		padding: theme.spacing(3),
	},
}));

function App() {
	const [method, setMethod] = useLocalStorage('method', methods.diffieHellman.key);
	const [title, setTitle] = useLocalStorage('title', methods.diffieHellman.name);
	const classes = useStyles();

	const handleChange = (key, name) => {
		setMethod(key);
		setTitle(name);
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
					<ListItem disabled>Helpers</ListItem>
					{Object.values(helpers).map(({ key, name, divider }) => (
						<>
							<ListItem button key={key} onClick={() => handleChange(key, name)}>
								<ListItemText primary={name} />
							</ListItem>
							{divider && <Divider />}
						</>
					))}
					<Divider />
					{Object.values(methods).map(({ key, name, divider }) => (
						<>
							<ListItem button key={key} onClick={() => handleChange(key, name)}>
								<ListItemText primary={name} />
							</ListItem>
							{divider && <Divider />}
						</>
					))}
				</List>
				<Divider />
			</Drawer>

			<Paper className={classes.content}>
				<Container maxWidth='md'>
					<Box my={4}>
						<Typography variant='h2'>{title}</Typography>
					</Box>

					<Box my={4}>{method === helpers.odwrotnosc.key && <Odwrotnosc />}</Box>
					<Box my={4}>{method === helpers.potegaMod.key && <PotegaMod />}</Box>
					<Box my={4}>{method === helpers.mod.key && <Mod />}</Box>

					<Box my={4}>{method === methods.cezar.key && <Cezar />}</Box>
					<Box my={4}>{method === methods.afiniczny.key && <Afiniczny />}</Box>
					<Box my={4}>{method === methods.vigener.key && <Vigener />}</Box>
					<Box my={4}>{method === methods.hill.key && <Hill />}</Box>
					<Box my={4}>{method === methods.diffieHellman.key && <DiffieHellman />}</Box>
					<Box my={4}>{method === methods.rsaKlucze.key && <RSAKlucze />}</Box>
					<Box my={4}>{method === methods.rsaSzyfrowanie.key && <RSASzyfrowanie />}</Box>
					<Box my={4}>{method === methods.rsaDeszyfrowanie.key && <RSADeszyfrowanie />}</Box>
					<Box my={4}>{method === methods.rsaPodpis.key && <RSAPodpis />}</Box>
					<Box my={4}>
						{method === methods.rsaWeryfikacjaPodpisu.key && <RSAPodpisWeryfikacja />}
					</Box>
					<Box my={4}>{method === methods.elGamal.key && <ElGamal />}</Box>
				</Container>
			</Paper>
		</div>
	);
}

export default App;
