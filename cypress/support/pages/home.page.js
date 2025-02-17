/// <reference types="cypress" />

export const homePage = {
    openMenu(menu) {
        return cy.get(`[href="/Tab/${menu}"]`).click()
    },
    openSearchProduct() {
        cy.get('[data-testid="search-products"]').click()
    },

    openCategoriesFilter() {
        cy.get('[data-testid="Category"]').click()
    },

    Categories() {
       return cy.get('[data-testid^="search-category-"]')
    }
}