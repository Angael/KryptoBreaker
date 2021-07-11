import React, { useState, useRef } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { componentListFuzzySearchHayStack } from 'componentList';
import FuzzySearch from 'fuzzy-search';
import { cx } from '@emotion/css';
import { Box, ClickAwayListener, Typography } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	hide: {
		display: 'none',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.3),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		overflow: 'visible',
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	resultsContainer: {
		display: 'block',
		position: 'absolute',
		top: '100%',
		left: 0,
		minWidth: '100%',
		width: '400px',
		maxHeight: '50vh',
		background: alpha('#000', 0.5),
		backdropFilter: 'blur(8px)',
		borderRadius: 4,
		[theme.breakpoints.down('xs')]: {
			position: 'fixed',
			top: 56,
			left: 0,
			width: '95vh',
		},
		opacity: 1,
		height: '222px',
		transition: '0.2s',
		overflowX: 'hidden',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			width: '7px',
		},

		/* Track */
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
		},

		/* Handle */
		'&::-webkit-scrollbar-thumb': {
			background: alpha('#fff', 0.4),
		},

		/* Handle on hover */
		'&::-webkit-scrollbar-thumb:hover': {
			background: alpha('#fff', 0.7),
		},
	},
	hide: {
		opacity: '0 !important',
		height: '1px !important',
		transition: '0.2s',
		width: '100% !important',
		// display: 'none !important',
	},
	btn: {
		width: '100%',
		justifyContent: 'flex-start',
		textAlign: 'left',
		background: 'transparent',
		transition: '0.2s',
		'&:focus': { background: alpha('#fff', 0.15), outline: '1px white solid' },
		'&:hover': {
			background: alpha('#fff', 0.3),
		},
	},
}));

const searcher = new FuzzySearch(componentListFuzzySearchHayStack, ['name', 'inputs', 'category'], {
	caseSensitive: false,
});

const Search = ({ searchOpen, setSearchOpen }) => {
	const classes = useStyles();
	const [value, setValue] = useState('rsa');
	const resultsRef = useRef();

	const onChangeVal = (e) => {
		setValue(e.target.value);
		setSearchOpen(true);
	};

	const results = value.trim() ? searcher.search(value) : [];

	const onInputFocus = (params) => {};
	// console.log(results);

	let height = 200;
	if (resultsRef.current) {
		console.group('ref');
		const children = Array.from(resultsRef.current.children);
		height = 0;
		children.forEach((child) => {
			height += child.clientHeight;
			console.log('child.clientHeight', child.clientHeight);
		});

		// console.log(resultsRef.current);
		console.log('height', height);
		console.groupEnd('ref');
	}

	return (
		<ClickAwayListener onClickAway={() => setSearchOpen(false)}>
			<div className={classes.search} onFocus={() => setSearchOpen(true)}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder='Search…'
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
					value={value}
					onChange={onChangeVal}
					onFocus={onInputFocus}
				/>
				<div
					className={clsx(classes.resultsContainer, { [classes.hide]: !searchOpen })}
					style={{ height }}
				>
					<Box ref={resultsRef}>
						{results.length === 0 && (
							<ButtonBase className={classes.btn}>
								<Box px={2} py={1}>
									<Typography variant='body1'>Wpisz nazwę lub zmienne</Typography>
									<Typography variant='body2'></Typography>
								</Box>
							</ButtonBase>
						)}
						{results.map((result) => {
							return (
								<ButtonBase className={classes.btn}>
									<Box px={2} py={1}>
										<Typography variant='body1'>{result.name}</Typography>
										<Typography variant='body2'>{result.category}</Typography>
									</Box>
								</ButtonBase>
							);
						})}
					</Box>
				</div>
			</div>
		</ClickAwayListener>
	);
};
export default Search;
