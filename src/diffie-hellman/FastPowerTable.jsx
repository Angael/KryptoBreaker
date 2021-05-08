import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { css } from '@emotion/css';
import {
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	Tooltip,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const answerCss = css`
	background: #97ffa7;
	text-decoration: underline;
	border-radius: 5px;
	transition: 0.3s;
`;

const calculationNumbersCss = css`
	background: #ffd0ce;
	border-radius: 5px;
	transition: 0.3s;
`;

const TableCellHoverable = withStyles({
	root: {
		'&:hover': {
			backgroundColor: 'rgb(0 ,0, 0, 0.1)',
		},
	},
})(TableCell);

function FastPowerTable({ stepsObj }) {
	const [hoveringXRow, setHoveringXRow] = useState(null);
	const onStartHover = (i) => () => {
		setHoveringXRow(i);
	};
	const onEndHover = (i) => () => {
		setHoveringXRow(null);
	};

	return (
		<TableContainer component={(props) => <Paper variant='outlined' {...props} />}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='center'>i</TableCell>
						<TableCell align='center'>
							x<sub>i</sub>
						</TableCell>
						<TableCell align='center'>
							a<sub>i</sub>
						</TableCell>
						<TableCell align='center'>
							t<sub>i</sub>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{stepsObj.steps.map(({ i, x, a, t, helperTextA, helperTextX }) => {
						const isLast = i === stepsObj.steps.length - 1;

						const shouldBeHighlighted = hoveringXRow === i + 1;
						const xCss = isLast ? answerCss : shouldBeHighlighted ? calculationNumbersCss : '';
						const aCss = shouldBeHighlighted && !!t ? calculationNumbersCss : '';
						return (
							<TableRow key={i}>
								<TableCell align='center'>{i}</TableCell>
								<Tooltip title={helperTextX}>
									<TableCellHoverable
										align='center'
										className={xCss}
										onMouseEnter={onStartHover(i)}
										onMouseLeave={onEndHover(i)}
									>
										<div>{x}</div>
									</TableCellHoverable>
								</Tooltip>
								{!isLast && (
									<Tooltip title={helperTextA}>
										<TableCellHoverable align='center' className={aCss}>
											<div>{a}</div>
										</TableCellHoverable>
									</Tooltip>
								)}
								{!isLast && <TableCell align='center'>{t}</TableCell>}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default FastPowerTable;
