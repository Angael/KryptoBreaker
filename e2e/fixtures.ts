import { type Page, expect, test as base } from '@playwright/test';

/** Fails the test on any uncaught page error or console error. */
export const test = base.extend<{ page: Page }>({
	page: async ({ page }, use) => {
		const errors: string[] = [];
		page.on('pageerror', (e) => errors.push(e.message));
		page.on('console', (m) => {
			if (m.type() === 'error') errors.push(m.text());
		});
		await use(page);
		expect(errors, 'console / page errors').toEqual([]);
	},
});

export { expect };

export const result = (page: Page) => page.getByTestId('result-value');
export const resultError = (page: Page) => page.getByTestId('result-error');

export async function fill(page: Page, label: string | RegExp, value: string) {
	const input = page.getByLabel(label, { exact: typeof label === 'string' });
	await input.fill(value);
}
