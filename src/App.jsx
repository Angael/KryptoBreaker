import React, { Suspense } from 'react';
import clsx from 'clsx';
import { Routes, Route, Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import './App.css';
import Container from '@material-ui/core/Container';
import {
    Typography,
    Box,
    useMediaQuery,
    Breadcrumbs,
    Paper,
} from '@material-ui/core';

import useLocalStorage from 'utils/useLocalStorage';

import componentList from './componentList';

import { PersistentDrawer } from 'nav/PersistentDrawer';
import { NavigationBar } from './nav/NavigationBar';
import Analytics, { useAnalytics } from './analytics/useAnalytics';
import Home from './pages/home/Home';
import Header from './Header';

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
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        marginLeft: () => 0, // If this isnt a function, then marginLeft in content:{} wins in priority lol
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

function App() {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpen, setDrawerOpen] = useLocalStorage('drawerOpen', !isPhone);

    // const selectedCategory = componentList[indexes[0]];
    // const selectedMethod = selectedCategory.methods[indexes[1]] || {};

    const openDrawer = (e) => {
        e.stopPropagation();
        setDrawerOpen(true);
    };

    const classes = useStyles(isPhone);

    const methodVariant = isPhone ? 'h5' : 'h4';

    useAnalytics();

    return (
        <div className={classes.root}>
            <NavigationBar drawerOpen={drawerOpen} openDrawer={openDrawer} />
            <PersistentDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <div
                className={clsx(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}
            >
                <Container maxWidth='md'>
                    <Header />
                    {/*<Box mb={4}>*/}
                    {/*    <Breadcrumbs aria-label='breadcrumb'>*/}
                    {/*        {selectedCategory.categoryName && (*/}
                    {/*            <Typography*/}
                    {/*                variant={methodVariant}*/}
                    {/*                color='textSecondary'*/}
                    {/*            >*/}
                    {/*                {selectedCategory.categoryName}*/}
                    {/*            </Typography>*/}
                    {/*        )}*/}
                    {/*        <Typography*/}
                    {/*            variant={methodVariant}*/}
                    {/*            color='textPrimary'*/}
                    {/*        >*/}
                    {/*            {selectedMethod.name}*/}
                    {/*        </Typography>*/}
                    {/*    </Breadcrumbs>*/}
                    {/*</Box>*/}

                    <Box my={5}>
                        <Routes>
                            <Route path='*' element={<Home />} />
                            {componentList
                                .flatMap((category) => category.methods)
                                .map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={
                                            <Suspense
                                                fallback={
                                                    <Box p={4}>Loading...</Box>
                                                }
                                            >
                                                {route.component}
                                            </Suspense>
                                        }
                                    />
                                ))}
                        </Routes>
                        {/*<Suspense fallback={<Box p={4}>Loading...</Box>}>*/}
                        {/*    {selectedMethod.component}*/}
                        {/*</Suspense>*/}
                    </Box>
                </Container>
            </div>
        </div>
    );
}

export default App;
