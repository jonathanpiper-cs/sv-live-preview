import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				interop: 'auto'
			}
		}
	},
	server: {
		host: 'localhost'
	},
	define: {
		'process.env': {}
	}
});
