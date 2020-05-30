import React from "react"
import NavigationLink from "./NavigationLink"

export default function NavigationItems({ ulClasses, liClasses, pagenames }) {
  return (
    <ul className={ulClasses}>
      {pagenames.map(pagename => {
        return (
          <li className={liClasses} key={pagename}>
            <h1>
              <NavigationLink label={pagename} />
            </h1>
          </li>
        )
      })}
    </ul>
  )
}
