import { graphql } from "gatsby"
import "highlight.js/styles/github.css"
import React from "react"
import { Content } from "../components/Content"
import Navigation from "../components/Navigation"
import ContentStyles from "./ContentStyles.module.css"

export default function Page({ data }) {
  const content = data.asciidoc

  return (
    <>
      <Navigation />
      <Content
        content={content}
        className={ContentStyles.page__content + " mt-16"}
      />
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
