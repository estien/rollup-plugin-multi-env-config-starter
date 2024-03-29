import { terser } from 'rollup-plugin-terser';
import config from './rollup-plugin-multi-env-config';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		config(),
		production && terser() // minify, but only in production
	]
};
