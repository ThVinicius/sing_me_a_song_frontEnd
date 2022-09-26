beforeEach(() => {
  cy.resetDatabase()
})

describe('verifica se as recomendações estão sendo mostradas na top', () => {
  it('verifica se exibe as 10 recomendações ordenadas por votos', () => {
    cy.createTopTen().then(recommendations => {
      cy.visit('http://localhost:3000/')

      cy.intercept('GET', '/recommendations/top/10').as('getTop')

      cy.get('[data-cy="top"]').click()

      cy.url().should('equal', 'http://localhost:3000/top')

      cy.wait('@getTop')

      recommendations
        .reverse()
        .forEach(({ name }, index) =>
          cy.get(`[data-cy="top${10 - index}"]`).should('have.text', name)
        )
    })
  })
})
