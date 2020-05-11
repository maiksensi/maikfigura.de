import CssBaseline from "@material-ui/core/CssBaseline"
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles"
import React from "react"
import { Helmet } from "react-helmet"

export default function HeadersAndGlobals(props) {
  // build theme
  const theme = responsiveFontSizes(
    createMuiTheme({
      typography: {
        fontFamily: "Inter, sans-serif",
        fontSize: 18,
      },
      palette: {
        text: {
          primary: "rgba(0, 0, 0, 0.90)",
          secondary: "rgba(0, 0, 0, 0.55)",
          disabled: "rgba(0, 0, 0, 0.38)",
          hint: "rgba(0, 0, 0, 0.38)",
        },
      },
    })
  )

  // global css overrides
  const GlobalCss = withStyles({
    "@global": {
      // style links in content
      a: {
        color: theme.palette.text.primary,
        "&:link": {
          color: theme.palette.text.secondary,
          textDecoration: "none",
        },
        "&:hover": {
          color: theme.palette.text.primary,
          textDecoration: `${theme.palette.text.primary} underline`,
        },
        "&:active": {
          color: theme.palette.text.primary,
          textDecoration: `${theme.palette.text.primary} underline`,
        },
      },
    },
  })(() => null)

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      {/* inject theme */}
      <ThemeProvider theme={theme}>
        {/* inject opiniated optimizations */}
        <CssBaseline />
        {/* inject global css overrides */}
        <GlobalCss />
        {props.children}
      </ThemeProvider>
    </>
  )
}
