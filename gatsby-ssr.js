import React from "react"
import HeadersAndGlobals from "./src/components/HeadersAndGlobals"

export const wrapRootElement = ({ element }) => {
  return <HeadersAndGlobals>{element}</HeadersAndGlobals>
}
