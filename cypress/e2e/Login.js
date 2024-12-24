/// <reference types="cypress" />

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
const { profilePage } = require("../support/pages/profile.page")

Given('que estou na pagina inicial', () => {
  cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' })
  cy.visit('/')
})

When('eu faço o login com o usuario {string} e senha {string}', (email, senha) => {
  cy.login(email, senha)
})

Then('o nome do usuário deve aparecer na página de perfil', () => {
  profilePage.customerName().should('contain', 'Cliente EBAC')
})
