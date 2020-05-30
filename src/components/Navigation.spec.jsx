import { render, screen, fireEvent } from "@testing-library/react"
import { useStaticQuery } from "gatsby"
import React from "react"
import Navigation from "./Navigation"

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        navPages: ["about", "privacy"],
      },
    },
  }))
  render(<Navigation />)
})

describe("Navigation", () => {
  it("should render two about links", () => {
    expect(screen.getAllByText(/about/i)).toHaveLength(2)
  })

  it("should render two privacy links", () => {
    expect(screen.getAllByText(/privacy/i)).toHaveLength(2)
  })

  it("should have four links in total", () => {
    expect(screen.getAllByRole("link")).toHaveLength(4)
  })
})

describe("Burger Navigation", () => {
  it("should open and close", () => {
    expect(screen.getByLabelText(/open navigation/i)).toBeDefined()
    fireEvent.click(screen.getByLabelText(/open navigation/i))
    expect(screen.getByLabelText(/close navigation/i)).toBeDefined()
  })
})
