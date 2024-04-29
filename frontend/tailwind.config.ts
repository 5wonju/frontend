import type { Config } from 'tailwindcss'

const colorPalette = {
	// Mono Colors
	black: '#454645',
	darkGray1: '#767676',
	darkGray2: '#8D8787',
	darkGray3: '#9BA2AE',
	darkGray4: '#C0B9B9',
	lightGray1: '#C4C4C4',
	lightGray2: '#D9D9D9',
	lightGray3: '#E5E6E9',
	lightGray4: '#F3F3F3',
	lightGray5: '#FAFAFA',
	white: '#ffffff',

	// Main Colors
}

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: colorPalette,
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
}
export default config
