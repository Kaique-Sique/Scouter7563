// PostCSS config — the only plugin needed is Tailwind v4's own
// PostCSS integration (Tailwind v4 no longer needs `autoprefixer`
// listed separately, it's handled internally).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
