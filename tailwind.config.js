/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'darkRed': '#8b2b30',
            'lightRed': '#a62424',
            'lightGray': '#e5e5e5',
            'dark': '#3f444e',
            'darkGray': '#e8e8e8',
            'borderGray': '#d8d8d8',
            'white': '#fff',
            'black': '#000',
        },
        fontSize:{
            'title':['40px'],
        },
        fontFamily: {
            'base': ['sans-serif', 'Roboto']
        },
        screens: {
            md: '768px',
            lg: '976px',
            xl: '1200px'
        },

        container: {
            center: true,  // Center the container content.
            padding: '15px', // Set horizontal padding.
        },
    },
    plugins: [],
}

