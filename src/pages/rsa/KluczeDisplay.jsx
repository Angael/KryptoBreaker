import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const KluczeDisplay = ({ e, d, n }) => {
	return (
		<Box p={2} pb={2} textAlign='center'>
			<Typography variant='h3'>Klucze:</Typography>
			<Typography variant='body1'>
				k<sub>1</sub> = (e, n) = ({e}, {n}) - Publiczne
			</Typography>
			<Typography variant='body1'>
				k<sub>2</sub> = (d, n) = ({d}, {n}) - Prywatne
			</Typography>
		</Box>
	);
};

export default KluczeDisplay;
