import { graphql } from "gatsby"
import "highlight.js/styles/github.css"
import React from "react"
import Navigation from "../components/Navigation"
import ContentStyles from "./ContentStyles.module.css"
import { Content } from "../components/Content"

export default function Page({ data }) {
  const content = data.asciidoc

  return (
    <>
      <Navigation />
      <Content content={content} className={ContentStyles.page__content} />
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    asciidoc: asciidoc(fields: { slug: { eq: $slug } }) {
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
