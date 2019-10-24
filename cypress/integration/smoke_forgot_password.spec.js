/// <reference types="Cypress" />

describe('Forgot Password Tests', function() {

    beforeEach( function() {
        cy.fixture('place_users.json').as('users') // loaded credentials from JSON, this should loaded before each tests.
        cy.home()
        cy.goToForgotPassword().url().should('include', '/forgot')
    })
    
    afterEach( function() {
        //cy.signOut()
    })

    it.skip('Check request /forgot/reset endpoint', function() {

        // prepare test account
        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email

                // request endpoint
                const requestUrl = Cypress.env('base_endpoint')+'/forgot/reset'

                // check http request status
                cy.request('POST', requestUrl, {email: email})
                .should((response) => {
                    expect(response.status).to.equal(200)
                })
            }
        }

    })

    it('Forgot Password page should contain main components according to design', function() {

        // verify landing page components.
        cy.forgotPasswordMainComponent()

    })

    it('Forgot Password with Invalid Email format should have validation message', function() {
        
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

    it('Forgot Password with Invalid Email button should not active', function() {

        const email = getRandomString(10)

        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
        .type(email)
        .should('have.value', email)

        // Submit button show default color
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('not.be.equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9
  
    })

    it('Forgot Password with Valid Email format button should active', function() {

        const email = 'valid@email.com'

        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
        .type(email)
        .should('have.value', email)

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9
  
    })

    it('Forgot Password with Valid Email should success', function() {

        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'Hybrid'){
                let email = this.users.place[ObjKey].email
                // let password = this.users.place[ObjKey].password
                cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
                .type(email)
                .should('have.value', email)
            }
        }

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9
        // click on Reset Password
        cy.get('.MuiButton-label').click()
        // awaiting suscess alert popup
        cy.get('.MuiSnackbarContent-message > .flex').should('contain.text','We have e-mailed your password reset link!')

    })

    it('Forgot Password page redirect to Sign In page should success', function() {

        cy.goToSignInPageWithText()
        .url().should('include', '/login')
  
    })

    it('(Stub 404 Error) - Request not found error should display alert message error', function() {
        
        // start fake 404 error
        cy.server({
            method: 'POST',
            delay: 1000,
            status: 404,
            response: {}
        })
        
        // make sure page call route endpoint
        cy.route('/v1/forgot/reset', {})

        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
        .type('valid@email.com')
        .should('have.value', 'valid@email.com')

        // Submit button changed color (Active)
        cy.get('.MuiButton-containedPrimary').should('have.css', 'background-color').and('equal', 'rgb(15, 48, 64)') // mainly BLUE #00BED9
        // click on Reset Password
        cy.get('.MuiButton-label').click()
        // awaiting suscess alert popup
        cy.get('.MuiSnackbarContent-message > .flex').should('contain.text','Something went wrong')
    
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
