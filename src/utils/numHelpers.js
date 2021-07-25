export function mod(n, m = 26) {
    return ((n % m) + m) % m;
}

// odwrotnosc modularna PROSTY SPOSOB, CZASAMI NIE DZIALA np. dla a=215 n=25
export const modInverse = (a, m = 26) => {
    for (let x = 1; x < m; x++) if (((a % m) * (x % m)) % m == 1) return x;
};

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
