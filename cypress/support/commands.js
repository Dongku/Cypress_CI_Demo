// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload'

const url = Cypress.env('base_url')

Cypress.Commands.add('home', () => {
    cy.request(Cypress.env('base_url'))
    cy.visit(Cypress.env('base_url'))
})

Cypress.Commands.add('register', () => {
    const url = Cypress.env('base_url')
    // visit register page
    cy.visit(url+'register')
    cy.url().should('include', 'register')
})

Cypress.Commands.add('signOut', () => {
    // cy.get('.MuiButton-label-994 > .material-icons').click()
    // cy.get('.MuiButton-label-697 > .material-icons').click()
    cy.contains('admin').click({force:true}) // this prevent dynamic object id
    cy.contains('Sign Out').click({force:true})
})

Cypress.Commands.add('signIn', (email,password) => {
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')
    .type(email)
    .should('have.value', email)

    cy.get('.justify-center > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input')
    .type(password)
    .should('have.value', password)
})

Cypress.Commands.add('submitToSignIn', () => {
    cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').click() //submit
    // cy.get('.logo-icon').should('be.visible')
})

Cypress.Commands.add('goToRegisterPage', () => {
    cy.get('.items-center > .MuiButtonBase-root > .MuiButton-label').click()
})

Cypress.Commands.add('goToSignInPageWithText', () => {
    cy.contains('Back to Sign In').click()
})

Cypress.Commands.add('goToSignInPageWithButton', () => {
    cy.get('.justify-center > .MuiButtonBase-root > .MuiButton-label').click()
})

Cypress.Commands.add('goToForgotPassword', () => {
    // visit forgot page
    cy.get('.justify-center > .text-center > .font-normal').click()
    // cy.visit(url+'forgot')
})

Cypress.Commands.add('signInMainComponent', () => {
    // left components
    cy.get('.flex-grow-0').should('be.visible')
    cy.contains('Sign In to NotifyMe')
    cy.contains('Notifications in Any Language')
    cy.contains('Our real-time notification delivery platform ensures your audience sees your message at the right time, at the right place and in their language.')
    
    // Righ components
    cy.contains('Sign in to your Place Portal to engage with your audience members')
    cy.get('.MuiCardContent-root > .MuiTypography-h6').should('have.text','Sign In')

    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input') // email field
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .material-icons') // email icon
    cy.contains('Your email address') // email placeholder

    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input') // password field
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .material-icons') // password icon
    cy.contains('Your password') // password placeholder

    cy.get('.MuiCardContent-root > div.w-full > .justify-center') // sign in button
    cy.contains('I forgot my password') // forgot password label
    cy.contains('Don’t have an account yet?') // sign up label
    cy.contains('Well, Sign Up') // sign up button

})

Cypress.Commands.add('signUpMainComponent', () => {
    // IYC main logo
    cy.get('.p-24 > :nth-child(1) > .flex-wrap > .justify-center').should('be.visible') // Logo
    cy.contains('Start engaging with your audience more effectively') // sign up title

    // Account detail components
    cy.contains('Account details') // account details
    cy.contains('Email address') // Place Email
    cy.contains('Create password') // Create Password
    cy.contains('Confirm password') // cCnfirm Password
    cy.contains('First name') // firstName
    cy.contains('Last name') // lastName
    cy.contains('Your mobile phone number') // placePhone

    // Account detail components
    cy.contains('Place details') //
    cy.contains('What kind of place are you?') // placeCategory
    cy.contains('Your place\'s name') // placeName
    cy.contains('Your place\'s address') // placeAddress
    cy.contains('Choose your plan') // selectPlan

    // submit button
    cy.get('.justify-around > :nth-child(14)').should('have.text', 'Create my account') // create account button

    // Accept Terms
    cy.contains('By creating an account, I agree to the Terms of Service and Privacy Policy') // TOU

    // bottom components
    cy.contains('Or') // devided section
    // cy.contains('Have an account already?') // verify text
    cy.contains('Sign In') // go to Sign In page

    // right components
    cy.contains('Join the list of amazing places using NotifyMe')
    cy.contains(/Features & Benefits/i)
    cy.contains('Higher Customer Engagement')
    cy.contains('Zero Language Barriers')
    cy.contains('It\'s Simple')
    cy.contains('Easy on Your Budget')
    cy.contains('Automatic Translation')
    cy.contains('Dynamic Groups')
    cy.contains('Spamless')
    cy.contains('Real-time Metrics')
    cy.contains('Proximity-based Notifications')
    cy.contains('Rich Attachments')
    cy.contains('More effective than SMS, Social Media and Email')

    // singup components
    // cy.contains('NotifyMe by IYC')
    // cy.contains('Business category') // placeCategory
    // cy.contains('PlaceType') // placeCategory -> removed
    // cy.contains('Place name') // placeName
    // cy.get('#placeName').invoke('attr','placeholder').should('equal', 'Place name') // placeName
    // cy.contains('Place address') // placeAddress
    // cy.contains('Your official email address') // placeEmail
    // cy.contains('Your mobile phone number') // placePhone
    // cy.contains('Your first name') // firstName
    // cy.contains('Your last name') // lastName
    // cy.contains('Your password') //choosePassword
    // cy.contains('Confirm your password') //confirmPassword
    // cy.contains('Free') // defaultPackage
    // cy.contains('Register, and get started') // register button
    // cy.contains('By clicking register, you agree to') // agree TOU
    // cy.contains('Terms of Service') // terms
    // cy.contains('Privacy Policy') // privacy
    // cy.contains('Already have an account?') // sign in label
    // cy.contains('Well, Sign In') // sign in button

})

Cypress.Commands.add('checkSignUpSubmitColorDisable', () => {
    cy.get('.MuiButton-containedSecondary').should('have.css', 'background-color').and('not.be.equal', 'rgb(0, 190, 217)') // mainly BLUE #00bed9
})

Cypress.Commands.add('checkSignUpSubmitColorEnable', () => {
    cy.get('.MuiButton-containedSecondary').should('have.css', 'background-color').and('be.equal', 'rgb(0, 190, 217)') // mainly BLUE #00bed9
})

Cypress.Commands.add('forgotPasswordMainComponent', () => {
    // left components
    cy.get('.w-128').should('be.visible')
    cy.get('.font-bold').should('have.text','Forgot Password')
    // cy.contains('Forgot Password')
    cy.contains('Notifications in Any Language')
    cy.contains('Enter your e-mail address to reset your password.')

    // Righ components
    cy.contains('Forgot Password?')
    cy.get('.MuiInputBase-input')
    cy.contains('Your email address')

})

Cypress.Commands.add('getAccessToken', () => {
    expect(localStorage.getItem('accessToken')).not.to.be.null
    expect(localStorage.getItem('refreshToken')).not.to.be.null
    expect(localStorage.getItem('expiresIn')).not.to.be.null
    expect(localStorage.getItem('expiresAt')).not.to.be.null
})

