beforeEach(() => {
  cy.resetDatabase()
})

describe('testa a feature de adição de pontos', () => {
  it('testa se o voto está sendo computado no backEnd', () => {
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

    cy.getRecommendationByName(recommendation.name).then(({ id }) => {
      cy.intercept('POST', `/recommendations/${id}/upvote`).as('upVote')

      cy.get('[data-cy="upVote"]').click()

      cy.wait('@upVote')

      cy.get('[data-cy="score"]').should('have.text', '1')

      cy.getRecommendationByName(recommendation.name).then(({ score }) => {
        expect(score).to.equal(1)
      })
    })
  })
})
