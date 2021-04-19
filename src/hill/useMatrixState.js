import { useState } from 'react';
import clamp from 'clamp';

const defaultMatrix = (size) => Array(size).fill(Array(size).fill(0));

const useMatrixState = (initSize = 2) => {
	const [rows, setRows] = useState(defaultMatrix(initSize));
	const size = rows.length;

	const setValue = (value, rowNum, columnNum) =>
		setRows(
			rows.map((row, i) => row.map((field, j) => (i === rowNum && columnNum === j ? value : field)))
		);

	const resize = (newWidth) => {
		const newWidthNumber = clamp(Number(newWidth), 1, 14);
		setRows(defaultMatrix(newWidthNumber));
	};

	return { rows, setValue, size, resize };
};

export default useMatrixState;
