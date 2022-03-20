module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xxm: { max: "312px" }, //verysmall
      mdm: { max: "880px" }, //md small
      ldm: { max: "980px" },
    },
    colors: {
      "system-gray": "#eff2f5",
    },
  },
  plugins: [],
};
