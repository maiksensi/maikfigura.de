import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import BurgerNavigation from "./BurgerNavigation"
import NavigationItems from "./NavigationItems"

export default function Navigation() {
  // get navigation pagenames
  const pagenames = useStaticQuery(
    graphql`
      query SiteMetadataPages {
        site {
          siteMetadata {
            navPages
          }
        }
      }
    `
  ).site.siteMetadata.navPages

  // is navigation open or closed
  const [open, setOpen] = useState(false)
  useEffect(() => {
    open && (document.body.style.overflow = "hidden")
    !open && (document.body.style.overflow = "")
  }, [open])

  return (
    <nav
      role="navigation"
      className="flex justify-end items-center sm:justify-center sm:flex-wrap bg-gray-300 h-16 w-full fixed top-0"
    >
      {/* desktop navigation */}
      <NavigationItems
        ulClasses="hidden sm:flex sm:flex-row"
        liClasses="mx-4"
        pagenames={pagenames}
      />

      {/* mobile navigation */}
      <BurgerNavigation open={open} setOpen={setOpen} pagenames={pagenames} />
    </nav>
  )
}
