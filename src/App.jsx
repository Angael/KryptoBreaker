import React, { Suspense } from 'react';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import './App.css';
import Container from '@material-ui/core/Container';
import { Typography, Box, useMediaQuery, Breadcrumbs, Paper } from '@material-ui/core';

import useLocalStorage from 'utils/useLocalStorage';

import componentList from './componentList';

import { PersistentDrawer } from 'nav/PersistentDrawer';
import { NavigationBar } from './nav/NavigationBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		paddingTop: '5rem',
		padding: theme.spacing(0),
		marginLeft: (isPhone) => (isPhone ? 0 : -drawerWidth),
	},
	contentShift: {
		marginLeft: () => 0, // If this isnt a function, then marginLeft in content:{} wins in priority lol
	},
}));

function App() {
	// Category and component indexes in componentList.js
	const [indexes, setIndexes] = useLocalStorage('indexes', [0, 0]);
	const [drawerOpen, setDrawerOpen] = useLocalStorage('drawerOpen', true);

	const selectedCategory = componentList[indexes[0]];
	const selectedMethod = selectedCategory.methods[indexes[1]] || {};

	const openDrawer = (e) => {
		e.stopPropagation();
		setDrawerOpen(true);
	};

	const onMethodSelect = (categoryIndex, componentIndex) => {
		setIndexes([categoryIndex, componentIndex]);
	};

	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

	const classes = useStyles(isPhone);

	const methodVariant = isPhone ? 'h5' : 'h4';

	return (
		<div className={classes.root}>
			<NavigationBar drawerOpen={drawerOpen} openDrawer={openDrawer} setIndexes={setIndexes} />
			<PersistentDrawer
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				onMethodSelect={onMethodSelect}
				selectedMethod={indexes}
			/>

			<div
				className={clsx(classes.content, {
					[classes.contentShift]: drawerOpen,
				})}
			>
				<Container maxWidth='md'>
					<Box mb={4}>
						<Breadcrumbs aria-label='breadcrumb'>
							<Typography variant={methodVariant} color='textSecondary'>
								{selectedCategory.categoryName}
							</Typography>
							<Typography variant={methodVariant} color='textPrimary'>
								{selectedMethod.name}
							</Typography>
						</Breadcrumbs>
					</Box>

					<Box my={4}>
						<Suspense fallback={<Box p={4}>Loading...</Box>}>{selectedMethod.component}</Suspense>
					</Box>
				</Container>
			</div>
		</div>
	);
}

export default App;
