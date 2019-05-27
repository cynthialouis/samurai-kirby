// https://docs.cypress.io/api/introduction/api.html

describe('My First Samurai Kirby-like Game', () => {
    beforeEach(() => {
        cy.server()
        cy.route({
            url: '**/socket.io/**',
            method: 'GET',
            status: 200,
            response: {},
        }).as('socket_io_get')

        cy.route({
            url: '**/socket.io/**',
            method: 'POST',
            status: 200,
            response: {},
        }).as('socket_io_post')

        cy.visit('/')

    })

    it('Check the page structure', () => {
        // HEADER
        cy.get('[data-context=header-title]').should('be.visible').should('contain', 'Samurai Kirby-like Game')
        cy.get('[data-context=header-avatar]').should('not.be.visible')

        // RULES ON FRONT PAGE
        cy.get('[data-context=rules]').should('be.visible').find('div').should('have.length', 3)
        cy.get('[data-context=rules] div').eq(0).should('contain', 'Press any key immediately when the exclamation mark pops up.')
        cy.get('[data-context=rules] div').eq(1).should('contain', 'If successful, you win.')
        cy.get('[data-context=rules] div').eq(2).should('contain', "If not, you're dead on spot.")
        cy.get('[data-context=play-button]')
            .should('be.visible')
            .should('contain', 'PLAY')

        // FOOTER
        cy.get('[data-context=footer-text]').should('be.visible').should('contain', 'Made with <3 by Cynthia')
    })

    it('Registers to play as first player', () => {
        // PLAY BUTTON
        cy.route({
            url: '**/items/save-player',
            method: 'POST',
            status: 200,
            response: { id: 1 },
        }).as('save_first_player')

        cy.get('[data-context=play-button]')
            .should('contain', 'PLAY')
            .click()
        cy.wait('@save_first_player')

        // LOADING PLAYER TEXT
        cy.get('[data-context=welcoming-player]')
            .should('be.visible')
            .find('div').as('welcoming-text')
            .should('have.length', 2)
            cy.get('@welcoming-text').eq(0).should('contain', 'Welcome Player 1')
            cy.get('@welcoming-text').eq(1).should('contain', '... waiting for Player 2')
    })

    it('Registers to play as second player', () => {
        // PLAY BUTTON
        cy.route({
            url: '**/items/save-player',
            method: 'POST',
            status: 200,
            response: { id: 2 },
        }).as('save_second_player')

        cy.get('[data-context=play-button]')
            .should('contain', 'PLAY')
            .click()
        cy.wait('@save_second_player')

        // LOADING PLAYER TEXT
        cy.get('[data-context=welcoming-player]')
            .should('be.visible')
            .find('div').as('welcoming-text')
            .should('have.length', 2)
        cy.get('@welcoming-text').eq(0).should('contain', 'Welcome Player 2')
        cy.get('@welcoming-text').eq(1).should('contain', '... Ready to play ?')

        cy.wait('@socket_io_post')
    })
})
