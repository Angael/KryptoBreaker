import { useState } from 'react';
import clamp from 'clamp';

const defaultMatrix = (size) => Array(size).fill(Array(size).fill(0));

const useMatrixState = (defaultMatrixArr) => {
	const _defaultMatrix = defaultMatrixArr || defaultMatrix(3);
	const [rows, setRows] = useState(_defaultMatrix);
	const size = rows.length;

	const setValue = (value, rowNum, columnNum) =>
		setRows(
			rows.map((row, i) => row.map((field, j) => (i === rowNum && columnNum === j ? value : field)))
		);

	const resize = (newWidth) => {
		// W teorii 1 powinno działać, ale dekrypcja buguje się jak jest 1x1 klucz
		const newWidthNumber = clamp(Number(newWidth), 2, 14);
		setRows(defaultMatrix(newWidthNumber));
	};

	return { rows, setValue, size, resize };
};

export default useMatrixState;
