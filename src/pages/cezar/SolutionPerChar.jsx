import { getLetter, getCode, mod } from 'utils/numHelpers';

import LineForLetter from 'utils/line-for-letter/LineForLetter';

function SolutionPerChar({ letter, keyValue: key, isEncryption: isEncr }) {
	const letterCode = getCode(letter);
	const letterAndCode = isEncr ? letterCode + key : letterCode - key;
	const afterMod = mod(letterAndCode, 26);
	return (
		<LineForLetter letter={letter} resultLetter={getLetter(afterMod)}>
			{isEncr ? 'y' : 'x'} = {isEncr ? 'e' : 'd'}
			<sub>{key}</sub>({letterCode}) = ({letterCode} {isEncr ? '+' : '-'} {key}) mod 26 ={' '}
			{letterAndCode} mod 26 = {afterMod}
		</LineForLetter>
	);
}

export default SolutionPerChar;
