describe('Event crud', () => {
    before(() => {
        cy.visit('/')
        cy.contains('Entrar').click()

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
    })

    it('should create event', () => {
        cy.contains('Eventos').click()

        cy.contains('Novo Evento').click()

        cy.get('input[placeholder="Nome"]').type('Evento E2E');

        cy.get('textarea[placeholder="Descrição"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium dolor justo, eu ultrices metus scelerisque vel. Ut tellus turpis, vulputate nec nisi non, malesuada sodales leo. Interdum et malesuada fames ac ante ipsum primis in faucibus.');

        cy.contains('Data').click()

        cy.get('[role="gridcell"]')
            .contains(/^15$/)
            .click();

        cy.contains('Confirmar').click()

        cy.get('button').contains('Criar').click();

        cy.contains('Evento criado com sucesso!').should('be.visible');

        cy.contains('Evento E2E').should('be.visible');

        cy.get('button[title="Editar"]').first().click();

        cy.get('input[placeholder="Nome"]').type('Evento E2E Editado');

        cy.get('textarea[placeholder="Descrição"]').type(' EDITADO');

        cy.get('button').contains('Salvar').click();

        cy.contains('Evento atualizado com sucesso!').should('be.visible');

        cy.contains('Evento E2E Editado').should('be.visible');

        cy.get('button[title="Excluir"]').first().click();

        cy.contains('Evento E2E Editado').should('not.exist');
    })

    after(() => {
        cy.contains('Apagar').click();

        cy.contains('Teste E2E').should('not.exist');
    })
})