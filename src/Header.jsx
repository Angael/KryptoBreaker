import React from 'react';
import { useLocation } from 'react-router';
import componentList from './componentList';
import { Breadcrumbs, useMediaQuery, Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Header = () => {
    const location = useLocation();

    const category = componentList.find((c) =>
        c.methods.some((m) => m.path === location.pathname)
    );

    // inefficient but performance isn't key here
    const method = componentList
        .flatMap((c) => c.methods)
        .find((m) => m.path === location.pathname);

    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const methodVariant = isPhone ? 'h5' : 'h4';

    return (
        <Box mb={4}>
            <Breadcrumbs aria-label='breadcrumb'>
                {category?.categoryName && (
                    <Typography variant={methodVariant} color='textSecondary'>
                        {category.categoryName}
                    </Typography>
                )}
                <Typography variant={methodVariant} color='textPrimary'>
                    {method?.name}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
};

export default Header;
