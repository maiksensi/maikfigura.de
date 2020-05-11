import React from "react"
import HeadersAndGlobals from "./src/components/HeadersAndGlobals"
require("typeface-inter")

export const wrapRootElement = ({ element }) => {
  return <HeadersAndGlobals>{element}</HeadersAndGlobals>
}
