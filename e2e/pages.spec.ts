import { expect, result, test } from './fixtures';

/** Default inputs of every page and the answer they must produce (cross-checked against the unit tests). */
const pages: { path: string; title: string; value: string | RegExp }[] = [
	{ path: '/inverse', title: 'Modular inverse', value: '15' },
	{ path: '/mod-power', title: 'Modular exponentiation', value: '396' },
	{ path: '/modulo', title: 'Modulo', value: '2' },
	{ path: '/cesar', title: 'Caesar', value: 'nubswrjudild' },
	{ path: '/affine', title: 'Affine', value: 'lgbamxzghwfh' },
	{ path: '/vigenere', title: 'Vigenère', value: 'gripvxknapic' },
	{ path: '/hill', title: 'Hill', value: 'fqmesyjgq' },
	{ path: '/diffie-hellman', title: 'Diffie–Hellman', value: '498' },
	{ path: '/rsa/key-generation', title: 'Key generation', value: /\(761, 1739\)/ },
	{ path: '/rsa/encrypt', title: 'Encryption', value: '1327' },
	{ path: '/rsa/decrypt', title: 'Decryption', value: '20' },
	{ path: '/rsa/sign', title: 'Signature', value: '1630' },
	{ path: '/rsa/verify-signature', title: 'Signature verification', value: /matches the message/ },
	{ path: '/el-gamal/key-generation', title: 'Key generation', value: /1454/ },
	{ path: '/el-gamal/encrypt', title: 'Encryption', value: '(130, 414)' },
	{ path: '/el-gamal/decrypt', title: 'Decryption', value: '20' },
	{ path: '/el-gamal/sign', title: 'Signature', value: '(1310, 1579)' },
	{ path: '/el-gamal/verify-signature', title: 'Signature verification', value: /= g · valid signature/ },
];

for (const p of pages) {
	test(`${p.path} renders its default answer`, async ({ page }) => {
		await page.goto(p.path);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.title);
		if (typeof p.value === 'string') await expect(result(page)).toHaveText(p.value);
		else await expect(result(page)).toContainText(p.value);
	});
}

test('letters page lists the alphabet', async ({ page }) => {
	await page.goto('/letters-numbers');
	const items = page.getByRole('main').getByRole('listitem');
	await expect(items).toHaveCount(26);
	await expect(items.first()).toHaveText('a0');
	await expect(items.last()).toHaveText('z25');
});

test('unknown paths fall back to home', async ({ page }) => {
	await page.goto('/does-not-exist');
	await expect(page.getByRole('heading', { level: 1, name: 'KryptoBreaker' })).toBeVisible();
});

for (const lang of ['en', 'pl']) {
	test(`pages do not scroll horizontally (${lang})`, async ({ page }) => {
		await page.addInitScript((l) => localStorage.setItem('lang', l), lang);
		for (const p of pages) {
			await page.goto(p.path);
			await expect(result(page)).toBeVisible();
			const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
			expect(overflow, p.path).toBeLessThanOrEqual(0);
		}
	});
}
