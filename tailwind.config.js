module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem", // Add custom size 'xxs' (10px)
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
