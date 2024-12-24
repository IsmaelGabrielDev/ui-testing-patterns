const { homePage } = require("../support/pages/home.page")
const loginPage = require("../support/pages/login.page")

Cypress.Commands.add('login', (email, senha) => { 
    cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' })
    cy.visit('/')
    homePage.openMenu('Account')
    loginPage.login(email, senha)
    homePage.openMenu('Account')
})