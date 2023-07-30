const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                'c-light': '#ffffff',
                'c-light-grey': '#9A9A9A',
                'c-green':'#02DF9C',
                'c-dark':'#3B444B',
                'c-b-light':'#E0E1E4',
                'c-blue':'#096CFF',
                'c-red':'#FF605C',
                'c-yellow': '#ffc107',
                'input-transparent':'rgba(204, 224, 255, 0.2)',
                'c-tag': '#797C92',
            },
            width: {
                'forms': '500px'
            },
            height: {

            },
            maxWidth: {

            },
            fontSize: {

            },
            backgroundImage: {

            }
        },
	},
	plugins: [],
}
