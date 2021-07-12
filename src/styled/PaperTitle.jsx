import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

function PaperTitle({ title, children, variant = 'h2', elevation = 2, p = 0 }) {
    return (
        <Box my={5}>
            <Typography variant={variant}>{title}</Typography>
            <Paper elevation={elevation} variant='outlined'>
                <Box p={p}>{children}</Box>
            </Paper>
        </Box>
    );
}

export default PaperTitle;
