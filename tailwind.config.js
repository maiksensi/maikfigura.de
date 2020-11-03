module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
    ],
  },
  theme: {
    fontFamily: {
      sans: ["Inter"],
      mono: ["Fira Code"],
    },
  },
}
