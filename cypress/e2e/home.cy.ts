describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the home page', () => {
    cy.contains('REVFORCE').should('be.visible')
  })

  it('should display the enter button and go to the dashboard page', () => {
    cy.contains('Entrar').click()
    cy.url().should('include', 'revforce/dashboard')
    cy.contains('Dashboard').should('be.visible')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('account_id')).not.to.be.null
    })
  })
})