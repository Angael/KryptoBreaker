import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Tooltip } from '@material-ui/core';
import KeyExplanation from './key-explanation/KeyExplanation';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	rightButton: {
		marginRight: theme.spacing(2),
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-end',
	},
	hide: {
		display: 'none',
	},
}));

export const NavigationBar = ({ drawerOpen, openDrawer }) => {
	const classes = useStyles();

	const [explanationOpen, setExplanationOpen] = useState(true);

	return (
		<AppBar
			position='fixed'
			className={clsx(classes.appBar, {
				[classes.appBarShift]: drawerOpen,
			})}
		>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={openDrawer}
					edge='start'
					className={clsx(classes.menuButton, drawerOpen && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' noWrap>
					KryptoBreaker
				</Typography>
				<div className={classes.rightButton}>
					<Tooltip title='Kiedy używać jaki klucz'>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={() => setExplanationOpen(true)}
							edge='end'
						>
							<VpnKeyIcon />
						</IconButton>
					</Tooltip>
					<KeyExplanation isOpen={explanationOpen} onClose={() => setExplanationOpen(false)} />
				</div>
			</Toolbar>
		</AppBar>
	);
};
