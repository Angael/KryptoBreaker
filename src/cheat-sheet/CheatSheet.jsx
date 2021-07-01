import { Typography, Box } from '@material-ui/core';
import { getLetter } from 'utils/numHelpers';

function CheatSheet() {
	const letters = new Array(26).fill(0).map((_, i) => {
		const index = i;
		const letter = getLetter(index);
		return {
			index,
			letter,
		};
	});

	return (
		<Box p={2} align='center'>
			{letters.map(({ index, letter }) => (
				<Typography variant='h5'>
					{index} = {letter}
				</Typography>
			))}
		</Box>
	);
}

export default CheatSheet;
