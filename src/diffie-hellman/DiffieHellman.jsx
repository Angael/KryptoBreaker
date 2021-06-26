import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DisplayFormula from './DisplayFormula';
import useNumberInput from './useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import BinaryExplanator from '../utils/fast-power-table/BinaryExplanator';
import { isPrime } from 'utils/numHelpers';

function DiffieHellman() {
	const [p, setP] = useNumberInput(1019);
	const [g, setG] = useNumberInput(2);
	const [a, setA] = useNumberInput(638);
	const [b, setB] = useNumberInput(719);

	const pIsPrime = useMemo(() => isPrime(p), [p]);

	const solutionPowA = useMemo(() => getFastPowerMod(g, a, p), [p, g, a]);
	const solutionPowB = useMemo(() => getFastPowerMod(g, b, p), [p, g, b]);

	const solutionPowAMaster = useMemo(() => getFastPowerMod(solutionPowA.result, b, p), [
		p,
		solutionPowA.result,
		b,
	]);
	const solutionPowBMaster = useMemo(() => getFastPowerMod(solutionPowB.result, a, p), [
		p,
		solutionPowB.result,
		b,
	]);

	return (
		<Box my={4}>
			<Paper elevation={3}>
				<Grid container>
					<Grid item xs={6}>
						<Box p={2}>
							<TextField label='g' onChange={setG} value={g} type='number' helperText='public' />
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box p={2}>
							<TextField
								label='p'
								onChange={setP}
								value={p}
								type='number'
								helperText={pIsPrime ? 'public' : 'p has to be prime'}
								error={!pIsPrime}
							/>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box p={2}>
							<TextField
								label='a'
								onChange={setA}
								value={a}
								type='number'
								helperText='private for person 1'
							/>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box p={2}>
							<TextField
								label='b'
								onChange={setB}
								value={b}
								type='number'
								helperText='private for person 2'
							/>
						</Box>
					</Grid>
				</Grid>
				<Box p={2} pb={0} textAlign='center'>
					<Typography variant='h3'>Calculating Public keys:</Typography>
					<Typography variant='body1'>
						Person 1 generates random private key a, Person 2 generates random private key b.
					</Typography>
					<Typography variant='body1'>
						Then they calculate public keys they can give eachother in a NOT secure way.
					</Typography>
				</Box>
				<Box p={2} pb={0} textAlign='center'>
					<Typography variant='h4'>Formulae to calculate:</Typography>
					<Grid container>
						<Grid item xs={6}>
							<Typography variant='h5'>Person 1 calculates:</Typography>
							<DisplayFormula number={g} modulo={p} power={a} />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='h5'>Person 2 calculates:</Typography>
							<DisplayFormula number={g} modulo={p} power={b} />
						</Grid>
					</Grid>
				</Box>

				<Box p={2} pb={0} textAlign='center'>
					<Typography variant='h4'>Fast modulo power method (!):</Typography>
				</Box>
				<Grid container>
					<Grid item xs={6}>
						<Box p={2}>
							<FastPowerTable stepsObj={solutionPowA} pow={a} />
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box p={2}>
							<FastPowerTable stepsObj={solutionPowB} pow={b} />
						</Box>
					</Grid>
				</Grid>
				<Box p={2} pb={0} textAlign='center'>
					<Typography variant='h3'>Calculating Master (private) key:</Typography>
					<Typography variant='body1'>
						After Person 1 received Person 2 Public key, and vice versa, they can both calculate the
						same private key.
					</Typography>
					<Typography variant='body1'>
						Then they can use this key to encrypt their communication, without ever sending this
						private key.
					</Typography>
				</Box>
				<Box p={2} pb={0} textAlign='center'>
					<Typography variant='h4'>Formulae to calculate:</Typography>
					<Grid container>
						<Grid item xs={6}>
							<Typography variant='h5'>Person 1 calculates:</Typography>
							<DisplayFormula number={solutionPowB.result} modulo={p} power={a} />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='h5'>Person 2 calculates:</Typography>
							<DisplayFormula number={solutionPowA.result} modulo={p} power={b} />
						</Grid>
					</Grid>
				</Box>
				<Grid container>
					<Grid item xs={6}>
						<Box p={2}>
							<FastPowerTable stepsObj={solutionPowBMaster} pow={a} />
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box p={2}>
							<FastPowerTable stepsObj={solutionPowAMaster} pow={b} />
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}

export default DiffieHellman;
