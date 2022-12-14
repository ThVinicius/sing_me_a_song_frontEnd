import recommendationFactory from '../factories/recommendationFactory'

beforeEach(() => {
  cy.resetDatabase()
})

describe('Testa a criação de uma recomendação', () => {
  it('com dados válidos', () => {
    cy.visit('http://localhost:3000')

    const recommendation = recommendationFactory()

    cy.get('[data-cy="name"]').type(recommendation.name)

    cy.get('[data-cy="url"]').type(recommendation.youtubeLink)

    cy.intercept('POST', '/recommendations').as('createRecommendation')

    cy.get('[data-cy="submit"]').click()

    cy.wait('@createRecommendation')

    cy.contains(recommendation.name).should('be.visible')
  })
})
