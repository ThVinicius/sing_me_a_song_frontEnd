import recommendationFactory from '../factories/recommendationFactory'

beforeEach(() => {
  cy.resetDatabase()
})

describe('verifica se as recomendações estão sendo mostradas na home', () => {
  it('verifica se exibe as 10 recomendações mais recentes', () => {
    cy.createTopTen().then(recommendations => {
      cy.visit('http://localhost:3000')

      const recommendation = recommendationFactory()

      cy.get('[data-cy="name"]').type(recommendation.name)

      cy.get('[data-cy="url"]').type(recommendation.youtubeLink)

      cy.intercept('POST', '/recommendations').as('createRecommendation')

      cy.get('[data-cy="submit"]').click()

      cy.wait('@createRecommendation')

      cy.contains(recommendation.name).should('be.visible')

      for (const { name } of recommendations) {
        if (name === `Falamansa - Xote dos Milagres 1`) {
          cy.contains(/^Falamansa - Xote dos Milagres 1$/).should('not.exist')
        } else {
          cy.contains(name).should('be.visible')
        }
      }
    })
  })
})
