/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    dark1: '#0A196F',
                    dark2: '#102587',
                    dark3: '#1A37A7',
                    dark4: '#264BC8',
                    DEFAULT: '#3563E9',
                    light1: '#658DF1',
                    light2: '#85A8F8',
                    light3: '#AEC8FC',
                    light4: '#D6E4FD'
                },
                success: {
                    dark1: '#3B6506',
                    dark2: '#4C7A0B',
                    dark3: '#659711',
                    dark4: '#7FB519',
                    DEFAULT: '#9CD323',
                    light1: '#BCE455',
                    light2: '#D3F178',
                    light3: '#E8FAA6',
                    light4: '#F5FCD2'
                },
                error: {
                    dark1: '#7A0619',
                    dark2: '#930B16',
                    dark3: '#B71112',
                    dark4: '#DB2719',
                    DEFAULT: '#FF4423',
                    light1: '#FF7F59',
                    light2: '#FFA37A',
                    light3: '#FFC8A6',
                    light4: '#FFE7D3'
                },
                warning: {
                    dark1: '#7A4D0B',
                    dark2: '#936312',
                    dark3: '#B7821D',
                    dark4: '#DBA32A',
                    DEFAULT: '#FFC73A',
                    light1: '#FFD96B',
                    light2: '#FFE488',
                    light3: '#FFEFB0',
                    light4: '#FFF8D7'
                },
                information: {
                    dark1: '#102E7A',
                    dark2: '#1A4393',
                    dark3: '#2A60B7',
                    dark4: '#3D81DB',
                    DEFAULT: '#54A6FF',
                    light1: '#7EC2FF',
                    light2: '#98D3FF',
                    light3: '#BAE5FF',
                    light4: '#DCF3FF'
                },
                secondary: {
                    dark1: '#040815',
                    dark2: '#080C19',
                    dark3: '#0D121F',
                    dark4: '#131825',
                    DEFAULT: '#1A202C',
                    light1: '#596780',
                    light2: '#90A3BF',
                    light3: '#C3D4E9',
                    light4: '#E0E9F4'
                },
                main: {
                    blue: '#7F95D1',
                    melon: '#FFC0BE',
                    rose: '#FFEBE7'
                },
                pink: {
                    light: '#FFEDFA',      // --color-main-lightpink
                    light2: '#FFB8E0',     // --color-main-lightpink2
                    dark: '#EC7FA9',       // --color-main-darkpink
                    dark2: '#BE5985',      // --color-main-darkpink2

            },
        },}
    },
    plugins: [],
}