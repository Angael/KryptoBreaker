import type { ReactNode } from 'react';
import type { Dict } from './index';

const m = (children: ReactNode) => <span className="font-mono tabular-nums">{children}</span>;
type P = Record<string, string>;

export const pl: Dict = {
	meta: {
		description:
			'Kalkulatory krok po kroku: szyfr Cezara, afiniczny, Vigenère’a, Hilla, RSA, ElGamal, Diffie–Hellman i arytmetyka modularna.',
	},
	groups: {
		helpers: 'Pomocnicze',
		ciphers: 'Szyfry',
		exchange: 'Wymiana kluczy',
		rsa: 'RSA',
		elgamal: 'ElGamal',
	},
	routes: {
		home: 'Strona główna',
		inverse: 'Odwrotność modulo',
		modPower: 'Potęgowanie modulo',
		modulo: 'Modulo',
		letters: 'Litery na liczby',
		caesar: 'Cezar',
		affine: 'Afiniczny',
		vigenere: 'Vigenère',
		hill: 'Hill',
		diffieHellman: 'Diffie–Hellman',
		rsaKeys: 'Generowanie kluczy',
		rsaEncrypt: 'Szyfrowanie',
		rsaDecrypt: 'Deszyfrowanie',
		rsaSign: 'Podpis',
		rsaVerify: 'Weryfikacja podpisu',
		elgamalKeys: 'Generowanie kluczy',
		elgamalEncrypt: 'Szyfrowanie',
		elgamalDecrypt: 'Deszyfrowanie',
		elgamalSign: 'Podpis',
		elgamalVerify: 'Weryfikacja podpisu',
	},
	shell: {
		skip: 'Przejdź do treści',
		toggleNav: 'Pokaż lub ukryj nawigację',
		pages: 'Strony',
		calculators: 'Kalkulatory',
		keyUsage: 'Którego klucza użyć',
		lightTheme: 'Jasny motyw',
		darkTheme: 'Ciemny motyw',
		toggleTheme: 'Przełącz ciemny motyw',
		language: 'Język',
		github: 'Kod źródłowy na GitHubie',
		coffee: 'Postaw mi kawę',
		source: 'Kod źródłowy',
	},
	keyUsage: {
		description: 'Który klucz szyfruje, deszyfruje, podpisuje i weryfikuje.',
		encrypting: 'Szyfrowanie wiadomości',
		signing: 'Podpisywanie wiadomości',
		enc1: (b) => (
			<>
				{b('Nadawca')} szyfruje {b('kluczem publicznym odbiorcy')}.
			</>
		),
		enc2: (b) => (
			<>
				{b('Odbiorca')} deszyfruje {b('swoim kluczem prywatnym')}.
			</>
		),
		sign1: (b) => (
			<>
				{b('Nadawca')} podpisuje {b('swoim kluczem prywatnym')}.
			</>
		),
		sign2: (b) => (
			<>
				{b('Odbiorca')} weryfikuje {b('kluczem publicznym nadawcy')}.
			</>
		),
	},
	common: {
		inputs: 'Dane',
		keys: 'Klucze',
		message: 'Wiadomość',
		signedMessage: 'Podpisana wiadomość',
		calculation: 'Obliczenia',
		table: 'Tabela',
		result: 'Wynik',
		mode: 'Tryb',
		encrypt: 'Szyfruj',
		decrypt: 'Deszyfruj',
		plaintext: 'Tekst jawny',
		ciphertext: 'Szyfrogram',
		key: 'Klucz',
		number: 'Liczba',
		power: 'Potęga',
		modulo: 'Modulo',
		word: 'Słowo',
		inputType: 'Rodzaj danych',
		copy: 'Kopiuj wynik',
		copied: 'Skopiowano',
		publicKey: 'Klucz publiczny',
		privateKey: 'Klucz prywatny',
		validSignature: 'podpis poprawny',
		invalidSignature: 'podpis niepoprawny',
		enterLetters: 'Wpisz jakieś litery.',
		squareMultiply: 'Szybkie potęgowanie',
		formula: 'Wzór',
	},
	terms: {
		modulus: 'moduł',
		exponent: 'wykładnik',
		Number: 'Liczba',
		Power: 'Potęga',
		Modulo: 'Modulo',
		Key: 'Klucz',
		keyEntry: 'Każdy element klucza',
	},
	errors: {
		wholeNumber: (p: P) => `${p.label} musi być liczbą całkowitą.`,
		positive: (p: P) => `${p.label} musi być dodatnią liczbą całkowitą.`,
		nonNegative: (p: P) => `${p.label} nie może być ujemne.`,
		atLeast: (p: P) => `${p.label} musi wynosić co najmniej ${p.min}.`,
		range: (p: P) => `${p.label} musi być w przedziale od ${p.lo} do ${p.hi}.`,
		noValid: (p: P) => `Dla tych parametrów nie istnieje poprawne ${p.label}.`,
		prime: (p: P) => `${p.label} musi być liczbą pierwszą.`,
		distinctPrimes: () => 'p i q muszą być różnymi liczbami pierwszymi.',
		coprime: (p: P) => `${p.label} musi być względnie pierwsze z ${p.n} (NWD = ${p.gcd}).`,
		keyLetter: () => 'Klucz musi zawierać co najmniej jedną literę.',
		textLetter: () => 'Tekst musi zawierać co najmniej jedną literę.',
		square: () => 'Klucz musi być macierzą kwadratową.',
		keySize: (p: P) => `Rozmiar klucza musi być w przedziale od ${p.min} do ${p.max}.`,
		blockMultiple: (p: P) =>
			`Liczba liter szyfrogramu musi być wielokrotnością ${p.size} (jest ich ${p.count}).`,
		notInvertible: () => 'Klucza nie da się odwrócić modulo 26, bo NWD(det K, 26) nie jest równe 1.',
		noInverse: (p: P) => `${p.a} nie ma odwrotności modulo ${p.n}, bo NWD(${p.a}, ${p.n}) = ${p.gcd}.`,
	},
	pow: {
		tableLabel: 'Kroki szybkiego potęgowania',
		binary: (exp, bin, rev) => (
			<>
				{exp} w systemie dwójkowym to {bin}. Czytane od prawej, jego bity to t = [{rev}].
			</>
		),
		howTo: (
			<>
				Zaczynamy od x₀ = 1 i a₀ = podstawa. W każdym wierszu a jest podnoszone do kwadratu. Gdy bit t w danym
				wierszu wynosi 1, bieżący wynik x jest mnożony przez a. Ostatnie x jest wynikiem. Najedź na wartość
				lub ją dotknij, aby zobaczyć, jak ją policzono.
			</>
		),
		x0: 'x₀ = 1',
		x0mod1: 'x₀ = 1 mod 1 = 0',
		unchanged: (i) => `t${i} = 0, więc x się nie zmienia`,
	},
	euclid: {
		tableLabel: 'Kroki rozszerzonego algorytmu Euklidesa',
		reduce: 'Najpierw redukujemy:',
		howTo: (
			<>
				Każdy wiersz dzieli n przez a: q mówi, ile razy a mieści się w n, a r to reszta. Następny wiersz
				dzieli poprzednie a przez r. Jednocześnie liczymy t, tak aby każda reszta r była równa t·a modulo n.
				Gdy reszta wyniesie 0, ostatnie a jest największym wspólnym dzielnikiem. Jeśli wynosi ono 1, ostatnie
				t jest odwrotnością.
			</>
		),
		check: 'sprawdzenie:',
		noInverse: (a, n, gcd) => `NWD(${a}, ${n}) = ${gcd} ≠ 1, więc ${a} nie ma odwrotności modulo ${n}.`,
	},
	letters: {
		tableLabel: 'Tabela liter',
		pt: 'TJ',
		ct: 'SZ',
	},
	home: {
		lead: 'Wpisz klucze i wiadomości, a dostaniesz wynik razem z każdym krokiem obliczeń.',
		about:
			'Zrobiłem tę stronę, żeby pomóc ludziom za darmo uczyć się algorytmów kryptograficznych, a trochę też dlatego, że chciałem mieć łatwiej na egzaminach. Każda strona działa offline, a dane są zapisywane w adresie URL, więc obliczenia można udostępnić linkiem.',
		contact: (email, linkedin, github) => (
			<>
				Znalazłeś błąd albo brakuje Ci algorytmu? {email}, {linkedin} albo otwórz pull request na {github}.
			</>
		),
		email: 'Napisz do mnie',
		linkedin: 'znajdź mnie na LinkedInie',
	},
	inverse: {
		intro: (
			<>
				Odwrotność liczby a modulo n to taka liczba a⁻¹, dla której {m('a · a⁻¹ mod n = 1')}. Istnieje tylko
				wtedy, gdy a i n nie mają wspólnego dzielnika innego niż 1. W arytmetyce modularnej w ten sposób cofa
				się mnożenie, na przykład przy deszyfrowaniu szyfru afinicznego albo tworzeniu klucza prywatnego RSA.
			</>
		),
		euclid: 'Rozszerzony algorytm Euklidesa',
	},
	modPower: {
		intro: (
			<>
				Liczy{' '}
				{m(
					<>
						liczba<sup>potęga</sup> mod modulo
					</>,
				)}
				, nie wyliczając nigdy ogromnej liczby liczba<sup>potęga</sup>. Metoda „podnieś do kwadratu i pomnóż”
				potrzebuje tylko jednego podniesienia do kwadratu na każdy bit potęgi i to na niej opierają się RSA,
				ElGamal oraz Diffie–Hellman.
			</>
		),
	},
	modulo: {
		intro: (
			<>
				{m('x mod n')} to reszta z dzielenia x przez n. Wynik zawsze jest w przedziale od 0 do n − 1, również
				dla liczb ujemnych.
			</>
		),
	},
	lettersPage: {
		intro:
			'Szyfry klasyczne zamieniają każdą literę na liczbę, wykonują obliczenia na liczbach, a wyniki zamieniają z powrotem na litery. Alfabet ma 26 liter, więc każdy wynik jest liczony modulo 26.',
		listLabel: 'Litery i ich numery',
	},
	caesar: {
		intro:
			'Szyfr Cezara przesuwa każdą literę tekstu o tę samą liczbę miejsc w alfabecie. Przy szyfrowaniu klucz jest dodawany do numeru każdej litery, a przy deszyfrowaniu odejmowany. Znaki inne niż a–z pozostają bez zmian.',
		hintEncrypt: 'Wartość dodawana do każdej litery',
		hintDecrypt: 'Wartość odejmowana od każdej litery',
	},
	affine: {
		intro: (
			<>
				Szyfr afiniczny mnoży numer każdej litery przez a i dodaje b: {m('y = (a·x + b) mod 26')}. Przy
				deszyfrowaniu odejmujemy b i mnożymy przez odwrotność a: {m('x = a⁻¹·(y − b) mod 26')}. Dlatego a musi
				mieć odwrotność, czyli nie może mieć wspólnego dzielnika z 26. W trybie liczbowym to samo liczy się
				dla jednej liczby modulo p.
			</>
		),
		hintX: 'Liczba do przekształcenia',
		hintP: (p) => `Obliczenia modulo ${p}`,
		hintA: (n) => `Musi być względnie pierwsze z ${n}`,
		inverseTitle: 'Odwrotność a',
		inverseHowTo: (a, n) =>
			`Mnożymy a przez 0, 1, 2, … aż wynik mod ${n} wyniesie 1. Ten mnożnik jest odwrotnością ${a}.`,
	},
	vigenere: {
		intro:
			'Szyfr Vigenère’a to szyfr Cezara, w którym przesunięcie zmienia się z litery na literę. Słowo-klucz jest wypisywane wielokrotnie pod tekstem, a każda litera jest przesuwana o numer litery klucza pod nią. Znaki inne niż a–z pozostają bez zmian i nie zużywają litery klucza.',
		hintKey: 'Powtarzany wzdłuż liter tekstu',
	},
	hill: {
		intro: (
			<>
				Szyfrowanie Hilla polega na wpisaniu liter słowa do macierzy, wiersz po wierszu, i pomnożeniu jej
				przez macierz klucza modulo 26. Deszyfrowanie Hilla polega na pomnożeniu zaszyfrowanego słowa przez
				macierz <strong>odwróconego</strong> klucza. Klucz da się odwrócić tylko wtedy, gdy jego wyznacznik ma
				odwrotność modulo 26.
			</>
		),
		decrypt: 'Deszyfruj',
		decryptWithInverse: 'Deszyfruj (mam odwrócony klucz)',
		keySize: 'Rozmiar klucza',
		key: 'Klucz K',
		inverseKey: 'Odwrócony klucz K⁻¹',
		keyLabel: 'Klucz',
		cell: (label, r, c) => `${label}, wiersz ${r}, kolumna ${c}`,
		notInvertible:
			'Tego klucza nie da się odwrócić modulo 26 (NWD(det K, 26) ≠ 1), więc wyniku nie da się odszyfrować.',
		skipped: (n) => `Pominięto znaki inne niż litery: ${n}. `,
		padded: (n, size) => `Ostatni blok uzupełniono literą „a” (${n} ×), aby miał ${size} liter.`,
		inverseTitle: 'Odwrócony klucz',
		inverseHowTo:
			'Aby odwrócić klucz, liczymy jego wyznacznik i odwrotność wyznacznika modulo 26. Odwrócony klucz to macierz dołączona pomnożona przez tę odwrotność, modulo 26.',
		textMatrix: 'Macierz tekstu',
		keyMatrix: 'Macierz klucza',
		resultMatrix: 'Macierz wyniku',
		adjugate: 'Macierz dołączona mod 26',
		calcHowTo:
			'Każdy wiersz macierzy tekstu to jeden blok liter. Pomnożenie go przez macierz klucza daje jeden blok wyniku.',
		afterMod: 'Po modulo 26',
	},
	dh: {
		intro: [
			'Wymiana kluczy Diffiego–Hellmana pozwala dwóm osobom ustalić ten sam tajny klucz przez publiczny kanał, bez wysyłania samego klucza.',
			'Osoba 1 losuje prywatny klucz a, a osoba 2 losuje prywatny klucz b. Każda z nich liczy ze swojego klucza prywatnego klucz publiczny. Klucze publiczne mogą zostać przesłane sobie nawzajem w sposób, który nie jest bezpieczny.',
			'Na koniec każda osoba podnosi otrzymany klucz publiczny do potęgi swojego klucza prywatnego. Obie dostają tę samą liczbę: wspólny klucz.',
		],
		hintP: 'Publiczny moduł (liczba pierwsza)',
		hintG: 'Publiczna podstawa',
		hintA: 'Klucz prywatny osoby 1',
		hintB: 'Klucz prywatny osoby 2',
		publicKeys: 'Oblicz klucze publiczne',
		publicKeysHowTo:
			'Każda osoba podnosi g do potęgi swojego klucza prywatnego. A i B są potem wymieniane publicznie.',
		person1: 'Osoba 1',
		person2: 'Osoba 2',
		sharedKey: 'Oblicz wspólny klucz',
		sharedHowTo:
			'Każda osoba podnosi otrzymany klucz publiczny do potęgi swojego klucza prywatnego. Nikt inny nie może tego zrobić, bo wymaga to jednego z kluczy prywatnych.',
		resultLabel: 'Wspólny klucz',
		bothGot: (k) => `Obie osoby obliczyły ten sam wspólny klucz, ${k}.`,
	},
	rsa: {
		keysIntro:
			'RSA potrzebuje dwóch różnych liczb pierwszych p i q. Ich iloczyn n jest częścią obu kluczy. φ = (p − 1)(q − 1) służy do wyboru wykładników: e to dowolna liczba bez wspólnego dzielnika z φ, a d to odwrotność e modulo φ. Klucz publiczny (e, n) można dać każdemu, a klucz prywatny (d, n) musi pozostać tajny.',
		hintP: 'Pierwsza liczba pierwsza',
		hintQ: 'Druga liczba pierwsza',
		hintE: 'Liczba od 1 do φ, względnie pierwsza z φ',
		keysHowTo: 'd znajdujemy rozszerzonym algorytmem Euklidesa:',
		encryptIntro:
			'Aby zaszyfrować wiadomość x, czyli liczbę mniejszą od n, podnosimy ją do potęgi e z klucza publicznego odbiorcy, modulo n.',
		hintX: 'Wiadomość do zaszyfrowania, 0 ≤ x < n',
		ciphertextY: 'Szyfrogram y',
		decryptIntro:
			'Aby odszyfrować y, odbiorca podnosi je do potęgi d ze swojego klucza prywatnego, modulo n. Wynikiem jest oryginalna wiadomość.',
		hintY: 'Zaszyfrowana wiadomość, 0 ≤ y < n',
		messageX: 'Wiadomość x',
		signIntro:
			'Aby podpisać wiadomość, a częściej jej skrót h, nadawca podnosi ją do potęgi d ze swojego klucza prywatnego, modulo n. Każdy, kto ma klucz publiczny nadawcy, może potem sprawdzić podpis.',
		hintH: 'Wiadomość lub jej skrót, 0 ≤ h < n',
		signatureS: 'Podpis s',
		verifyIntro:
			'Podnosimy podpis s do potęgi e z klucza publicznego nadawcy, modulo n. Jeśli podpis jest poprawny, wynikiem jest wiadomość. Jeśli nie, wiadomość albo podpis zostały zmienione.',
		hintHVerify: 'Wiadomość lub jej skrót',
		hintS: 'Podpis wysłany z wiadomością',
		verification: 'Weryfikacja',
		matches: 'Podpis pasuje do wiadomości.',
		mismatch: 'Podpis nie pasuje do wiadomości.',
	},
	elgamal: {
		keysIntro:
			'ElGamal liczy modulo liczba pierwsza p. α to publiczna podstawa, a t to losowa tajna liczba. β = αᵗ mod p jest publikowane. Klucz publiczny to (p, α, β), a klucz prywatny to t.',
		hintP: 'Moduł (liczba pierwsza)',
		hintAlpha: 'Publiczna podstawa',
		hintAlphaKeys: 'Publiczna podstawa (nie sprawdzamy, czy jest generatorem)',
		hintT: 'Prywatna liczba losowa',
		hintBeta: 'αᵗ mod p',
		encryptIntro:
			'Aby zaszyfrować wiadomość x, nadawca losuje liczbę r i wysyła dwie liczby: y₁ = αʳ mod p, które ukrywa r, oraz y₂, czyli wiadomość pomnożoną przez βʳ. Tylko ktoś, kto zna t, może z powrotem usunąć βʳ. Dla każdej wiadomości należy wylosować nowe r.',
		hintX: 'Wiadomość, 0 ≤ x < p',
		hintR: 'Liczba losowa, 1 ≤ r ≤ p − 2',
		decryptIntro:
			'Odbiorca używa swojego klucza prywatnego t. Podniesienie y₁ do potęgi p − 1 − t daje odwrotność βʳ, więc pomnożenie przez nią y₂ odsłania wiadomość.',
		hintY: 'Zaszyfrowana wiadomość',
		signIntro:
			'Aby podpisać skrót wiadomości h, nadawca losuje r bez wspólnego dzielnika z p − 1. u = αʳ mod p to pierwsza część podpisu. Druga część, s, wymaga odwrotności r modulo p − 1, którą znajdujemy rozszerzonym algorytmem Euklidesa.',
		hintH: 'Skrót wiadomości',
		hintRSign: 'Liczba losowa, względnie pierwsza z p − 1',
		calcU: 'Oblicz u',
		calcS: 'Oblicz s',
		signature: 'Podpis (u, s)',
		verifyIntro:
			'Odbiorca liczy dwie liczby, używając tylko wartości publicznych: f ze skrótu wiadomości i g z podpisu. Jeśli podpis jest poprawny, f = g. Jeśli się różnią, wiadomość albo podpis zostały zmienione.',
		hintU: 'Pierwsza wartość podpisu',
		hintSVerify: 'Druga wartość podpisu',
		validWhen: 'Podpis jest poprawny, gdy f = g.',
		calcF: 'Oblicz f',
		calcG: 'Oblicz g',
	},
};
