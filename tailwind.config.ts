import { BASE_INPUT_STYLE } from '@/consts'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  safelist: [...BASE_INPUT_STYLE.split(' ')],
  theme: {
    extend: {},
    screens: {
      xs: '384px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1288px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2120px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
