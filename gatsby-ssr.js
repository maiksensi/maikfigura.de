import React from "react"
import Header from "./src/components/Header"
import "./src/styles/globals.css"
require("typeface-inter")
require("typeface-fira-code")

export const wrapRootElement = ({ element }) => {
  return <Header>{element}</Header>
}
