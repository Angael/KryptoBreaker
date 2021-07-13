import Typography from '@material-ui/core/Typography';
import PaperTitle from 'styled/PaperTitle';
import { useMediaQuery, useTheme } from '@material-ui/core';

const KluczeDisplay = ({ e, d, n, showPaper = false }) => {
    const theme = useTheme();
    const smallerText = useMediaQuery(theme.breakpoints.down('sm'));

    const variant = smallerText ? 'body1' : 'h4';

    const content = (
        <>
            <Typography variant={variant}>
                k<sub>1</sub> = (e, n) = ({e}, {n}) - Public
            </Typography>
            <Typography variant={variant}>
                k<sub>2</sub> = (d, n) = ({d}, {n}) - Private
            </Typography>
        </>
    );

    if (showPaper) {
        return (
            <PaperTitle title='Keys' p={2}>
                {content}
            </PaperTitle>
        );
    } else {
        return content;
    }
};

export default KluczeDisplay;
