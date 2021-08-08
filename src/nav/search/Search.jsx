import React, { useState, useRef, useLayoutEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { componentListFuzzySearchHayStack } from 'componentList';
import Fuse from 'fuse.js';

import { cx } from '@emotion/css';
import {
    Box,
    ClickAwayListener,
    TextField,
    Typography,
} from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
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
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '10ch',
            '&:focus': {
                width: '40ch',
            },
        },
        '&::selection': {
            color: alpha('#fff', 1),
            background: alpha('#fff', 0.25),
        },
    },
    resultsContainer: {
        display: 'block',
        position: 'absolute',
        top: 'calc(100% + 2px)',
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
        height: '0px !important',
        transition: '0.2s',
        width: '100% !important',
        background: 'transparent',
        // display: 'none !important',
    },
    btn: {
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left',
        background: 'transparent',
        transition: '0.2s',
        '&:focus': {
            background: alpha('#fff', 0.15),
            outline: '1px white solid',
        },
        '&:hover': {
            background: alpha('#fff', 0.3),
        },
    },
}));

const useAutoCompleteStyles = makeStyles((theme) => ({
    popper: {
        backdropFilter: 'blur(12px)',
    },
    paper: {
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    listbox: {
        maxHeight: '70vh',
    },
}));

const options = {
    includeScore: true,
    keys: ['fullName', 'keywords'],
};
const fuse = new Fuse(componentListFuzzySearchHayStack, options);

const Search = ({ setIndexes }) => {
    const classes = useStyles();
    const acClasses = useAutoCompleteStyles();

    const [value, setValue] = useState('');
    const onChangeVal = (e, v) => {
        setValue(v);
    };

    const results = value.trim()
        ? fuse
              .search(value.trim())
              .filter((result) => {
                  return result.score < 0.3;
              })
              .slice(0, 5)
        : [];

    const onInputFocus = (e) => {
        e.target.setSelectionRange(0, value.length);
    };

    const onSearchOptionClick = (e, v) => {
        if (v) {
            setIndexes(v.item.indexes);
            setValue('');
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            setValue('');
        }
    };

    console.log(results);

    return (
        <Autocomplete
            // debug
            classes={acClasses}
            freeSolo
            filterOptions={(x) => x}
            options={results}
            getOptionLabel={(x) => ''}
            renderOption={(x) => (
                <div className={'opcja'}>
                    <Typography variant={'caption'}>
                        {x.item.category}
                    </Typography>
                    <Typography variant={'h5'}>{x.item.name}</Typography>
                    <Typography variant={'body1'}>
                        {x.item.description}
                    </Typography>
                </div>
            )}
            onInputChange={onChangeVal}
            onChange={onSearchOptionClick}
            renderInput={(params) => (
                <div className={classes.search} ref={params.InputProps.ref}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        {...params}
                        placeholder='Search…'
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{
                            ...params.inputProps,
                            onFocus: onInputFocus,
                        }}
                    />
                </div>
            )}
        />
    );
};
export default Search;
