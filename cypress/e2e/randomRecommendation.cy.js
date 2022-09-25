import recommendationFactory from '../factories/recommendationFactory'

beforeEach(() => {
  cy.resetDatabase()
})

describe('Testa a feature de recomendação aleatória', () => {
  it('verifica se ele renderiza', () => {
    cy.visit('http://localhost:3000')

    const recommendation = recommendationFactory()

    cy.get('[data-cy="name"]').type(recommendation.name)

    cy.get('[data-cy="url"]').type(recommendation.youtubeLink)

    cy.intercept('POST', '/recommendations').as('createRecommendation')

    cy.get('[data-cy="submit"]').click()

    cy.wait('@createRecommendation')

    cy.intercept('GET', '/recommendations/random').as('getRandom')

    cy.get('[data-cy="random"]').click()

    cy.url().should('equal', 'http://localhost:3000/random')

    cy.wait('@getRandom')

    cy.contains(recommendation.name).should('be.visible')
  })
})
