export function mod(n, m) {
	return ((n % m) + m) % m;
}

// odwrotnosc modularna
export const modInverse = (a, m) => {
	for (let x = 1; x < m; x++) if (((a % m) * (x % m)) % m == 1) return x;
};

export const getCode = (letter) => letter.toLowerCase().charCodeAt(0) - 97;
export const getLetter = (code) => String.fromCharCode(mod(code, 26) + 97);
