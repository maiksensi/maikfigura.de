import { Button } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"

export default function MenuItemButton(props) {
  return (
    <Button
      disableTouchRipple={true}
      disableFocusRipple={true}
      disableRipple={true}
      className={props.buttonStyle}
      component={Link}
      to={`/${props.label}`}
    >
      {props.label}
    </Button>
  )
}
