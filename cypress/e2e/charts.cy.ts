describe('Chart crud', () => {
    before(() => {
        cy.visit('/')
        cy.contains('Entrar').click()
    })

    it('should create and delete chart', () => {
        cy.contains('New Chart').click()

        cy.get('input[placeholder="Nome"]').type('Teste E2E');

        cy.contains('Gráfico de Linha').click()

        cy.contains('Adicionar métricas no gráfico').parent().find('button').click();
        cy.contains('Adicionar métricas no gráfico').parent().find('button').click();

        cy.get('[data-testid="metric-section"]').within(() => {
            cy.contains('Fonte do gráfico 1')
                .parent()
                .within(() => {
                    cy.get('[role="combobox"]').click();
                });
        });

        cy.get('body').contains('[role="option"]', 'CTR').click();

        cy.get('[data-testid="metric-section"]').within(() => {
            cy.contains('Fonte do gráfico 2')
                .parent()
                .within(() => {
                    cy.get('[role="combobox"]').click();
                });
        });

        cy.get('body').contains('[role="option"]', 'Cliques').click();


        cy.contains('Período do Gráfico')
            .scrollIntoView();

        cy.contains('Período do Gráfico')
            .parent()
            .within(() => {
                cy.get('[role="combobox"]').first().click({ force: true });
            });

        cy.get('[role="option"]').contains('Mês').click({ force: true });

        cy.get('input[placeholder="Quantidade do Período"]').type('3');

        cy.contains('Granularidade do Gráfico').scrollIntoView();

        cy.contains('Granularidade do Gráfico')
            .parent()
            .within(() => {
                cy.get('[role="combobox"]').first().click({ force: true });
            });

        cy.get('[role="option"]').contains('Dia').click({ force: true });

        cy.contains('Adicionar dados no gráfico').parent().find('button').click();
        cy.contains('Adicionar dados no gráfico').parent().find('button').click();

        cy.get('[data-testid="source-section"]').within(() => {
            cy.contains('Fonte do gráfico 1')
                .parent()
                .within(() => {
                    cy.get('[role="combobox"]').click();
                });
        });

        cy.get('body').contains('[role="option"]', 'Campanha').click();

        cy.get('[data-testid="source-section"]').within(() => {
            cy.contains('Tabela de fonte 1')
                .parent()
                .within(() => {
                    cy.get('[role="combobox"]').click();
                });
        });

        cy.get('body')
            .find('[role="option"]')
            .filter(':visible')
            .last()
            .click();

        cy.get('[data-testid="source-section"]').within(() => {
            cy.contains('Fonte do gráfico 2')
                .parent()
                .within(() => {
                    cy.get('[role="combobox"]').click();
                });
        });

        cy.get('body').contains('[role="option"]', 'Anúncio').click();

        cy.get('[data-testid="source-section"]').within(() => {
            cy.contains('Tabela de fonte 2')
                .parent()
                .within(() => {
                    cy.get('[role="combobox"]').click();
                });
        });

        cy.get('body')
            .find('[role="option"]')
            .filter(':visible')
            .last()
            .click();

        cy.contains('Criar Gráfico').click();

        cy.contains('Gráfico criado com sucesso!').should('be.visible');

        cy.contains('Dashboard').click();
        cy.contains('Teste E2E').should('be.visible');

        cy.get('div[data-slot="card-title"]')
            .contains('Teste E2E')
            .parent()
            .parent()
            .within(() => {
                cy.contains('Ver mais').click();
            });

        cy.contains('Chart Details').should('be.visible');

        cy.contains('Apagar').click();

        cy.contains('Teste E2E').should('not.exist');
    })

})