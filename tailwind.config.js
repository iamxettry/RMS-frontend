/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:'class',
  theme: {
    extend: {
      backgroundImage: {
        'hero-5': "url('/assets/carousel-img/hero5-removebg.png')",
        'hero-6': "url('/assets/carousel-img/hero6-removebg.png')",
        'hero-7': "url('/assets/carousel-img/hero7-removebg.png')",
        'hero-8': "url('/assets/carousel-img/hero8-removebg.png')",
        'hero-11': "url('/assets/carousel-img/hero11-removebg.png')",
        'hero-12': "url('/assets/carousel-img/hero12-removedbg.png')",
        'hero-13': "url('/assets/carousel-img/hero13.jpg')",
        'hero-14': "url('/assets/bgimage/fries-bg-removed.png')",
        'drinks-1': "url('/assets/carousel-img/drinks1-removebg.png')",
      },
    },
    screens:{
      'xs': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',

    }
  },
  plugins: [],
}
