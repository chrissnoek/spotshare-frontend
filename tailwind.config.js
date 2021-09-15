// tailwind.config.js
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        'screen-80vh': '80vh'
      },
    },
  },
  variants: {
    extend: {
      textColor: ['group-hover'],
    },
  },
  plugins: [],
};
