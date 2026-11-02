import { expect, fill, result, resultError, test } from './fixtures';

test('caesar: decrypt reverses encrypt and keeps punctuation', async ({ page }) => {
	await page.goto('/cesar');
	await fill(page, 'Plaintext', 'Ala ma kota!');
	await fill(page, 'Key', '3');
	await expect(result(page)).toHaveText('dod pd nrwd!');
	await page.getByRole('radio', { name: 'Decrypt' }).click();
	await fill(page, 'Ciphertext', 'dod pd nrwd!');
	await expect(result(page)).toHaveText('ala ma kota!');
});

test('caesar: non-integer key is rejected next to the result', async ({ page }) => {
	await page.goto('/cesar');
	await fill(page, 'Key', '1.9');
	await expect(resultError(page)).toHaveText('Key must be a whole number.');
	await expect(page.getByLabel('Key', { exact: true })).toHaveAttribute('aria-invalid', 'true');
});

test('affine: non-invertible a is an error, decryption round-trips', async ({ page }) => {
	await page.goto('/affine');
	await fill(page, 'a', '2');
	await expect(resultError(page)).toContainText('a must be coprime with 26');
	await fill(page, 'a', '3');
	await page.getByRole('radio', { name: 'Decrypt' }).click();
	await fill(page, 'Ciphertext', 'lgbamxzghwfh');
	await expect(result(page)).toHaveText('kryptografia');
	await expect(page.getByText('a-1 = 9')).toBeVisible();
});

test('affine: number mode in Z_p', async ({ page }) => {
	await page.goto('/affine');
	await page.getByRole('radio', { name: 'Number' }).click();
	await expect(result(page)).toHaveText('20');
	await expect(page.getByText('(3·25 + 7) mod 31 = 82 mod 31 = 20')).toBeVisible();
});

test('vigenère: empty key is an error', async ({ page }) => {
	await page.goto('/vigenere');
	await fill(page, 'Key', '');
	await expect(resultError(page)).toHaveText('The key must contain at least one letter.');
});

test('hill: decrypt computes the inverse key and restores the text', async ({ page }) => {
	await page.goto('/hill');
	await page.getByRole('radio', { name: 'Decrypt', exact: true }).click();
	await fill(page, 'Ciphertext', 'fqmesyjgq');
	await expect(result(page)).toHaveText('telewizor');
	await expect(page.getByRole('table', { name: 'Inverted key K⁻¹' })).toContainText('25');
});

test('hill: singular key is flagged and cannot decrypt', async ({ page }) => {
	await page.goto('/hill?key=2,0;0,1&text=abcd');
	await expect(page.getByText('This key cannot be inverted mod 26')).toBeVisible();
	await page.getByRole('radio', { name: 'Decrypt', exact: true }).click();
	await expect(resultError(page)).toContainText('cannot be inverted');
});

test('hill: resizing the key resets it to identity', async ({ page }) => {
	await page.goto('/hill');
	const slider = page.getByRole('slider', { name: 'Key size' });
	await slider.focus();
	await page.keyboard.press('ArrowLeft');
	await expect(page.getByLabel('Key row 2 column 2')).toHaveValue('1');
	await expect(page.getByLabel('Key row 1 column 2')).toHaveValue('0');
	await expect(result(page)).toHaveText('telewizora');
});

test('modular inverse: reports when no inverse exists', async ({ page }) => {
	await page.goto('/inverse');
	await fill(page, 'Modulo', '25');
	await expect(resultError(page)).toHaveText('215 has no inverse modulo 25, because gcd(215, 25) = 5.');
	await expect(page.getByText('gcd(215, 25) = 5 ≠ 1')).toBeVisible();
});

test('modular exponentiation: exact for numbers beyond 2^53', async ({ page }) => {
	await page.goto('/mod-power?g=100000001&e=2&m=100000007');
	await expect(result(page)).toHaveText('36');
	await page.goto('/mod-power?g=2&e=4294967296&m=7');
	await expect(result(page)).toHaveText('2');
});

test('RSA: invalid key parameters are rejected', async ({ page }) => {
	await page.goto('/rsa/key-generation?p=3&q=5&e=2');
	await expect(resultError(page)).toContainText('e must be coprime with φ = 8');
	await page.goto('/rsa/key-generation?p=4');
	await expect(resultError(page)).toHaveText('p must be a prime number.');
});

test('RSA: tampered message fails verification', async ({ page }) => {
	await page.goto('/rsa/verify-signature');
	await fill(page, 'h', '358');
	await expect(result(page)).toContainText("doesn't match");
});

test('ElGamal: forged zero signature is rejected', async ({ page }) => {
	await page.goto('/el-gamal/verify-signature?p=23&alpha=5&t=6&h=0&u=0&s=0');
	await expect(resultError(page)).toContainText('u must be between 1 and 22');
});

test('ElGamal: randomizer must be coprime with p − 1', async ({ page }) => {
	await page.goto('/el-gamal/sign?p=23&alpha=5&t=6&h=13&r=2');
	await expect(resultError(page)).toContainText('r must be coprime with p − 1 = 22');
});

test('Diffie–Hellman: p must be prime', async ({ page }) => {
	await page.goto('/diffie-hellman');
	await fill(page, 'p', '1020');
	await expect(resultError(page)).toHaveText('p must be a prime number.');
});

test('inputs are kept in the URL so calculations can be shared', async ({ page }) => {
	await page.goto('/rsa/encrypt');
	await fill(page, 'x', '42');
	await expect(page).toHaveURL(/x=42/);
	const url = page.url();
	await page.goto('/');
	await page.goto(url);
	await expect(page.getByLabel('x', { exact: true })).toHaveValue('42');
});

test('pow table explains a step on hover / focus', async ({ page }) => {
	await page.goto('/mod-power?g=3&e=5&m=7');
	await expect(result(page)).toHaveText('5');
	const cell = page.getByRole('cell', { name: '5', exact: true }).last();
	await cell.focus();
	await expect(page.getByRole('tooltip')).toHaveText('x₃ = 3 · 4 mod 7 = 5');
	await cell.blur();
	await cell.hover();
	await expect(page.getByRole('tooltip')).toHaveText('x₃ = 3 · 4 mod 7 = 5');
});

test('number inputs step with arrow keys and the mouse wheel, exactly', async ({ page }) => {
	await page.goto('/mod-power?g=9007199254740993&e=1&m=100000000000000000000');
	const input = page.getByLabel('Number', { exact: true });
	await expect(input).toHaveAttribute('type', 'number');
	await input.focus();
	await page.keyboard.press('ArrowUp');
	await expect(input).toHaveValue('9007199254740994');
	await input.hover();
	await page.mouse.wheel(0, 100);
	await expect(input).toHaveValue('9007199254740993');
});

test('the result comes after the calculation', async ({ page }) => {
	await page.goto('/rsa/encrypt');
	const table = await page.getByRole('region', { name: 'Square-and-multiply steps' }).boundingBox();
	const answer = await page.getByTestId('result').boundingBox();
	expect(answer!.y).toBeGreaterThan(table!.y);
});

test('switching to Polish translates the interface and errors', async ({ page }) => {
	await page.goto('/diffie-hellman?p=1020');
	await page.getByRole('button', { name: 'Language: Polski' }).click();
	await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Diffie–Hellman');
	await expect(page.getByRole('heading', { name: 'Dane' })).toBeVisible();
	await expect(resultError(page)).toHaveText('p musi być liczbą pierwszą.');
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
	await page.getByRole('button', { name: 'Język: English' }).click();
	await expect(resultError(page)).toHaveText('p must be a prime number.');
});
