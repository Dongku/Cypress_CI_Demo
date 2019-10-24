/// <reference types="Cypress" />

// config base url
const url = Cypress.env('base_url')

describe('Anonymous Tests', function() {

    beforeEach( function() {
        // cy.fixture('place_users.json').as('users') // loaded credentials from JSON, this should loaded before each tests.
    })
    
    afterEach( function() {
        //cy.signOut()
    })

    it('Visit /login', function() {

        // visit login page
        cy.visit(url+'login')
        cy.url().should('include', '/login')

    })

    it('Visit /register', function() {

        // visit register page
        cy.visit(url+'register')
        cy.url().should('include', '/register')

    })

    it('Visit /forgot', function() {

        // visit forgot page
        cy.visit(url+'forgot')
        cy.url().should('include', '/forgot')

    })

    it('Visit /resetpassword', function() {

        // visit resetpassword page
        cy.visit(url+'resetpassword')
        cy.url().should('include', '/resetpassword')

    })

    it('Visit /notification-timeline', function() {

        // visit notification-timeline page
        cy.visit(url+'profile/notification-timeline')
        cy.url().should('include', '/login')

    })

    it('Visit /profile/profile-info', function() {

        // visit profile-info page
        cy.visit(url+'profile/profile-info')
        cy.url().should('include', '/login')

    })

    it('Visit /groups', function() {

        // visit groups page
        cy.visit(url+'groups')
        cy.url().should('include', '/login')

    })

    it('Visit /beacons/manage', function() {

        // visit groups page
        cy.visit(url+'beacons/manage')
        cy.url().should('include', '/login')

    })

    it('Visit /beacon/notification', function() {

        // visit groups page
        cy.visit(url+'beacons/notification')
        cy.url().should('include', '/login')

    })

    it('Visit /settings/team-members', function() {

        // visit groups page
        cy.visit(url+'settings/team-members')
        cy.url().should('include', '/login')

    })


//-------------- Application --------------//


})
