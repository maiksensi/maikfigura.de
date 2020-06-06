import React from "react"
import NavigationLink from "./NavigationLink"

export default function NavigationItems({ ulClasses, liClasses, pagenames }) {
  return (
    <ul className={ulClasses}>
      {pagenames.map(pagename => {
        return (
          <li className={liClasses} key={pagename}>
            <NavigationLink label={pagename} />
          </li>
        )
      })}
    </ul>
  )
}
