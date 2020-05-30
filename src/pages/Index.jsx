import { navigate } from "gatsby"
import "highlight.js/styles/github.css"
import { useEffect } from "react"

export default function Index() {
  useEffect(() => {
    navigate("/about")
  })
  return null
}
