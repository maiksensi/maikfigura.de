import React from "react"
import Header from "./src/components/Header"
import "./src/styles/globals.css"
require("typeface-inter")
require("typeface-fira-code")

export const wrapRootElement = ({ element }) => {
  return <Header>{element}</Header>
}

const isGeneratorTag = (type, name) => type === "meta" && name === "generator"

/**
 * Remove generator (exposes that this page was
 * built with gatsby and its version) tag in production builds
 * @see https://www.gatsbyjs.org/docs/ssr-apis/#onPreRenderHTML
 */
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  // filter head component against generator meta tag
  const headComponents = getHeadComponents().filter(
    ({ type, props: { name } = {} }) => !isGeneratorTag(type, name)
  )

  // replace with our filtered component list
  replaceHeadComponents(headComponents)
}
