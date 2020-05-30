/* eslint-disable no-undef */

// navigate to all pages and make sure a11y is fine
describe("Navigate", () => {
  beforeEach(() => {
    cy.visit("/").injectAxe()
  })

  it("visits the index page which is my about page", () => {
    cy.findByText(/Hi! My name is Maik/i)
    cy.checkA11y()
  })

  it("finds my appearances page", () => {
    cy.findByRole("link", { name: /appearances/i }).click()
    cy.findByText("Journals")
    cy.checkA11y()
  })

  it("finds my contact page", () => {
    cy.findByRole("link", { name: /contact/i }).click()
    cy.findByText("Contact")
    cy.checkA11y()
  })

  it("finds my work page", () => {
    cy.findByRole("link", { name: /work/i }).click()
    cy.findByText("Work")
    cy.checkA11y()
  })

  it("finds my privacy page", () => {
    cy.findByRole("link", { name: /privacy/i }).click()
    cy.findByText("Privacy")
    cy.checkA11y()
  })

  it("navigates from about to about", () => {
    cy.findByRole("link", { name: /about/i }).click()
    cy.findByText("About")
    cy.checkA11y()
  })
})
