import { getCode, getLetter, mod } from "utils/numHelpers";
import LineForLetter from "utils/line-for-letter/LineForLetter";

function SolutionPerChar({ letter, keyValue, isEncryption: isEncr }) {
    const letterCode = getCode(letter);
    const keyCode = getCode(keyValue);

    const letterAndKey = isEncr ? letterCode + keyCode : letterCode - keyCode;

    const afterMod = mod(letterAndKey, 26);

    return (
        <LineForLetter letter={letter} resultLetter={getLetter(afterMod)}>
            {isEncr ? "y" : "x"} = {isEncr ? "e" : "d"}
            <sub>({keyValue})</sub>({letterCode}) = ({letterCode}{" "}
            {isEncr ? "+" : "-"} {keyCode}) mod 26 = {letterAndKey} mod 26 ={" "}
            {afterMod}
        </LineForLetter>
    );
}

export default SolutionPerChar;
