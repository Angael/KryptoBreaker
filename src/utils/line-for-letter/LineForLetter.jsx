import { Typography, Box } from '@material-ui/core';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function LineForLetter({ letter, resultLetter, children }) {
	return (
		<Box display='flex' alignItems='center'>
			<Box m={2}>{letter}</Box>
			<ArrowForwardIcon fontSize='small' />
			<Box m={2}>{children}</Box>
			<ArrowForwardIcon fontSize='small' />
			<Box m={2}>{resultLetter}</Box>
		</Box>
	);
}

export default LineForLetter;
