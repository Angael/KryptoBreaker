import { useState } from 'react';
import clamp from 'clamp';

import { mod, modInverse } from 'utils/numHelpers';
var Matrix = require('node-matrices');

export const getZeroesMatrix = (width, height) => {
	const arr = [];
	for (let i = 0; i < height; i++) {
		let subArray = [];
		for (let j = 0; j < width; j++) {
			subArray.push(0);
		}
		arr.push(subArray);
	}
	return new Matrix(arr);
};

export const modMatrix = (matrix) => {
	const newMatrix = new Matrix(matrix.data);
	for (let i = 0; i < matrix.data.length; i++) {
		for (let j = 0; j < matrix.data[i].length; j++) {
			matrix.data[i][j] = mod(matrix.data[i][j], 26);
		}
	}
	return newMatrix;
};

export const isKeyMatrixInvertable = (keyMatrix) => {
	const det = keyMatrix.determinant();
	const detModuloed = mod(det, 26);
	const inverse = modInverse(detModuloed);
	return !!inverse;
};

export const getInvertedMatrix = (keyMatrix) => {
	const det = keyMatrix.determinant();
	const detModuloed = mod(det, 26);
	const inverse = modInverse(detModuloed);
	const adjugate = keyMatrix.adjugate();

	for (let i = 0; i < adjugate.data.length; i++) {
		for (let j = 0; j < adjugate.data[i].length; j++) {
			if (adjugate.data[i][j] < 0) {
				adjugate.data[i][j] += 26;
			}
		}
	}

	const result = modMatrix(adjugate.scale(inverse));

	return result;
};
