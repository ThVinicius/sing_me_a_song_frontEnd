// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', `http://localhost:5000/tests/reset`)
})

Cypress.Commands.add('getRecommendationByName', name => {
  cy.request('GET', `http://localhost:5000/tests/recommendations/name`, {
    name
  }).then(data => cy.wrap(data.body.recommendation))
})

Cypress.Commands.add('createTopTen', () => {
  cy.request('POST', `http://localhost:5000/tests/recommendations/topten`).then(
    data => cy.wrap(data.body)
  )
})

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
