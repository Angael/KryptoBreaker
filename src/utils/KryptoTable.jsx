import { useState } from 'react';
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 'calc(100vw - 66px)',
    },
}));

function KryptoTable({
    startStr = '',
    endStr = '',
    middleNumbersArr,
    isEncryption = true,
}) {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles(isPhone);

    const startRow = (
        <TableRow>
            <TableCell component='th' scope='row'>
                {isEncryption ? 'PT' : 'CT'}
            </TableCell>
            {startStr.split('').map((v, i) => (
                <TableCell key={v + i} align='center'>
                    {v}
                </TableCell>
            ))}
        </TableRow>
    );

    const startNumbers = (
        <TableRow>
            <TableCell component='th' scope='row'>
                {isEncryption ? 'x' : 'y'}
            </TableCell>
            {startStr.split('').map((v, i) => (
                <TableCell key={v + i} align='center'>
                    {getCode(v)}
                </TableCell>
            ))}
        </TableRow>
    );

    const endNumbers = (
        <TableRow>
            <TableCell component='th' scope='row'>
                {isEncryption ? 'y' : 'x'}
            </TableCell>
            {endStr.split('').map((v, i) => (
                <TableCell key={v + i} align='center'>
                    {getCode(v)}
                </TableCell>
            ))}
        </TableRow>
    );

    const endRow = (
        <TableRow>
            <TableCell component='th' scope='row'>
                {isEncryption ? 'CT' : 'PT'}
            </TableCell>
            {endStr.split('').map((v, i) => (
                <TableCell key={v + i} align='center'>
                    {v}
                </TableCell>
            ))}
        </TableRow>
    );

    const middleRow = middleNumbersArr && (
        <TableRow>
            <TableCell component='th' scope='row'>
                k
            </TableCell>
            {middleNumbersArr.map((v, i) => (
                <TableCell key={v + '-' + i} align='center'>
                    {v}
                </TableCell>
            ))}
        </TableRow>
    );

    return (
        <TableContainer classes={classes}>
            <Table>
                <TableBody>
                    {startRow}
                    {startNumbers}
                    {middleRow}
                    {endNumbers}
                    {endRow}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default KryptoTable;
