import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const KluczeDisplay = ({ p, g, beta, t }) => {
	return (
		<Box p={2} pb={2} textAlign='center'>
			<Typography variant='h4'>Klucze:</Typography>
			<Typography variant='caption'>zmiana oznaczeń: α ≡ g</Typography>
			<Typography variant='body1'>
				k<sub>1</sub> = (p, α, β) = ({p}, {g}, {beta}) - publiczny
			</Typography>
			<Typography variant='body1'>
				k<sub>2</sub> = (p, t) = ({p}, {t}) - prywatny
			</Typography>
		</Box>
	);
};

export default KluczeDisplay;
