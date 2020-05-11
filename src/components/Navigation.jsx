import { AppBar, Grid, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import MenuItemButton from "./MenuItemButton"
import { useLocation } from "@reach/router"

// override global link styles for buttons in nav
const useStyles = makeStyles(theme => ({
  // currently active content page should have accent link color
  buttonActive: {
    textTransform: "none",
    "&:link": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:active": {
      backgroundColor: "transparent",
    },
    "& span": {
      color: theme.palette.text.primary,
      "&:link": {
        color: theme.palette.text.primary,
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

  // currently inactive menu items
  button: {
    textTransform: "none",
    "&:link": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:active": {
      backgroundColor: "transparent",
    },
    "& span": {
      color: theme.palette.text.secondary,
      "&:link": {
        color: theme.palette.text.primary,
      },
      "&:hover": {
        color: theme.palette.text.primary,
        textDecoration: `${theme.palette.text.secondary} underline`,
      },
      "&:active": {
        color: theme.palette.text.primary,
        textDecoration: `${theme.palette.text.primary} underline`,
      },
    },
  },
  offset: theme.mixins.toolbar,
}))

const isActive = (location, pagename) =>
  location.pathname.match(RegExp(pagename, "g"))

function MenuItems() {
  const classes = useStyles()
  const location = useLocation()
  const pagenames = ["about", "appearances", "contact", "work", "privacy"]

  return (
    <>
      <Grid container justify="center">
        <Grid item>
          {pagenames.map(pagename => {
            // someone visits the index page --> use different style
            if (location.pathname === "/" && pagename === "about") {
              return (
                <MenuItemButton
                  buttonStyle={classes.buttonActive}
                  label={pagename}
                  key={pagename}
                />
              )
            }

            // user is navigating pages --> use different style
            if (isActive(location, pagename)) {
              return (
                <MenuItemButton
                  buttonStyle={classes.buttonActive}
                  label={pagename}
                  key={pagename}
                />
              )
              //currently inactive pages --> use default nav style
            } else {
              return (
                <MenuItemButton
                  buttonStyle={classes.button}
                  label={pagename}
                  key={pagename}
                />
              )
            }
          })}
        </Grid>
      </Grid>
    </>
  )
}

export default function Navigation() {
  return (
    <>
      <AppBar color="default" elevation={0}>
        <Toolbar>
          <MenuItems />
        </Toolbar>
      </AppBar>
    </>
  )
}
