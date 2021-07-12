import { dec2bin } from 'utils/numHelpers';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function BinaryExplanator({ num }) {
    const binary = dec2bin(num);
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    {num} to binary is {binary}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    Reverse it to get t = [
                    {binary.split('').reverse().join(',')}]
                </Box>
            </Grid>
        </Grid>
    );
}

export default BinaryExplanator;
