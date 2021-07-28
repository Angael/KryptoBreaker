import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Tooltip, Hidden } from '@material-ui/core';
import KeyExplanation from './key-explanation/KeyExplanation';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Search from './search/Search';

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
        width: 48,
        marginRight: theme.spacing(2),
        transition: theme.transitions.create(
            ['width', 'opacity', 'margin', 'padding'],
            {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }
        ),
    },
    rightButton: {
        marginRight: theme.spacing(2),
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    hide: {
        // display: 'none',
        width: 0,
        padding: 0,
        margin: 0,
        opacity: 0,
        transition: theme.transitions.create(
            ['width', 'opacity', 'margin', 'padding'],
            {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }
        ),
    },
}));

export const NavigationBar = ({ drawerOpen, openDrawer, setIndexes }) => {
    const classes = useStyles();

    const [explanationOpen, setExplanationOpen] = useState(false);

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
                    className={clsx(
                        classes.menuButton,
                        drawerOpen && classes.hide
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Hidden xsDown>
                    <Typography variant='h6' noWrap>
                        KryptoBreaker
                    </Typography>
                </Hidden>

                <Search setIndexes={setIndexes} />
                <div className={classes.rightButton}>
                    <Tooltip title='When to use which key'>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            onClick={() => setExplanationOpen(true)}
                            edge='end'
                        >
                            <VpnKeyIcon />
                        </IconButton>
                    </Tooltip>
                    <KeyExplanation
                        isOpen={explanationOpen}
                        onClose={() => setExplanationOpen(false)}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
};
