import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#effef9',
          '100': '#cafdf0',
          '200': '#95fae2',
          '300': '#58f0d1',
          '400': '#22ceb1',
          '500': '#0dbfa3',
          '600': '#079a87',
          '700': '#0b7a6d',
          '800': '#0e6158',
          '900': '#105149',
          '950': '#02312e',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
