/// <reference types="vitest/config" />
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png'],
			manifest: {
				name: 'KryptoBreaker',
				short_name: 'KryptoBreaker',
				description: 'Step-by-step calculators for classic and public-key cryptography.',
				theme_color: '#0a0a0a',
				background_color: '#ffffff',
				display: 'standalone',
				start_url: '/',
				icons: [
					{ src: 'logo192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'logo512.png', sizes: '512x512', type: 'image/png' },
				],
			},
			workbox: {
				navigateFallback: '/index.html',
				globPatterns: ['**/*.{js,css,html,png,ico}', '**/*-latin-wght-*.woff2'],
			},
		}),
	],
	resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
	test: {
		include: ['src/**/*.test.{ts,tsx}'],
		environment: 'node',
	},
});
