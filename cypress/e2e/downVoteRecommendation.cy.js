beforeEach(() => {
  cy.resetDatabase()
})

describe('testa a feature de remoção de pontos', () => {
  it('testa se a remoção de voto está sendo computado no backEnd e se está sendo mostrado no frontEnd', () => {
    cy.visit('http://localhost:3000')

    const recommendation = {
      name: 'Falamansa - Xote dos Milagres',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y'
    }

    cy.get('[data-cy="name"]').type(recommendation.name)

    cy.get('[data-cy="url"]').type(recommendation.youtubeLink)

    cy.intercept('POST', '/recommendations').as('createRecommendation')

    cy.get('[data-cy="submit"]').click()

    cy.wait('@createRecommendation')

    cy.contains(recommendation.name).should('be.visible')

    cy.getRecommendationByName(recommendation.name).then(({ id, score }) => {
      expect(score).to.equal(0)

      cy.intercept('POST', `/recommendations/${id}/downvote`).as('downVote')

      cy.get('[data-cy="downVote"]').click()

      cy.wait('@downVote')

      cy.get('[data-cy="score"]').should('have.text', '-1')

      cy.getRecommendationByName(recommendation.name).then(({ score }) => {
        expect(score).to.equal(-1)
      })
    })
  })
})
