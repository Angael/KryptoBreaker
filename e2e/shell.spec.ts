import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

const ALL = [
	'/',
	'/inverse',
	'/mod-power',
	'/modulo',
	'/letters-numbers',
	'/cesar',
	'/affine',
	'/vigenere',
	'/hill',
	'/diffie-hellman',
	'/rsa/key-generation',
	'/rsa/encrypt',
	'/rsa/decrypt',
	'/rsa/sign',
	'/rsa/verify-signature',
	'/el-gamal/key-generation',
	'/el-gamal/encrypt',
	'/el-gamal/decrypt',
	'/el-gamal/sign',
	'/el-gamal/verify-signature',
];

test('navigation drawer opens from the navbar and navigates', async ({ page, isMobile }) => {
	await page.goto('/');
	const nav = page.getByRole('navigation', { name: 'Calculators' });
	if (isMobile) {
		await expect(nav).toBeHidden();
		await page.getByRole('button', { name: 'Toggle navigation' }).click();
		await expect(nav).toBeVisible();
		await nav.getByRole('link', { name: 'Vigenère' }).click();
		await expect(nav).toBeHidden();
	} else {
		await expect(nav).toBeVisible();
		await nav.getByRole('link', { name: 'Vigenère' }).click();
		await expect(nav.getByRole('link', { name: 'Vigenère' })).toHaveAttribute('aria-current', 'page');
		await page.getByRole('button', { name: 'Toggle navigation' }).click();
		await expect(nav).toBeHidden();
		await page.reload();
		await expect(nav).toBeHidden();
	}
	await expect(page).toHaveURL(/\/vigenere$/);
	await expect(page).toHaveTitle('Vigenère · Ciphers · KryptoBreaker');
});

test('mobile drawer closes with Escape', async ({ page, isMobile }) => {
	test.skip(!isMobile);
	await page.goto('/');
	await page.getByRole('button', { name: 'Toggle navigation' }).click();
	await expect(page.getByRole('dialog')).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).toBeHidden();
});

test('key usage dialog', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'When to use which key' }).click();
	const dialog = page.getByRole('dialog', { name: 'When to use which key' });
	await expect(dialog).toContainText("receiver's public key");
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
});

test('dark theme toggles and persists', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('/');
	const html = page.locator('html');
	await expect(html).not.toHaveClass(/dark/);
	await page.getByRole('button', { name: 'Toggle dark theme' }).click();
	await expect(html).toHaveClass(/dark/);
	await page.reload();
	await expect(html).toHaveClass(/dark/);
});

for (const theme of ['light', 'dark'] as const) {
	test(`no accessibility violations (${theme})`, async ({ page }) => {
		test.slow();
		await page.emulateMedia({ colorScheme: theme });
		for (const path of ALL) {
			await page.goto(path);
			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
			const { violations } = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
				.analyze();
			expect(
				violations.map((v) => `${path}: ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target}`),
				path,
			).toEqual([]);
		}
	});
}
