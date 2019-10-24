/// <reference types="Cypress" />

describe('Clear Local Storage Token', function() {

    beforeEach( function() {
        cy.fixture('place_users.json').as('users') // loaded credentials from JSON, this should loaded before each tests.
        cy.home()        

    })
  
    afterEach( function() {
        // cy.signOut()
    })

    // Although local storage is automatically cleared
    // in between tests to maintain a clean state
    // sometimes we need to clear the local storage manually
    // make sure that LS loaded before clear

    it('clearLocalStorage() - clear accessToken data in local storage', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('accessToken').should((ls) => {
            expect(ls.getItem('accessToken')).to.be.null //expected null
            expect(ls.getItem('refreshToken')).not.to.be.null
            expect(ls.getItem('expiresIn')).not.to.be.null
            expect(ls.getItem('expiresAt')).not.to.be.null
        })
    })

    it('clearLocalStorage() - clear refreshToken data in local storage', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('refreshToken').should((ls) => {
            expect(ls.getItem('accessToken')).not.to.be.null
            expect(ls.getItem('refreshToken')).to.be.null //expected null
            expect(ls.getItem('expiresIn')).not.to.be.null
            expect(ls.getItem('expiresAt')).not.to.be.null
        })
    })

    it('clearLocalStorage() - clear expiresIn data in local storage', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('expiresIn').should((ls) => {
            expect(ls.getItem('accessToken')).not.to.be.null
            expect(ls.getItem('refreshToken')).not.to.be.null
            expect(ls.getItem('expiresIn')).to.be.null //expected null
            expect(ls.getItem('expiresAt')).not.to.be.null
        })
    })

    it('clearLocalStorage() - clear expiresAt data in local storage', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('expiresAt').should((ls) => {
            expect(ls.getItem('accessToken')).not.to.be.null
            expect(ls.getItem('refreshToken')).not.to.be.null
            expect(ls.getItem('expiresIn')).not.to.be.null
            expect(ls.getItem('expiresAt')).to.be.null //expected null
        })
    })

    it('clearLocalStorage() - clear all data in local storage', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage().should((ls) => {
            expect(ls.getItem('accessToken')).to.be.null
            expect(ls.getItem('refreshToken')).to.be.null
            expect(ls.getItem('expiresIn')).to.be.null
            expect(ls.getItem('expiresAt')).to.be.null
        })
    })

    it('clearLocalStorage() - clear accessToken data then refresh page, user should take to home()', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('accessToken').should((ls) => {
            expect(ls.getItem('accessToken')).to.be.null
            expect(ls.getItem('refreshToken')).not.to.be.null
            expect(ls.getItem('expiresIn')).not.to.be.null
            expect(ls.getItem('expiresAt')).not.to.be.null
        })

        // visit notification-timeline page
        cy.reload()
        cy.url().should('include', '/login')

    })

    it('clearLocalStorage() - clear refreshToken data then refresh page, user should take to home()', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('refreshToken').should((ls) => {
            expect(ls.getItem('accessToken')).not.to.be.null
            expect(ls.getItem('refreshToken')).to.be.null
            expect(ls.getItem('expiresIn')).not.to.be.null
            expect(ls.getItem('expiresAt')).not.to.be.null
        })

        // visit notification-timeline page
        cy.reload()
        cy.url().should('include', '/login')

    })

    it('clearLocalStorage() - clear expiresIn data then refresh page, user should take to home()', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('expiresIn').should((ls) => {
            expect(ls.getItem('accessToken')).not.to.be.null
            expect(ls.getItem('refreshToken')).not.to.be.null
            expect(ls.getItem('expiresIn')).to.be.null
            expect(ls.getItem('expiresAt')).not.to.be.null
        })

        // visit notification-timeline page
        cy.reload()
        cy.url().should('include', '/login')

    })

    it('clearLocalStorage() - clear expiresAt data then refresh page, user should take to home()', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.get('.logo-icon').should('be.visible')

        // clearLocalStorage() yields the localStorage object
        cy.clearLocalStorage('expiresAt').should((ls) => {
            expect(ls.getItem('accessToken')).not.to.be.null
            expect(ls.getItem('refreshToken')).not.to.be.null
            expect(ls.getItem('expiresIn')).not.to.be.null
            expect(ls.getItem('expiresAt')).to.be.null
        })

        // visit notification-timeline page
        cy.reload()
        cy.url().should('include', '/login')

    })

    it('accessToken() - reload page should only get new accessToken', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
              let email = this.users.place[ObjKey].email
              let password = this.users.place[ObjKey].password
              cy.signIn(email, password)
            }
        }
        // submit
        cy.submitToSignIn()
        cy.wait(3000)
        cy.get('.logo-icon').should('be.visible')

        cy.getAccessToken().should(() => {
            // get auth Token from LS
            const accessTokenBefore = localStorage.getItem('accessToken')
            const refreshTokenBefore = localStorage.getItem('refreshToken')

            // visit notification-timeline page
            cy.reload()
            cy.url().should('include', '/notification-timeline')
            cy.wait(5000)

            // compare only accessToken should be updated
            cy.getAccessToken().should(() => {

                expect(localStorage.getItem('accessToken')).not.to.be.eq(accessTokenBefore)
                expect(localStorage.getItem('refreshToken')).to.be.eq(refreshTokenBefore)

            })
        })
    })

})