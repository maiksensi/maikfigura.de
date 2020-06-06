/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },
    "gatsby-transformer-asciidoc",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`tailwindcss`), require(`autoprefixer`)],
      },
    },
  ],
  siteMetadata: {
    navPages: ["about", "appearances", "contact", "work", "privacy"],
    headerMetadata: {
      siteUrl: "https://maikfigura.de",
      lang: "en",
      title: "Maik Figura's homepage, Chaos Engineer at codecentric AG",
      description:
        "Personal homepage of Maik Figura, a Chaos Engineer at codecentric AG",
      keywords: ["Software Engineer", "IT Consultant", "Chaos Engineer"],
      canonicalUrl: "https://maikfigura.de",
      themeColor: "#ff0000",
    },
  },
}
