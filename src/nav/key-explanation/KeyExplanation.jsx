import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Paper,
    Typography,
    Box,
    useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

function KeyExplanation({ isOpen, onClose }) {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onClose}
                PaperComponent={Paper}
                aria-labelledby='draggable-dialog-title'
                maxWidth={false}
                fullScreen={isPhone}
            >
                <DialogTitle>When to use which key?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box mb={8}>
                            <Typography variant='h4'>
                                Encrypting a message:
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                1. <u>Sender</u> encrypts a message using{' '}
                                <u>receiver's public key</u>
                            </Typography>
                            <Typography variant='body1'>
                                2. <u>Receiver</u> decrypts a message using{' '}
                                <u>his own private key</u>
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography variant='h4'>
                                Signing a message:
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                1. <u>Sender</u> signs a message using{' '}
                                <u>his own private key</u>
                            </Typography>
                            <Typography variant='body1'>
                                2. <u>Receiver</u> verifies message and
                                signature using <u>sender's public key</u>
                            </Typography>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                {/*<DialogTitle>Kiedy używa się jakiego klucza?</DialogTitle>*/}
                {/*<DialogContent>*/}
                {/*	<DialogContentText>*/}
                {/*		<Box mb={8}>*/}
                {/*			<Typography variant='h4'>Szyfrowanie wiadomości</Typography>*/}
                {/*			<Typography variant='body1' gutterBottom>*/}
                {/*				1. <u>Nadawca</u> do zaszyfrowania informacji używa{' '}*/}
                {/*				<u>klucza publicznego odbiorcy</u>*/}
                {/*			</Typography>*/}
                {/*			<Typography variant='body1'>*/}
                {/*				2. <u>Odbiorca</u> do odszyfrowania informacji użyje{' '}*/}
                {/*				<u>swojego klucza prywatnego</u>*/}
                {/*			</Typography>*/}
                {/*		</Box>*/}
                {/*		<Box mb={2}>*/}
                {/*			<Typography variant='h4'>Podpis Cyfrowy Wiadomości</Typography>*/}
                {/*			<Typography variant='body1' gutterBottom>*/}
                {/*				1. <u>Nadawca</u> informacji aby podpisać wiadomość użyje{' '}*/}
                {/*				<u>swojego klucza prywatnego</u>*/}
                {/*			</Typography>*/}
                {/*			<Typography variant='body1'>*/}
                {/*				2. <u>Odbiorca</u> zweryfikuje wiadomość za pomocą{' '}*/}
                {/*				<u>klucza publicznego nadawacy</u>*/}
                {/*			</Typography>*/}
                {/*		</Box>*/}
                {/*	</DialogContentText>*/}
                {/*</DialogContent>*/}
                <DialogActions>
                    <Button autoFocus onClick={onClose} color='primary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default KeyExplanation;
