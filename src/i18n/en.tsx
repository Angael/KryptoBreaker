import type { ReactNode } from 'react';

const m = (children: ReactNode) => <span className="font-mono tabular-nums">{children}</span>;
type P = Record<string, string>;

export const en = {
	meta: {
		description:
			'Step-by-step calculators for Caesar, affine, Vigenère, Hill, RSA, ElGamal, Diffie–Hellman and modular arithmetic.',
	},
	groups: {
		helpers: 'Helpers',
		ciphers: 'Ciphers',
		exchange: 'Key exchange',
		rsa: 'RSA',
		elgamal: 'ElGamal',
	},
	routes: {
		home: 'Home',
		inverse: 'Modular inverse',
		modPower: 'Modular exponentiation',
		modulo: 'Modulo',
		letters: 'Letters to numbers',
		caesar: 'Caesar',
		affine: 'Affine',
		vigenere: 'Vigenère',
		hill: 'Hill',
		diffieHellman: 'Diffie–Hellman',
		rsaKeys: 'Key generation',
		rsaEncrypt: 'Encryption',
		rsaDecrypt: 'Decryption',
		rsaSign: 'Signature',
		rsaVerify: 'Signature verification',
		elgamalKeys: 'Key generation',
		elgamalEncrypt: 'Encryption',
		elgamalDecrypt: 'Decryption',
		elgamalSign: 'Signature',
		elgamalVerify: 'Signature verification',
	},
	shell: {
		skip: 'Skip to content',
		toggleNav: 'Toggle navigation',
		pages: 'Pages',
		calculators: 'Calculators',
		keyUsage: 'When to use which key',
		lightTheme: 'Light theme',
		darkTheme: 'Dark theme',
		toggleTheme: 'Toggle dark theme',
		language: 'Language',
		github: 'Source code on GitHub',
		coffee: 'Buy me a coffee',
		source: 'Source code',
	},
	keyUsage: {
		description: 'Which key encrypts, decrypts, signs and verifies.',
		encrypting: 'Encrypting a message',
		signing: 'Signing a message',
		enc1: (b: (s: string) => ReactNode) => (
			<>
				The {b('sender')} encrypts with the {b("receiver's public key")}.
			</>
		),
		enc2: (b: (s: string) => ReactNode) => (
			<>
				The {b('receiver')} decrypts with {b('their own private key')}.
			</>
		),
		sign1: (b: (s: string) => ReactNode) => (
			<>
				The {b('sender')} signs with {b('their own private key')}.
			</>
		),
		sign2: (b: (s: string) => ReactNode) => (
			<>
				The {b('receiver')} verifies with the {b("sender's public key")}.
			</>
		),
	},
	common: {
		inputs: 'Inputs',
		keys: 'Keys',
		message: 'Message',
		signedMessage: 'Signed message',
		calculation: 'Calculation',
		table: 'Table',
		result: 'Result',
		mode: 'Mode',
		encrypt: 'Encrypt',
		decrypt: 'Decrypt',
		plaintext: 'Plaintext',
		ciphertext: 'Ciphertext',
		key: 'Key',
		number: 'Number',
		power: 'Power',
		modulo: 'Modulo',
		word: 'Word',
		inputType: 'Input type',
		copy: 'Copy result',
		copied: 'Copied',
		publicKey: 'Public key',
		privateKey: 'Private key',
		validSignature: 'valid signature',
		invalidSignature: 'invalid signature',
		enterLetters: 'Enter some letters.',
		squareMultiply: 'Square and multiply',
		formula: 'Formula',
	},
	terms: {
		modulus: 'modulus',
		exponent: 'exponent',
		Number: 'Number',
		Power: 'Power',
		Modulo: 'Modulo',
		Key: 'Key',
		keyEntry: 'Every key entry',
	} as Record<string, string>,
	errors: {
		wholeNumber: (p: P) => `${p.label} must be a whole number.`,
		positive: (p: P) => `${p.label} must be a positive integer.`,
		nonNegative: (p: P) => `${p.label} must not be negative.`,
		atLeast: (p: P) => `${p.label} must be at least ${p.min}.`,
		range: (p: P) => `${p.label} must be between ${p.lo} and ${p.hi}.`,
		noValid: (p: P) => `No valid ${p.label} exists for these parameters.`,
		prime: (p: P) => `${p.label} must be a prime number.`,
		distinctPrimes: () => 'p and q must be different prime numbers.',
		coprime: (p: P) => `${p.label} must be coprime with ${p.n} (gcd = ${p.gcd}).`,
		keyLetter: () => 'The key must contain at least one letter.',
		textLetter: () => 'The text must contain at least one letter.',
		square: () => 'The key must be a square matrix.',
		keySize: (p: P) => `The key size must be between ${p.min} and ${p.max}.`,
		blockMultiple: (p: P) => `The ciphertext must have a multiple of ${p.size} letters (it has ${p.count}).`,
		notInvertible: () => 'The key cannot be inverted mod 26, because gcd(det K, 26) is not 1.',
		noInverse: (p: P) => `${p.a} has no inverse modulo ${p.n}, because gcd(${p.a}, ${p.n}) = ${p.gcd}.`,
	},
	pow: {
		tableLabel: 'Square-and-multiply steps',
		binary: (exp: ReactNode, bin: ReactNode, rev: ReactNode) => (
			<>
				{exp} in binary is {bin}. Read from the right, its bits are t = [{rev}].
			</>
		),
		howTo: (
			<>
				Start with x₀ = 1 and a₀ = the base. In every row, a is squared. Whenever the bit t of the row is 1,
				the running result x is multiplied by a. The last x is the answer. Point at or tap a value to see how
				it was calculated.
			</>
		),
		x0: 'x₀ = 1',
		x0mod1: 'x₀ = 1 mod 1 = 0',
		unchanged: (i: string) => `t${i} = 0, so x stays the same`,
	},
	euclid: {
		tableLabel: 'Extended Euclidean algorithm steps',
		reduce: 'First reduce:',
		howTo: (
			<>
				Each row divides n by a: q is how many times a fits into n and r is what is left over. The next row
				divides the old a by r. At the same time t is tracked, so that every remainder r equals t·a modulo n.
				When the remainder reaches 0, the last a is the greatest common divisor. If it is 1, the last t is the
				inverse.
			</>
		),
		check: 'check:',
		noInverse: (a: string, n: string, gcd: string) =>
			`gcd(${a}, ${n}) = ${gcd} ≠ 1, so ${a} has no inverse modulo ${n}.`,
	},
	letters: {
		tableLabel: 'Letter table',
		pt: 'PT',
		ct: 'CT',
	},
	home: {
		lead: 'Enter your keys and messages and get the answer along with every step of the calculation.',
		about:
			'I built this to help people learn cryptographic algorithms for free, and because I wanted an easier time in my college exams. Every page works offline and its inputs are kept in the URL, so you can share a calculation as a link.',
		contact: (email: ReactNode, linkedin: ReactNode, github: ReactNode) => (
			<>
				Found a mistake or want another algorithm? {email}, {linkedin} or open a pull request on {github}.
			</>
		),
		email: 'Email me',
		linkedin: 'find me on LinkedIn',
	},
	inverse: {
		intro: (
			<>
				The modular inverse of a number a modulo n is the number a⁻¹ for which {m('a · a⁻¹ mod n = 1')}. It
				exists only when a and n have no common divisor other than 1. It is how multiplication is undone in
				modular arithmetic, for example when decrypting the affine cipher or creating an RSA private key.
			</>
		),
		euclid: 'Extended Euclidean algorithm',
	},
	modPower: {
		intro: (
			<>
				Calculates{' '}
				{m(
					<>
						number<sup>power</sup> mod modulo
					</>,
				)}{' '}
				without ever computing the huge number number<sup>power</sup>. The method, square and multiply, only
				needs one squaring per bit of the power, and it is the calculation RSA, ElGamal and Diffie–Hellman are
				built on.
			</>
		),
	},
	modulo: {
		intro: (
			<>
				{m('x mod n')} is the remainder left over after dividing x by n. The result is always between 0 and n
				− 1, also for negative numbers.
			</>
		),
	},
	lettersPage: {
		intro:
			'Classical ciphers turn every letter into a number, calculate with the numbers, and turn the results back into letters. The alphabet has 26 letters, so every result is taken mod 26.',
		listLabel: 'Letters and their numbers',
	},
	caesar: {
		intro:
			'The Caesar cipher shifts every letter of the text by the same number of places in the alphabet. To encrypt, the key is added to the number of each letter; to decrypt, it is subtracted. Characters other than a–z are kept unchanged.',
		hintEncrypt: 'Value that will be added to every letter',
		hintDecrypt: 'Value that will be subtracted from every letter',
	},
	affine: {
		intro: (
			<>
				The affine cipher multiplies the number of each letter by a and adds b: {m('y = (a·x + b) mod 26')}.
				To decrypt, b is subtracted and the result is multiplied by the inverse of a:{' '}
				{m('x = a⁻¹·(y − b) mod 26')}. That is why a must have an inverse, which means it must have no common
				divisor with 26. In number mode the same is done with a single number modulo p.
			</>
		),
		hintX: 'Number to transform',
		hintP: (p: string) => `Calculations are done modulo ${p}`,
		hintA: (n: string) => `Must be coprime with ${n}`,
		inverseTitle: 'Inverse of a',
		inverseHowTo: (a: string, n: string) =>
			`Multiply a by 0, 1, 2, … until the result mod ${n} is 1. That multiplier is the inverse of ${a}.`,
	},
	vigenere: {
		intro:
			'The Vigenère cipher is a Caesar cipher whose shift changes from letter to letter. The key word is written over and over under the text, and each letter is shifted by the number of the key letter below it. Characters other than a–z are kept and do not use up a key letter.',
		hintKey: 'Repeated over the letters of the text',
	},
	hill: {
		intro: (
			<>
				Hill encryption writes the letters of the word into a matrix, row by row, and multiplies it by the key
				matrix, mod 26. Hill decryption multiplies the encrypted word by the <strong>inverted</strong> key
				matrix instead. A key can only be inverted when its determinant has an inverse mod 26.
			</>
		),
		decrypt: 'Decrypt',
		decryptWithInverse: 'Decrypt (I have the inverted key)',
		keySize: 'Key size',
		key: 'Key K',
		inverseKey: 'Inverted key K⁻¹',
		keyLabel: 'Key',
		cell: (label: string, r: number, c: number) => `${label} row ${r} column ${c}`,
		notInvertible:
			'This key cannot be inverted mod 26 (gcd(det K, 26) ≠ 1), so the result cannot be decrypted.',
		skipped: (n: number) => `${n} character(s) other than letters were skipped. `,
		padded: (n: number, size: number) =>
			`The last block was filled up with ${n} × "a" to get ${size} letters.`,
		inverseTitle: 'Inverted key',
		inverseHowTo:
			'To invert the key, calculate its determinant and the inverse of the determinant mod 26. The inverted key is the adjugate matrix multiplied by that inverse, mod 26.',
		textMatrix: 'Text matrix',
		keyMatrix: 'Key matrix',
		resultMatrix: 'Result matrix',
		adjugate: 'Adjugate mod 26',
		calcHowTo:
			'Each row of the text matrix holds one block of letters. Multiplying it by the key matrix gives one block of the result.',
		afterMod: 'After mod 26',
	},
	dh: {
		intro: [
			'Diffie–Hellman key exchange allows two people to agree on the same secret key over a public channel, without ever sending the key itself.',
			'Person 1 picks a random private key a, and person 2 picks a random private key b. Each of them calculates a public key from their private key. The public keys can be sent to each other in a way that is not secure.',
			"Finally, each person raises the other one's public key to the power of their own private key. Both get the same number: the shared key.",
		],
		hintP: 'Public prime modulus',
		hintG: 'Public base',
		hintA: 'Person 1 private key',
		hintB: 'Person 2 private key',
		publicKeys: 'Calculate public keys',
		publicKeysHowTo:
			'Each person raises g to the power of their private key. A and B are then exchanged publicly.',
		person1: 'Person 1',
		person2: 'Person 2',
		sharedKey: 'Calculate the shared key',
		sharedHowTo:
			'Each person raises the public key they received to the power of their own private key. Nobody else can do this, because it needs one of the private keys.',
		resultLabel: 'Shared key',
		bothGot: (k: string) => `Both people calculated the same shared key, ${k}.`,
	},
	rsa: {
		keysIntro:
			'RSA needs two different prime numbers p and q. Their product n is part of both keys. φ = (p − 1)(q − 1) is used to pick the exponents: e is any number with no common divisor with φ, and d is the inverse of e modulo φ. The public key (e, n) can be given to everyone; the private key (d, n) must stay secret.',
		hintP: 'First prime number',
		hintQ: 'Second prime number',
		hintE: 'Number between 1 and φ, coprime with φ',
		keysHowTo: 'd is found with the extended Euclidean algorithm:',
		encryptIntro:
			"To encrypt a message x, which is a number smaller than n, raise it to the power e from the receiver's public key, modulo n.",
		hintX: 'Message to be encrypted, 0 ≤ x < n',
		ciphertextY: 'Ciphertext y',
		decryptIntro:
			'To decrypt y, the receiver raises it to the power d from their own private key, modulo n. The result is the original message.',
		hintY: 'Encrypted message, 0 ≤ y < n',
		messageX: 'Message x',
		signIntro:
			"To sign a message, or more often its hash h, the sender raises it to the power d from their own private key, modulo n. Anyone with the sender's public key can then check the signature.",
		hintH: 'Message or its hash, 0 ≤ h < n',
		signatureS: 'Signature s',
		verifyIntro:
			"Raise the signature s to the power e from the sender's public key, modulo n. If the signature is correct, the result is the message. If it is not, the message or the signature has been altered.",
		hintHVerify: 'Message or its hash',
		hintS: 'Signature sent with the message',
		verification: 'Verification',
		matches: 'The signature matches the message.',
		mismatch: "The signature doesn't match the message.",
	},
	elgamal: {
		keysIntro:
			'ElGamal calculates modulo a prime number p. α is a public base and t is a random secret number. β = αᵗ mod p is made public. The public key is (p, α, β) and the private key is t.',
		hintP: 'Prime modulus',
		hintAlpha: 'Public base',
		hintAlphaKeys: 'Public base (whether it is a generator is not checked)',
		hintT: 'Private random number',
		hintBeta: 'αᵗ mod p',
		encryptIntro:
			'To encrypt a message x, the sender picks a random number r and sends two numbers: y₁ = αʳ mod p, which hides r, and y₂, which is the message multiplied by βʳ. Only someone who knows t can remove βʳ again. A new r should be picked for every message.',
		hintX: 'Message, 0 ≤ x < p',
		hintR: 'Random number, 1 ≤ r ≤ p − 2',
		decryptIntro:
			'The receiver uses their private key t. Raising y₁ to the power p − 1 − t gives the inverse of βʳ, so multiplying y₂ by it uncovers the message.',
		hintY: 'Encrypted message',
		signIntro:
			'To sign a message hash h, the sender picks a random r with no common divisor with p − 1. u = αʳ mod p is the first part of the signature. The second part, s, needs the inverse of r modulo p − 1, which is found with the extended Euclidean algorithm.',
		hintH: 'Message hash',
		hintRSign: 'Random number, coprime with p − 1',
		calcU: 'Calculate u',
		calcS: 'Calculate s',
		signature: 'Signature (u, s)',
		verifyIntro:
			'The receiver calculates two numbers using only public values: f from the message hash, and g from the signature. If the signature is correct, f = g. If they differ, the message or the signature has been altered.',
		hintU: "Signature's first value",
		hintSVerify: "Signature's second value",
		validWhen: 'The signature is correct when f = g.',
		calcF: 'Calculate f',
		calcG: 'Calculate g',
	},
};
