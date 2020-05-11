import { Grid, withStyles } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import MenuItemButton from "./MenuItemButton"

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.secondary,

    "&:link": {
      color: theme.palette.text.secondary,
      textDecoration: "none",
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
  },
  offset: theme.mixins.toolbar,
}))

function MenuItems() {
  const classes = useStyles()
  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <MenuItemButton
            buttonStyle={classes.button}
            linkStyle={classes.link}
            label="about"
          />
        </Grid>
        <Grid item>
          <MenuItemButton
            buttonStyle={classes.button}
            linkStyle={classes.link}
            label="appearances"
          />
        </Grid>
        <Grid item>
          <MenuItemButton
            buttonStyle={classes.button}
            linkStyle={classes.link}
            label="contact"
          />
        </Grid>
        <Grid item>
          <MenuItemButton
            buttonStyle={classes.button}
            linkStyle={classes.link}
            label="work"
          />
        </Grid>
        <Grid item>
          <MenuItemButton
            buttonStyle={classes.button}
            linkStyle={classes.link}
            label="privacy"
          />
        </Grid>
      </Grid>
    </>
  )
}

/* 
--> Use this if we ever get a mobile menu :)
*/

// position the menu in the middle of the available screen
const GlobalCss = withStyles({
  "@global": {
    "#___gatsby": {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
})(() => null)
export default function MobileNavigation() {
  return (
    <>
      <GlobalCss />
      <MenuItems />
    </>
  )
}
