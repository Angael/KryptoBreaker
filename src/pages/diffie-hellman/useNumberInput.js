import { useState } from 'react';

const useNumberInput = (initialValue) => {
	const [val, setVal] = useState(initialValue || 0);

	const setValueWithEvent = (e) => {
		const numberValue = Number(e.target.value);
		if (isNaN(numberValue)) {
			// do nothing
		} else {
			setVal(numberValue);
		}
	};

	return [val, setValueWithEvent];
};

export default useNumberInput;
