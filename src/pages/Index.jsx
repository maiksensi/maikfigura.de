import { navigate } from "gatsby"
import { useEffect } from "react"

export default function Index() {
  useEffect(() => {
    navigate("/about")
  })
  return null
}
