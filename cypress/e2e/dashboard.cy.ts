describe('Dashboard page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Entrar').click()
    })

    it('should display the dashboard page', () => {
        cy.contains('Dashboard').should('be.visible')
    })

    it('should display the new chart button and go to the create chart page', () => {
        cy.contains('New Chart').click()
        cy.url().should('include', 'revforce/dashboard/newchart')
        cy.contains('Novo Gráfico').should('be.visible')
    })

    it('should display the settings button', function () {
        cy.contains('Settings').click()
        cy.url().should('include', 'revforce/settings')
        cy.contains('Configurações de integração').should('be.visible')
    });

    it('should display the exit button', function () {
        cy.contains('Exit').click()
        cy.url().should('include', '/')
        cy.contains('REVFORCE').should('be.visible')
    });

})