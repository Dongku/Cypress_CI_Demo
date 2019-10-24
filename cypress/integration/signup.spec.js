/// <reference types="Cypress" />

describe('Sign Up Tests', function() {

    // Cypress.env('RETRIES', 2)

    beforeEach( function() {
        cy.fixture('place_users.json').as('users') // loaded credentials from JSON, this should loaded before each tests.
        cy.fixture('write_Categories.json').as('category') // loaded categories from JSON.
        cy.fixture('place_type.json').as('place') // loaded place tpye from JSON.
        cy.register()
    
    })
    
    afterEach( function() {
        //cy.signOut()
    })

    it('Sign Up page should contain main components', function() {

        // verify landing page components.
        cy.signUpMainComponent()

    })

    it.skip('Sign Up page should contain randon 6 amazing places', function() {

        // Amazing places should contains
        cy.get('.jss180').should('be.visible')
        cy.get('[alt]').should('have.length', 6).should('be.visible')

    })

    it('Get data /categories endpoint', function() {

        // get all categories list
        const requestUrl = Cypress.env('base_endpoint')+'/categories?limit=100&page=1'

        // check http request status
        cy.request(requestUrl)
        .should((response) => {
            expect(response.status).to.eq(200)
        })

        // write response to a specific file
        cy.request('GET',requestUrl)
        .then((response) => {
            cy.writeFile('cypress/fixtures/write_Categories.json', response.body)
        })

        // check property 'name' should exist
        cy.fixture('write_Categories').should((categories) => {
            expect(categories.data[0].name).to.exist
        })

    })

    it('Sign Up with invalid email format should have validation message', function() {
        
        // list of invalid email address
        const invalidEmail = ['invalidemail.com','@email.com','invalid@.com','invalid@email']

        for ( let emailList of invalidEmail) {
            let email =  emailList

            // type email input
            cy.get('[name="email"]')
            // cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
            .type(email)
            .should('have.value', email)

            // check validation
            // cy.get('.MuiFormHelperText-root')
            cy.get('.Mui-error.MuiFormHelperText-filled.Mui-required')
            .should('have.text', 'Invalid email address format') // validation message

            // clear input
            cy.get('[name="email"]')
            // cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
            .clear()
        }

    })

    it('Sign Up with invalid email format (include special chars) should have validation message', function() {
        
        // list of invalid email address
        const invalidEmail = ['!#$?*”(),:;<>[\]@example.com']

        for ( let emailList of invalidEmail) {
            let email =  emailList

            // type email input
            cy.get('[name="email"]')
            // cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
            .type(email)
            .should('have.value', email)

            // check validation
            // cy.get('.MuiFormHelperText-root')
            cy.get('.Mui-error.MuiFormHelperText-filled.Mui-required')
            .should('have.text', 'Invalid email address format') // validation message

            // clear input
            cy.get('[name="email"]')
            // cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
            .clear()
        }

    })

    it('Sign Up with password less than 6 chars should have validation message', function() {

        // list of password less than 6 chars
        const minPassword= ['1','1a','1aB','1aB4','12345','abcde','ABCDE','Ac123']

        for ( let passwordList of minPassword) {
            let password =  passwordList
            cy.get('[name="password"]')
            // cy.get(':nth-child(9) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
            .type(password)
            .should('have.value', password)

            // check validation
            cy.get('.Mui-error.MuiFormHelperText-filled.Mui-required')
            // cy.get('.MuiFormHelperText-root')
            .should('have.text', 'Password must be at least 6 characters long')

            cy.get('[name="password"]')
            // cy.get(':nth-child(9) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
            .clear()
        }
    })

    it('Sign Up with password more than 40 chars should have validation message', function() {

        // list of password more than 40 chars
        const maxPassword = getRandomString(41);

        cy.get('[name="password"]')
        // cy.get(':nth-child(9) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type(maxPassword)
        .should('have.value', maxPassword)

        // check validation
        cy.get('.Mui-error.MuiFormHelperText-filled.Mui-required')
        // cy.get('.MuiFormHelperText-root')
        .should('have.text', 'Password must be less than 40 characters long')

    })

    it('Sign Up if confirm password does not match it should have validation message', function() {

        // list of password less than 6 chars
        const password = 'p@s$w0rd'
        const confirmPassword = 'password'

        cy.get('[name="password"]')
        // cy.get(':nth-child(9) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type(password)
        .should('have.value', password)

        cy.get('[name="confirmPassword"]')
        // cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type(confirmPassword)
        .should('have.value', confirmPassword)

        // check validation password not match
        cy.get('.Mui-error.MuiFormHelperText-filled.Mui-required')
        // cy.get('.MuiFormHelperText-root')
        .should('have.text', 'Confirm password is not matched')

    })

    it('Sign Up if confirm password is matched it should not have validation message', function() {

        // list of password less than 6 chars
        const password = 'p@s$w0rd'
        const confirmPassword = 'p@s$w0rd'

        cy.get('[name="password"]')
        // cy.get(':nth-child(9) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type(password)
        .should('have.value', password)

        cy.get('[name="confirmPassword"]')
        // cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type(confirmPassword)
        .should('have.value', confirmPassword)

        // check validation password not match
        cy.get('.Mui-error.MuiFormHelperText-filled.Mui-required')
        // cy.get('.MuiFormHelperText-root')
        .should('not.have.text', 'Confirm password is not matched')

    })

    it('Sign Up First/Last name input fields should allow spaces', function() {
        
        // target country code to be changed
        const firstName = 'first space'
        const lastName = 'last space'

        // first name field
        cy.get('[name="firstName"]')
        // cy.get(':nth-child(7) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type(firstName).should('have.value', firstName)

        // last name field
        cy.get('[name="lastName"]')
        // cy.get(':nth-child(8) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .type(lastName).should('have.value', lastName)
        
    })

    it('Sign Up should detect local country code (TH)', function() {
        
        // set local location in Thai
        const flagCheck = 'Thailand'
        const countryCode = '+66'

        // check flag select function
        cy.get('.selected-flag').click()
        // check local flag
        cy.get('.highlight > .country-name').should('have.text', flagCheck)
        // check contry code
        cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .should('have.value', countryCode)

    })

    it('Sign Up user is able to change country code', function() {
        
        // target country code to be changed
        const flagCheck = 'Hong kong'
        const countryCode = '+852'

        // check flag select function
        cy.get('.selected-flag').click()
        // go to search
        cy.get('#search-box').type(flagCheck)
        // select matched country code
        cy.get('.country-name').click()
        // check contry code
        cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .should('have.value', countryCode)
        
    })

    it('Sign Up with invalid Phone Number format should have validation message', function() {
        
        // set local location in Thai
        const flagCheck = 'Thailand'
        const countryCode = '+66'
        const invalidPhone = '123456'

        // check flag select function
        cy.get('.selected-flag').click()
        // check local flag
        cy.get('.highlight > .country-name').should('have.text', flagCheck)
        // check contry code
        cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
        .should('have.value', countryCode)
        // enter phone number
        cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type(invalidPhone)
        // check validate phone number
        cy.get('.Mui-error.MuiFormHelperText-filled')
        .should('have.text', 'You have to type valid phone number') // validation message

    })

    it.skip('Sign Up Place categories should be available for select', function() {

        // loop all categories list
        for (let ObjKey in this.category.data) {

            let getCategory = this.category.data[ObjKey].name

            // User clicks to select category
            // cy.get('.justify-around > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').click()
            cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').click()

            // react-list using focus to select from li
            cy.get('.MuiPaper-root > .MuiList-root').focus().contains(getCategory).click()
            // cy.get('.MuiPaper-root > .MuiList-root').focus().contains(getCategory).click()

            // check matched select
            cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').should('have.include.text', getCategory)
            // cy.get('.justify-around > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').should('have.include.text', getCategory)
        }

    })

    it('Sign Up with Unverified place name should not get Autocomplete list', function() {

        cy.get('#name').type('place not found').should('contain.value','place not found')
        // do not suggess address from Google
        // cy.get(':nth-child(12) > .MuiFormControl-root > .MuiInputBase-root').should('not.contain.text','place not found') // expected no text before location_on
        cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > [aria-invalid="false"]').should('be.empty')

    })

    it.skip('Sign Up with Verified place name should get Autocomplete list', function() {

        // enter place name
        cy.get('#name').type('If You Can', {delay:100})
        // select Autocomplete from list
        cy.get(':nth-child(2) > .MuiPaper-root > :nth-child(1)').click({force: true})
        // get full place name
        cy.get('#name').should('have.contain.value','If You Can')
        // do Autocomplete address from Google        
        // cy.get(':nth-child(12) > .MuiFormControl-root > .MuiInputBase-root').should('contain.text','10110') // expected no text before location_on
        cy.get(':nth-child(12) > .MuiFormControl-root > .MuiInputBase-root').should('not.be.empty')

    })

    it.skip('Sign Up with email already exists (duplicated) in system should not allowed', function() {

        // prepare register email and password
        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'exists'){
                let email = this.users.place[ObjKey].email
                let password = this.users.place[ObjKey].password
                let confirmPassword = this.users.place[ObjKey].password
                let getFirstName = this.users.place[ObjKey].firstName
                let getLastName = this.users.place[ObjKey].lastName
                let getCategory = this.users.place[ObjKey].category
                let getPlace = this.users.place[ObjKey].placeName
                let getCountryCode = this.users.place[ObjKey].countryCode
                let getCountry = this.users.place[ObjKey].country
                let getPhone = this.users.place[ObjKey].phoneNumber

                // enter Email that already exists in the system
                cy.get('[name="email"]')
                .type(email)
                .should('have.value', email)
                cy.checkSignUpSubmitColorDisable()

                // enter password and confirm password
                cy.get('[name="password"]')
                .type(password)
                .should('have.value', password)
                cy.checkSignUpSubmitColorDisable()
        
                cy.get('[name="confirmPassword"]')
                .type(confirmPassword)
                .should('have.value', confirmPassword)
                cy.checkSignUpSubmitColorDisable()

                // Enter First name and Last name
                cy.get('[name="firstName"]')
                .type(getFirstName).should('have.value', getFirstName)
                cy.checkSignUpSubmitColorDisable()

                cy.get('[name="lastName"]')
                .type(getLastName).should('have.value', getLastName)
                cy.checkSignUpSubmitColorDisable()

                // check flag select function
                cy.get('.selected-flag').click()
                // check local flag
                cy.get('.highlight > .country-name').should('have.text', getCountry)
                // check contry code
                cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
                .should('have.value', getCountryCode)
                // enter phone number
                cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type(getPhone)
                cy.checkSignUpSubmitColorDisable()

                // select Category
                cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').click()
                cy.get('.MuiPaper-root > .MuiList-root').focus().contains(getCategory).click()
                cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').should('have.include.text', getCategory)
                cy.checkSignUpSubmitColorDisable()

                // enter place name
                cy.get('#name').type(getPlace)
                cy.get(':nth-child(2) > .MuiPaper-root > :nth-child(1)').click()
                cy.get('#name').should('include.value', getPlace)
                cy.wait(2000)
                cy.checkSignUpSubmitColorDisable()

                // select Free plan
                cy.get(':nth-child(13) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').click()
                // cy.get('[data-value="m-basic_small_bronze"] > .flex > :nth-child(2)').click()
                cy.get('[data-value="free"] > .flex > :nth-child(2)').click()
                cy.checkSignUpSubmitColorEnable()

                // submit
                cy.get(':nth-child(14) > .MuiButtonBase-root > .MuiButton-label').click()

                // Exoected result -> show error email already exists 
                // cy.get('.MuiSnackbarContent-message > .flex').should('contain.text', 'Email already exist')

                // check validate Exist email
                cy.get('.Mui-error.MuiFormHelperText-filled.Mui-focused.Mui-required')
                .should('have.text', 'This email already exists') // validation message
            }
        }

    })

    it('Sign Up with Non-Corporate (Free Email) system should alert warns messages', function() {

        // prepare register email and password
        for (let ObjKey in this.users.place) {

            if ( this.users.place[ObjKey].place_type == 'non-corporate'){
                let email = this.users.place[ObjKey].email
                let password = this.users.place[ObjKey].password
                let confirmPassword = this.users.place[ObjKey].password
                let getFirstName = this.users.place[ObjKey].firstName
                let getLastName = this.users.place[ObjKey].lastName
                let getCategory = this.users.place[ObjKey].category
                let getPlace = this.users.place[ObjKey].placeName
                let getCountryCode = this.users.place[ObjKey].countryCode
                let getCountry = this.users.place[ObjKey].country
                let getPhone = this.users.place[ObjKey].phoneNumber

                // enter Email that already exists in the system
                cy.get('[name="email"]')
                .type(email)
                .should('have.value', email)
                cy.checkSignUpSubmitColorDisable()

                // enter password and confirm password
                cy.get('[name="password"]')
                .type(password)
                .should('have.value', password)
                cy.checkSignUpSubmitColorDisable()
        
                cy.get('[name="confirmPassword"]')
                .type(confirmPassword)
                .should('have.value', confirmPassword)
                cy.checkSignUpSubmitColorDisable()

                // Enter First name and Last name
                cy.get('[name="firstName"]')
                .type(getFirstName).should('have.value', getFirstName)
                cy.checkSignUpSubmitColorDisable()

                cy.get('[name="lastName"]')
                .type(getLastName).should('have.value', getLastName)
                cy.checkSignUpSubmitColorDisable()

                // check flag select function
                cy.get('.selected-flag').click()
                // check local flag
                cy.get('.highlight > .country-name').should('have.text', getCountry)
                // check contry code
                cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
                .should('have.value', getCountryCode)
                // enter phone number
                cy.get('.react-tel-input > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type(getPhone)
                cy.checkSignUpSubmitColorDisable()

                // select Category
                cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').click()
                cy.get('.MuiPaper-root > .MuiList-root').focus().contains(getCategory).click()
                cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').should('have.include.text', getCategory)
                cy.checkSignUpSubmitColorDisable()

                // enter place name
                cy.get('#name').type(getPlace)
                cy.get(':nth-child(2) > .MuiPaper-root > :nth-child(1)').click()
                cy.get('#name').should('include.value', getPlace)
                cy.wait(2000)
                cy.checkSignUpSubmitColorDisable()

                // select Free plan
                cy.get(':nth-child(13) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').click()
                // cy.get('[data-value="m-basic_small_bronze"] > .flex > :nth-child(2)').click()
                cy.get('[data-value="free"] > .flex > :nth-child(2)').click()
                cy.checkSignUpSubmitColorEnable()

                // submit
                cy.get(':nth-child(14) > .MuiButtonBase-root > .MuiButton-label').click()

                // get alert dialog for using Free Email
                cy.get('#alert-dialog-title > .MuiTypography-root').should('have.text','Using free email address')
                cy.get('#alert-dialog-description')
                .should('have.text','Your email address, '+email+', is a \nfree email address. \nWhile we do allow this, \nwe strongly recommend using a corporate or organizational email address.')
                cy.get('.MuiDialogActions-root > :nth-child(1) > .MuiButton-label').should('have.text','Fix it') // fix it button
                cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').should('have.text','Register anyway') // register anyway button

                // click "Fix It" the dialog should be dismissed
                cy.get('.MuiDialogActions-root > :nth-child(1) > .MuiButton-label').click().wait(2000)
                cy.get('#alert-dialog-title > .MuiTypography-root').should('not.be.visible')
            }
        }

    })

    it('Sign Up redirect to Sign In should success', function() {

        cy.goToSignInPageWithButton()
        cy.url().should('include', '/login')
  
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
