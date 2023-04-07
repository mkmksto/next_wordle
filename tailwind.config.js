const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            // fontFamily: {
            //     // sans: ['var(--font-inter)'],
            //     // sans: ['var(--font-grotesk)'],
            // },
            colors: {
                'custom-red': '#c64629',
                'lighter-pink': '#f3b0aa',
                'darker-pink': '#eb7b71',
            },
        },
    },
    plugins: [],
}
