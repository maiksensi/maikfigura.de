import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

export default function Header({ children }) {
  const headerMetadata = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            headerMetadata {
              lang
              title
              description
              canonicalUrl
              themeColor
            }
          }
        }
      }
    `
  ).site.siteMetadata.headerMetadata

  return (
    <>
      <Helmet title={headerMetadata.title}>
        <link rel="canonical" href={headerMetadata.canonicalUrl} />
        <html lang={headerMetadata.lang} />
        <meta name="theme-color" content={headerMetadata.themeColor} />
        <meta name="description" content={headerMetadata.description} />
      </Helmet>
      {children}
    </>
  )
}
