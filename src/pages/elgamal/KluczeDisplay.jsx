import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery, useTheme } from '@material-ui/core';
import PaperTitle from 'styled/PaperTitle';

const KluczeDisplay = ({ p, alpha, beta, t, showPaper = false }) => {
    const theme = useTheme();
    const smallerText = useMediaQuery(theme.breakpoints.down('sm'));

    const variant = smallerText ? 'body1' : 'h4';

    const content = (
        <>
            <Typography variant={variant} style={{ fontWeight: 300 }}>
                k<sub>1</sub> = (p, α, β) = ({p}, {alpha}, {beta}) - Public
            </Typography>
            <Typography variant={variant} style={{ fontWeight: 300 }}>
                k<sub>2</sub> = (p, t) = ({p}, {t}) - Private
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
