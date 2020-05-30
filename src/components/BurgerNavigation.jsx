import React from "react"
import NavigationItems from "./NavigationItems"
import NavigationStyle from "./NavigationStyle.module.css"

const Burger = ({ open, setOpen }) => {
  return (
    <button
      aria-label={open ? "Close navigation" : "Open navigation"}
      className={
        NavigationStyle.burger +
        " h-8 w-8 grid grid-flow-row items-center gap-1 sm:hidden mr-5 z-10 " +
        (open ? NavigationStyle.open : "")
      }
      open={open}
      onClick={() => setOpen(!open)}
    >
      <div className="border rounded border-gray-900 bg-gray-900" />
      <div className="border rounded border-gray-900 bg-gray-900" />
      <div className="border rounded border-gray-900 bg-gray-900" />
    </button>
  )
}

export default function BurgerNavigation({ open, setOpen, pagenames }) {
  return (
    <>
      <Burger open={open} setOpen={setOpen}></Burger>
      <NavigationItems
        ulClasses={
          NavigationStyle.nav +
          " text-center flex flex-col justify-center items-center sm:hidden bg-gray-200 overflow-x-hidden w-0 h-screen absolute top-0 right-0 " +
          (open ? NavigationStyle.shown : "")
        }
        pagenames={pagenames}
      />
    </>
  )
}
