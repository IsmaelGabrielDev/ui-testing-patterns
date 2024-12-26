/// <reference types="cypress" />

const { email, senha } = require('../fixtures/data.json')
const { profilePage } = require('../support/pages/profile.page')
const { homePage } = require('../support/pages/home.page')

describe('Testes de Autenticação', () => {

    before(() => {
        //cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' })
    })

    beforeEach(() => {
        cy.task('tabNavigation', { user : email, pass: senha })
        //cy.visit('/')
        //cy.login(email, senha)
    })
    it('Deve fazer o login com sucesso', () => {
        cy.visit('/')
        homePage.openMenu('Account')
        profilePage.customerName().should('have.text', 'Cliente EBAC')
    })

    afterEach(() => {
        //cy.screenshot()
    })
    
    after(() => {
        //cy.clearCookies()
    })
})