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
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useMediaQuery, ClickAwayListener } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        position: (isPhone) => (isPhone ? 'fixed' : 'initial'),
        width: drawerWidth,
        flexShrink: 0,
        zIndex: (isPhone) => (isPhone ? 1200 : 0),
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

export const PersistentDrawer = ({ isOpen, onClose }) => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const nagivate = useNavigate();
    const location = useLocation();

    const classes = useStyles(isPhone);

    const onMethodClick = (route) => {
        if (isPhone) {
            onClose();
        }
        nagivate(route.path);
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
                style={{ pointerEvents: isOpen ? 'all' : 'none' }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={onClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                {componentList.map((category, i) => (
                    <React.Fragment key={i}>
                        <List>
                            {category.categoryName && (
                                <ListItem disabled>
                                    <Box
                                        display='flex'
                                        align='center'
                                        alignItems='center'
                                        justifyContent='center'
                                        width={'100%'}
                                    >
                                        <Typography variant='button'>
                                            {category.categoryName}
                                        </Typography>
                                    </Box>
                                </ListItem>
                            )}

                            {category.methods.map((route, j) => (
                                <ListItem
                                    button
                                    key={j}
                                    onClick={() => onMethodClick(route)}
                                    selected={route.path === location.pathname}
                                >
                                    <ListItemText primary={route.name} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </React.Fragment>
                ))}
                <List>
                    <ListItem
                        component='a'
                        href='https://www.paypal.me/krzysztofwidacki'
                        target='_blank'
                    >
                        <ListItemIcon>
                            <LocalCafeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary='Buy me a coffee?'
                            secondary='I probably made your exams easier!'
                        />
                    </ListItem>

                    <ListItem
                        component='a'
                        href='https://github.com/Angael/KryptoBreaker'
                        target='_blank'
                    >
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary='Source code'
                            secondary='Github'
                        />
                    </ListItem>
                </List>
            </Drawer>
        </ClickAwayListener>
    );
};
