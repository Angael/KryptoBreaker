import { Typography, Box } from '@material-ui/core';

function DisplayFormula({ p, g, power }) {
	return (
		<Box textAlign='center'>
			<Typography>
				({g}^{power}) mod {p}
			</Typography>
		</Box>
	);
}

export default DisplayFormula;
