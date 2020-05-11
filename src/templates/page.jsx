import {
  AppBar,
  Toolbar,
  Container,
  Slide,
  useScrollTrigger,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { graphql } from "gatsby"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import React, { useEffect } from "react"
import Navigation from "../components/Navigation"

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

/*
Depending on the size of the screen the menu gets in the way,
so while scrolling, we will hide it
*/
function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Page({ data }) {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block)
    })
  })

  const classes = useStyles()

  const content = data.asciidoc

  return (
    <>
      <nav role="navigation">
        <HideOnScroll>
          <AppBar color="default" elevation={0}>
            <Toolbar>
              <Navigation />
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </nav>
      <div className={classes.offset} />
      <main role="main">
        <Container maxWidth="md">
          <h1>{content.document.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </Container>
      </main>
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
