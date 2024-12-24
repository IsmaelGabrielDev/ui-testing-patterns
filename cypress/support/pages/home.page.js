/// <reference types="cypress" />

export const homePage = {
    openMenu(menu) {
        return cy.get(`[href="/Tab/${menu}"]`).click()
    }
}