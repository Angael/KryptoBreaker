import { Typography, Box } from '@material-ui/core';

function DisplayFormula({ number, power, modulo, variant = 'body1' }) {
    return (
        <Box display='inline'>
            <Typography variant={variant} component='span'>
                {number} <sup>{power}</sup> mod {modulo}
            </Typography>
        </Box>
    );
}

export default DisplayFormula;
