export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#effdf5',
                    100: '#d9fbe7',
                    200: '#b6f4cf',
                    300: '#7ae8b0',
                    400: '#39cf87',
                    500: '#18b06a',
                    600: '#0f8a55',
                    700: '#0f6c46',
                    800: '#0d5638',
                    900: '#0b4730'
                }
            },
            boxShadow: {
                glow: '0 0 40px rgba(56, 189, 248, 0.18)'
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(3,105,161,0.55), rgba(16,185,129,0.35))'
            }
        }
    },
    plugins: [],
};
