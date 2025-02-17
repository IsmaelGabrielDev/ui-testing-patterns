/// <reference types="cypress" />

const { email, senha } = require('../fixtures/data.json')
const { profilePage } = require('../support/pages/profile.page')
const { homePage } = require('../support/pages/home.page')

describe('Testes de Autenticação', () => {

    before(() => {
    })

    beforeEach(() => {
        cy.login(email, senha)
    })
    it('Categories shold be visible', () => {
        cy.intercept('GET', '**/public/getCategories', {fixture: 'categories.json'}).as('getCategories')
        homePage.openSearchProduct()
        homePage.openCategoriesFilter()
        homePage.Categories().should('have.length.greaterThan', 1)
    })

    it('Categories shold be empty', () => {
        cy.intercept('GET', '**/public/getCategories', {fixture: 'noCategories.json'}).as('getCategoriesEmpty')
        homePage.openSearchProduct()
        homePage.openCategoriesFilter()
        homePage.Categories().should('have.length', 1)
    })

    it('Categories shold be empty error', () => {
        cy.intercept('GET', '**/public/getCategories', {statusCode: 500}).as('getCategoriesError')
        homePage.openSearchProduct()
        homePage.openCategoriesFilter()
        homePage.Categories().should('have.length', 1)
    })
})