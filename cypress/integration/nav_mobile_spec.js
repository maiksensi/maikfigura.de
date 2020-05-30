/* eslint-disable no-undef */

describe("Navigation mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-6")
    cy.visit("/").injectAxe()
  })

  it("should not have accessibility violations when viewed on mobile", () => {
    cy.findByLabelText(/open navigation/i)
    cy.checkA11y()
  })

  it("should not have accessability violations when burger nav is open", () => {
    cy.findByLabelText(/open navigation/i).click()
    cy.checkA11y()
  })

  it("should show the burger menu and hide the desktop menu", () => {
    cy.findByLabelText(/open navigation/i).click()
    cy.findAllByText(/appearances/i)
      .first()
      .should("not.be.visible")
    cy.findAllByText(/appearances/i)
      .last()
      .should("be.visible")
  })

  it("should successfully open and close the burger menu", () => {
    cy.findByLabelText(/open navigation/i).click()
    cy.findByLabelText(/close navigation/i).click()
  })
})
