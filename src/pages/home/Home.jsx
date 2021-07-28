import { Box, Link, Typography } from '@material-ui/core';
import PaperTitle from 'styled/PaperTitle';

import Logo from './logo.png';

function Home() {
    return (
        <>
            <Box textAlign={'center'}>
                <img
                    src={Logo}
                    loading='lazy'
                    style={{ height: 128, width: 128 }}
                />
            </Box>
            <PaperTitle title={'What is this?'} p={2}>
                <Typography gutterBottom>This is KryptoBreaker</Typography>
                <Typography gutterBottom>
                    This website was created to help people learn cryptographic
                    algorithms for free and because I was lazy and wanted to
                    cheat on my collage exams.
                </Typography>
                <Typography>
                    You can enter your keys, words, encrypted messages etc. and
                    see solution for each algorithm along with calculations
                    required for each operation.
                </Typography>
            </PaperTitle>
            <PaperTitle title={'Finding errors'} p={2}>
                <Typography>
                    If you find some error on this website contact me and I'll
                    get it sorted out.
                </Typography>
            </PaperTitle>

            <PaperTitle title={'Adding new features'} p={2}>
                <Typography gutterBottom>
                    If you want to add some algorithm you can contact me and
                    I'll try to add it to this app. I'm not all that smart
                    though, so I will need some form of tutorial on how this new
                    algorithm works.
                </Typography>
                <Typography>
                    You can also add new features on your own github fork, and
                    create pull request to this app.
                </Typography>
            </PaperTitle>
            <PaperTitle title={'Contact'} p={2}>
                <Typography gutterBottom>krzysztofwidacki@gmail.com</Typography>
                <Link
                    href={
                        'https://www.linkedin.com/in/krzysztof-widacki-68460712b/'
                    }
                >
                    LinkedIn
                </Link>
                <br />
                <Link href={'https://github.com/Angael/KryptoBreaker'}>
                    Source for this website
                </Link>
            </PaperTitle>
        </>
    );
}

export default Home;
