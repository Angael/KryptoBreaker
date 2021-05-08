import { mod } from 'utils/numHelpers';
import { dec2bin } from 'utils/numHelpers';

const getFastPowerMod = (p, g, power) => {
	// np 011011101
	const binaryString = dec2bin(power);
	const reversedBinaryArray = binaryString.split('').reverse();

	if (!reversedBinaryArray.length) {
		return 'rip, nie chce mi sie pisac error handlingu';
	}

	const steps = [];
	steps.push({
		i: 0,
		x: 1,
		a: g,
		t: Number(reversedBinaryArray[0]),
		helperTextA: 'initial value is g = ' + g,
		helperTextX: 'initial value is always 1 ',
	});

	for (let i = 1; i < reversedBinaryArray.length + 1; i++) {
		const t = Number(reversedBinaryArray[i]);
		const prevT = steps[i - 1].t;
		const prevA = steps[i - 1].a;
		const prevX = steps[i - 1].x;

		let helperTextX = '';

		let a = mod(prevA * prevA, p);
		if (i === reversedBinaryArray.length) {
			a = '';
		}
		let helperTextA = `${prevA} * ${prevA} mod ${p} =  ${a}`;

		let x;
		if (prevT) {
			x = mod(prevX * prevA, p);
			helperTextX = `${prevX} * ${prevA} mod ${p} =  ${x}`;
		} else {
			x = prevX;
			helperTextX = `unchanged because previous t is 0 = ${x}`;
		}
		steps.push({ i, x, a, t, helperTextA, helperTextX });
	}

	const result = steps[steps.length - 1].x;
	return {
		result,
		steps,
	};
};

export default getFastPowerMod;
