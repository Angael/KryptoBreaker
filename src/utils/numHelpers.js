export function mod(n, m = 26) {
    return ((n % m) + m) % m;
}

export const modInverseAlgorithm = (given_a, given_b) => {
    const steps = [];

    let i = 0;
    let r, b, u, v;
    while (r != 0) {
        const prevRow = i === 0 ? null : steps[i - 1];
        const a = prevRow ? prevRow['b'] : given_a;
        b = prevRow ? prevRow['r'] : given_b;
        u = prevRow ? prevRow['uprim'] - prevRow['q'] * prevRow['u'] : 0;
        const uprim = prevRow ? prevRow['u'] : 1;
        v = prevRow ? prevRow['vprim'] - prevRow['q'] * prevRow['v'] : 1;
        const vprim = prevRow ? prevRow['v'] : 0;
        const q = Math.floor(a / b);
        r = mod(a, b);

        steps.push({ u, uprim, v, vprim, a, b, q, r });

        i++;
        if (isNaN(r)) {
            break;
        }
    }

    steps.shift();
    const result = mod(u, given_b);
    return { steps, result, resultBeforeMod: u };
};

// odwrotnosc modularna PROSTY SPOSOB, CZASAMI NIE DZIALA np. dla a=215 n=25
export const modInverse = (a, m = 26) => {
    return modInverseAlgorithm(a, m).result;
};

// OLD BAD PROSTY SPOSOB, CZASAMI NIE DZIALA np. dla a=215 n=25
// export const modInverse = (a, m = 26) => {
//     for (let x = 1; x < m; x++) if (((a % m) * (x % m)) % m == 1) return x;
// };

export const getCode = (letter) => {
    let code = letter.toLowerCase().charCodeAt(0) - 97;

    if (code < 0 || code > 25) {
        return NaN;
    }

    return code;
};
export const getLetter = (code) => String.fromCharCode(mod(code, 26) + 97);

export function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

export function isPrime(num) {
    for (var i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
}

window.mod = mod;
window.modInverse = modInverse;
window.getCode = getCode;
window.getLetter = getLetter;
window.dec2bin = dec2bin;
window.isPrime = isPrime;
