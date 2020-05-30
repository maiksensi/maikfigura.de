import { Link } from "gatsby"
import React from "react"

export default function NavigationLink({ label }) {
  return (
    <Link
      to={`/${label}`}
      className="text-gray-700 hover:text-gray-900 hover:menu-underline focus:menu-underline"
      activeClassName="text-gray-900 menu-underline"
      partiallyActive={true}
    >
      {label}
    </Link>
  )
}
