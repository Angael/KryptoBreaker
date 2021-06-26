import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import componentList from 'componentList';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import GitHubIcon from '@material-ui/icons/GitHub';
import { useMediaQuery, ClickAwayListener } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		position: (isPhone) => (isPhone ? 'fixed' : 'initial'),
		width: drawerWidth,
		flexShrink: 0,
		zIndex: 1,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
}));

export const PersistentDrawer = ({ isOpen, onClose, onMethodSelect, selectedMethod }) => {
	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

	const classes = useStyles(isPhone);

	const onMethodClick = (...params) => {
		if (isPhone) {
			onClose();
		}
		onMethodSelect(...params);
	};

	const handleClickAway = (params) => {
		if (isPhone) {
			onClose();
		}
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={isOpen}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={onClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem>
						<Typography variant='h5'>KryptoBreaker</Typography>
					</ListItem>
					<Divider />
				</List>
				{componentList.map((category, i) => (
					<React.Fragment key={i}>
						<List>
							<ListItem disabled>
								<Box
									display='flex'
									align='center'
									alignItems='center'
									justifyContent='center'
									width={'100%'}
								>
									<Typography variant='button'>{category.categoryName}</Typography>
								</Box>
							</ListItem>

							{category.methods.map((c, j) => (
								<ListItem
									button
									key={j}
									onClick={() => onMethodClick(i, j)}
									selected={i == selectedMethod[0] && j == selectedMethod[1]}
								>
									<ListItemText primary={c.name} />
								</ListItem>
							))}
						</List>
						<Divider />
					</React.Fragment>
				))}
				<List>
					<ListItem component='a' href='https://github.com/Angael/KryptoBreaker' target='_blank'>
						<ListItemIcon>
							<GitHubIcon />
						</ListItemIcon>
						<ListItemText primary='Github repository' secondary='source code' />
					</ListItem>
				</List>
			</Drawer>
		</ClickAwayListener>
	);
};
