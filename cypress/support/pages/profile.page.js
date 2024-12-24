/// <reference types="cypress" />

export const profilePage = {
    customerName: () => { return cy.get('[data-testid="CustomerName"]') }
}