import { transcode } from 'buffer'
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
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        floating: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        faceInFromButtom1: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0%',
          },
          '20%': {
            transform: 'translateY(0)',
            opacity: '100%',
          },
          '70%': {
            transform: 'translateY(0)',
            opacity: '100%',
          },
          '90%': {
            transform: 'translateY(-15px)',
            opacity: '10%',
          },
          '100%': {
            transform: 'translateY(-15px)',
            opacity: '0%',
          },
        },
        faceInFromButtom2: {
          '0%': {
            opacity: '0%',
          },
          '10%': {
            transform: 'translateY(10px)',
            opacity: '0%',
          },
          '30%': {
            transform: 'translateY(0)',
            opacity: '100%',
          },
          '80%': {
            transform: 'translateY(0)',
            opacity: '100%',
          },
          '90%': {
            transform: 'translateY(-15px)',
            opacity: '10%',
          },
          '100%': {
            transform: 'translateY(-15px)',
            opacity: '0%',
          },
        },
      },
    },
    animation: {
      floating: '1.8s infinite ease-in-out floating',
      // 애니메이션이 끝나는 시점보다 문구가 바뀌는 시점이 빠르도록 500ms를 더 줌 (setInterval의 부정확성 예방)
      faceInFromButtom1: '4.5s infinite ease-in-out faceInFromButtom1',
      faceInFromButtom2: '4.5s infinite ease-in-out faceInFromButtom2',
      fadeIn: 'fadeIn 0.3s ease-in-out forwards',
      fadeInLast: 'fadeIn 0.7s ease-in-out forwards',
    },
  },
  plugins: [],
}
export default config
