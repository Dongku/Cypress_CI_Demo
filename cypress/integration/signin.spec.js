/// <reference types="Cypress" />

describe('Sign In Tests', function() {

    beforeEach( function() {
        cy.fixture('place_users.json').as('users') // loaded credentials from JSON, this should loaded before each tests.
        cy.home() // go to NotifyMe login page
    })
    
    afterEach( function() {
        //cy.signOut()
    })

    it('Sign In page should contain main components according to design', function() {

        // verify landing page components.
        cy.signInMainComponent()

    })

    it('Sign In with invalid email format should have validation message', function() {
        
        // list of invalid email address
        const invalidEmail = ['invalidemail.com','@email.com','invalid@.com','invalid@email']

        for ( let emailList of invalidEmail) {
            let email =  emailList
            cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
            .type(email)
            .should('have.value', email)

            // check validation
            cy.get('.MuiFormHelperText-root')
            .should('have.text', 'Invalid email address format') // validation message

            // clear input
            cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
            .clear()
        }

    })

    it('Sign In with email includes Leading/Trailing spaces should passed the validation', function() {
        
        // list of invalid email address
        const invalidEmail = [' valid@email.com','valid@email.com ',' valid@email.com ','  valid@email.com  ']

        for ( let emailList of invalidEmail) {
            let email =  emailList
            cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
            .type(email)
            .should('have.value', email)

            // check validation
            cy.get('.MuiFormHelperText-root')
            .should('not.have.text', 'Invalid email address format') // validation message

            // clear input
            cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
            .clear()
        }

    })

    it('Sign In with password less than 6 chars should have validation message', function() {

        // list of password less than 6 chars
        const minPassword= ['1','1a','1aB','1aB4','12345','abcde','ABCDE','Ac123']

        for ( let passwordList of minPassword) {
            let password =  passwordList
            cy.get('.justify-center > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input')
            .type(password)
            .should('have.value', password)

            // check validation
            cy.get('.MuiFormHelperText-root')
            .should('have.text', 'Password must be at least 6 characters long')

            // clear input
            cy.get('.justify-center > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input')
            .clear()
        }
    })

    it('Sign In with invalid Email/Password button should not active', function() {

        const email = getRandomString(10)
        const password = getRandomString(5)

        cy.signIn(email, password)

        // Submit button show default color
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('not.be.equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9
  
    })

    it('Sign In with incorrect credential should not success with alert warning', function() {

        const email = 'incorrect@email.com'
        const password = 'p@s$w0rd'

        cy.signIn(email, password)

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9

        cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').click()
        cy.get('.MuiSnackbarContent-message > .flex').should('contain.text','Sorry, we cannot find an account with that email and password')
        cy.get('.logo-icon').should('not.be.visible')
  
    })

    it('Sign In with existing user should success', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email
                let password = this.users.place[ObjKey].password
                cy.signIn(email, password)
            }
        }

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9

        // submit to Sign in
        cy.submitToSignIn()
        cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').should('not.be.visible')
        
        // sign out and go to home
        cy.signOut()
    })

    it('Sign In with UPPER case should not be treated as invalid account', function() {

        for (let ObjKey in this.users.place) {

                if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email_Upper // Upper case
                let password = this.users.place[ObjKey].password
                cy.signIn(email, password)
            }
        }

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9

        // submit to Sign in
        cy.submitToSignIn()
        cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').should('not.be.visible')
        
        // sign out and go to home
        cy.signOut()
  
    })

    it('Sign In with Camel case should not be treated as invalid account', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email_Camel // Camel case
                let password = this.users.place[ObjKey].password
                cy.signIn(email, password)
            }
        }

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9

        // submit to Sign in
        cy.submitToSignIn()
        cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').should('not.be.visible')
        
        // sign out and go to home
        cy.signOut()
  
    })

    it('Sign In after sign out if user clicks on back button it should redirect to login page', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email
                let password = this.users.place[ObjKey].password
                cy.signIn(email, password)
            }
        }

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9

        // submit to Sign in
        cy.submitToSignIn()
        cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').should('not.be.visible')

        // sign out and go to home
        cy.signOut()
        cy.go('back')
        cy.url().should('include', '/login') // stay at sign in page
  
    })

    it('Sign In redirect to Register should success', function() {

        cy.goToRegisterPage()
        cy.url().should('include', '/register')
  
    })

    it('Sign In redirect to Forgot Password should success', function() {

        cy.goToForgotPassword()
        cy.url().should('include', '/forgot')
  
    })

    it('(Stub 404 Error) - Request not found during user Sign In should display alert message error', function() {
        
        // start fake 404 error
        cy.server({
            method: 'POST',
            delay: 1000,
            status: 404,
            response: {}
        })
        
        // make sure page call route endpoint
        cy.route('/v1/login', {})

        // user sign in
        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email
                let password = this.users.place[ObjKey].password
                cy.signIn(email, password)
            }
        }

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9

        // submit to Sign in
        cy.submitToSignIn()

        // awaiting suscess alert popup
        cy.wait(2000)
        cy.get('.MuiSnackbarContent-message > .flex').should('contain.text','Something went wrong')
    
    })

    it('Sign In should stay SIGN IN (10s)', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email
                let password = this.users.place[ObjKey].password
                cy.signIn(email, password)
            }
        }

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9

        // submit to Sign in
        cy.submitToSignIn()
        cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').should('not.be.visible')
        cy.wait(10000)
        
        // sign out and go to home
        cy.signOut()
    })



//-------------- Application --------------//
//random number (0-1000)
const id = () => Cypress._.random(0, 1000)

//random string lenght [32]
function getRandomString(length) {
    var sRandom = '';
    do { sRandom += Math.random().toString(36).substr(2); } while (sRandom.length < length);
    sRandom = sRandom.toUpperCase().substr(0, length);
    return sRandom;
}


})
