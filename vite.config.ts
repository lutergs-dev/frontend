import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	server: {
		fs: {
			allow: ["../.."]
		}
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: "./src",
			mode: "development",
			strategies: "injectManifest",
			filename: "service-worker.ts",
			scope: "/",
			base: "/",
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/pwa'
			},
			registerType: "autoUpdate",
			injectRegister: "auto",
			manifest: {
				name: "LuterGS Blog",
				short_name: "LuterGS",
				description: "LuterGS Blog in PWA",
				scope: "/pwa",
				start_url: "/pwa",
				display: 'standalone'
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
