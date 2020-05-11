import { graphql } from "gatsby"
import "highlight.js/styles/github.css"
import React from "react"
import Page from "../templates/page"

export default function Index({ data }) {
  return <Page data={data} />
}

// render about page as index page
export const query = graphql`
  query {
    asciidoc: asciidoc(fields: { slug: { eq: "/about/" } }) {
      html
      document {
        title
      }
    }
    allSitePage {
      edges {
        node {
          id
        }
      }
    }
  }
`
