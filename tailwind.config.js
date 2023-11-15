/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'darkred': '#8b2b30',
            'calendarred': '#a62424',
            'lightgray': '#e5e5e5',
            'dark': '#3f444e',
            'darkgray': '#e8e8e8'
        },
        fontFamily: {
            'sans': ['ui-sans-serif', 'system-ui'],
            'serif': ['ui-serif', 'Georgia'],
            'mono': ['ui-monospace', 'SFMono-Regular'],
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1280px',
            xxl: '1440px',
        },

        container: {
            center: true,  // Center the container content
        },
    },
    plugins: [],
}

