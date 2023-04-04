import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue({
	})],
	resolve: {
		alias: {
			'@/': __dirname + '/src/',
		}
	},
	build: {
		target: [
			'chrome100',
			'firefox100',
			'safari15.5'
		]
	}
})
