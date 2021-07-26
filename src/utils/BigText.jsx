import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';

function BigText({
    children,
    smallVariant = 'h5',
    bigVariant = 'h4',
    ...boxProps
}) {
    const theme = useTheme();
    const smallerText = useMediaQuery(theme.breakpoints.down('sm'));

    const variant = smallerText ? 'h5' : bigVariant;

    return (
        <Box {...boxProps}>
            <Typography variant={variant}>{children}</Typography>
        </Box>
    );
}

export default React.memo(BigText);
