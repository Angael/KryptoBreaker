import { Typography, Box } from '@material-ui/core';

function DisplayFormula({ p, g, power, variant = 'body1' }) {
	return (
		<Box textAlign='center'>
			<Typography variant={variant}>
				{g} <sup>{power}</sup> mod {p}
			</Typography>
		</Box>
	);
}

export default DisplayFormula;
