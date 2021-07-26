import React from 'react';
import {
    Box,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';

function PaperTitle({ title, children, elevation = 2, p = 0 }) {
    const theme = useTheme();
    const smallerText = useMediaQuery(theme.breakpoints.down('sm'));

    const variant = smallerText ? 'h4' : 'h2';

    return (
        <Box my={5} component='section'>
            <header>
                <Typography variant={variant}>{title}</Typography>
            </header>
            <Paper elevation={elevation} variant='outlined'>
                <Box p={p}>{children}</Box>
            </Paper>
        </Box>
    );
}

export default PaperTitle;
