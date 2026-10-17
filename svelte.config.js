import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ pages: 'build', assets: 'build', precompress: true, strict: false }),
		alias: {
			// The live examples import the published package name; resolve it to the local source.
			'@atom-forge/ui/theme.css': 'src/lib/core/theme.css',
			'@atom-forge/ui': 'src/lib/index.ts'
		}
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true }
	}
};

export default config;
