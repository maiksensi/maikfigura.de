const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // get all asciidoc nodes and create a slug
  if (node.internal.type === `Asciidoc`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// get the slug
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allAsciidoc {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // for each adoc create a new page
  result.data.allAsciidoc.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/page.jsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
