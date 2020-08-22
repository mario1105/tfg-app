describe('End to end tests', () => {
    beforeEach(() => {
        cy.exec('cp testing-db-data.json testing-db.json')
    })
    describe('Admin pathway', () => {
        describe('Login', () => {
            const validUser = {
                email: 'test@admin.com',
                password: 'test123',
            }
            const invalidUser = {
                email: 'invalid@email.com',
                password: 'invalid123'
            }

            beforeEach(() => {
                cy.visit('http://localhost:3000/login')
            })

            it('renders the Login elements', () => {
                cy.get('div[data-test-id=login-form-error]').should('not.exist')
                cy.get('h5[data-test-id=login-form-header]').contains('Login')
                cy.get('label').contains('Email address')
                cy.get('label').contains('Password')
                cy.get('button[data-test-id=login-form-sign-in-button]').contains('Sign in')
            })
            it('can not submit an invalid form (both invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(invalidUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(invalidUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can not submit an invalid form (email invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(invalidUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can not submit an invalid form (password invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(invalidUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can submit a valid form', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.url().should('include', '/dashboard')
            })
        })
        describe('Dashboard', () => {
            const validUser = {
                email: 'test@admin.com',
                password: 'test123',
                name: 'Test'
            }
            beforeEach(() => {
                cy.visit('http://localhost:3000/testing-bypass-dashboard/admin')
            })
            it('renders the Dashboard elements', () => {
                cy.contains(`Welcome ${validUser.name}!`)
                cy.get('button[data-test-id=dashboard-employees-button]').contains('Employee list')
                cy.get('button[data-test-id=dashboard-register-button]').contains('Register')
                cy.get('button[data-test-id=dashboard-logout-button]').contains('Logout')
            })
            it('can visit the employees page', () => {
                cy.get('button[data-test-id=dashboard-employees-button]').click()
                cy.url().should('include', '/employees')
            })
            it('can visit the register page', () => {
                cy.get('button[data-test-id=dashboard-register-button]').click()
                cy.url().should('include', '/register')
            })
            it('can logout', () => {
                cy.get('button[data-test-id=dashboard-logout-button]').click()
                cy.url().should('include', '/login')
            })
        })
        describe('Employees', () => {
            const employees = [
                {
                    id: 1,
                    firstName: 'Mario',
                    lastName: 'Jimenez',
                    email: 'mario@gmail.com',
                    dateOfBirth: '11/05/1995',
                    mobilePhone: '666555444',
                    salary: '355000'
                },
                {
                    id: 2,
                    firstName: 'Test',
                    lastName: 'E2E',
                    email: 'e2e@testing.com',
                    dateOfBirth: '11/11/1991',
                    mobilePhone: '611666116',
                    salary: '50000',
                }
            ]

            beforeEach(() => {
                cy.visit('http://localhost:3000/testing-bypass-employees/admin')
            })
            it('renders the Employee List elements', () => {
                cy.get('p[data-test-id=table-header-first-name]').contains('First Name')
                cy.get('p[data-test-id=table-header-last-name]').contains('Last Name')
                cy.get('p[data-test-id=table-header-email]').contains('Email')
                cy.get('p[data-test-id=table-header-date-of-birth]').contains('Date of Birth')
                cy.get('p[data-test-id=table-header-mobile-phone]').contains('Mobile Phone')
                cy.get('p[data-test-id=table-header-salary]').contains('Salary')
                cy.get('p[data-test-id=table-header-actions]').contains('Actions')

                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-first-name]`).contains(employees[0].firstName)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-last-name]`).contains(employees[0].lastName)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-email]`).contains(employees[0].email)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-date-of-birth]`).contains(employees[0].dateOfBirth)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-mobile-phone]`).contains(employees[0].mobilePhone)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-salary]`).contains(`${employees[0].salary}€`)
                cy.get(`button[data-test-id=employees-list-item-${employees[0].id}-edit]`).contains('Edit')
                cy.get(`button[data-test-id=employees-list-item-${employees[0].id}-remove]`).contains('Remove')

                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-first-name]`).contains(employees[1].firstName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-last-name]`).contains(employees[1].lastName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-email]`).contains(employees[1].email)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-date-of-birth]`).contains(employees[1].dateOfBirth)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-mobile-phone]`).contains(employees[1].mobilePhone)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-salary]`).contains(`${employees[1].salary}€`)
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-edit]`).contains('Edit')
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-remove]`).contains('Remove')
            })
            it('can edit an employee', () => {
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-edit]`).click()

                cy.get('input[name=email]').clear()
                cy.get(`div[data-test-id=employees-list-item-${employees[1].id}-email-input]`).type('changed@email.com')
                cy.get('input[name=mobilePhone]').clear()
                cy.get(`div[data-test-id=employees-list-item-${employees[1].id}-mobile-phone-input]`).type('666666666')
                cy.get('input[name=salary]').clear()
                cy.get(`div[data-test-id=employees-list-item-${employees[1].id}-salary-input]`).type('11111')

                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-submit]`).click()

                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-email]`).contains('changed@email.com')
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-mobile-phone]`).contains('666666666')
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-salary]`).contains('11111€')
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-first-name]`).contains(employees[1].firstName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-last-name]`).contains(employees[1].lastName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-date-of-birth]`).contains(employees[1].dateOfBirth)
            })
            it('can remove an employee', () => {
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-remove]`).click()

                cy.get(`div[data-test-id=employees-list-item-${employees[1].id}]`).should('not.exist')
            })
            it('can return to Dashboard', () => {
                cy.get('button[data-test-id=return-to-dashboard-button]').click()
                cy.url().should('include', '/dashboard')
            })
        })
        describe('Register form', () => {
            const newEmployee = {
                firstName: 'New',
                lastName: 'Employee',
                email: 'new@employee.com',
                day: '15',
                month: '12',
                year: '1992',
                mobilePhone: '666556446',
                salary: '35700'
            }

            beforeEach(() => {
                cy.visit('http://localhost:3000/testing-bypass-register/admin')
            })
            it('renders the Register form elements', () => {
                cy.get('label').contains('Email address')
                cy.get('label').contains('First name')
                cy.get('label').contains('Last name')
                cy.get('label').contains('Mobile phone')
                cy.get('svg[data-test-id=expansion-panel-button]').click()
                cy.get('p[data-test-id=expansion-panel-content]').contains('We require a Spanish phone number for additional contact details')
                cy.get('h6').contains('Date of Birth')
                cy.get('label').contains('DD')
                cy.get('label').contains('MM')
                cy.get('label').contains('YYYY')
                cy.get('label').contains('Salary')
            })
            it('validates the form', () => {
                cy.get('div[data-test-id=registration-form-email-input]').type('incorrectEmail@test').find('input').blur()
                cy.get('p[data-test-id=registration-form-email-error]').contains('Please enter a valid email')
                cy.get('div[data-test-id=registration-form-email-input]').find('input').clear()
                cy.get('div[data-test-id=registration-form-email-input]').type('incorrectEmail.com').find('input').blur()
                cy.get('p[data-test-id=registration-form-email-error]').contains('Please enter a valid email')

                cy.get('div[data-test-id=registration-form-first-name-input]').type('A').find('input').blur()
                cy.get('p[data-test-id=registration-form-first-name-error]').contains('First name must be at least 2 characters long')

                cy.get('div[data-test-id=registration-form-last-name-input]').type('B').find('input').blur()
                cy.get('p[data-test-id=registration-form-last-name-error]').contains('Last name must be at least 2 characters long')

                cy.get('div[data-test-id=registration-form-mobile-phone-input]').type('61234532').find('input').blur()
                cy.get('p[data-test-id=registration-form-mobile-phone-error]').contains('Please enter a valid phone number.')
                cy.get('div[data-test-id=registration-form-mobile-phone-input]').find('input').clear()
                cy.get('div[data-test-id=registration-form-mobile-phone-input]').type('312345321').find('input').blur()
                cy.get('p[data-test-id=registration-form-mobile-phone-error]').contains('Please enter a valid phone number.')

                cy.get('div[data-test-id=registration-form-salary-input]').type('SSSSSS').find('input').blur()
                cy.get('p[data-test-id=registration-form-salary-error]').contains('Salary must be a number')
            })
            it('can register a new employee', () => {
                cy.get('div[data-test-id=registration-form-email-input]').type(newEmployee.email)
                cy.get('div[data-test-id=registration-form-first-name-input]').type(newEmployee.firstName)
                cy.get('div[data-test-id=registration-form-last-name-input]').type(newEmployee.lastName)
                cy.get('div[data-test-id=registration-form-mobile-phone-input]').type(newEmployee.mobilePhone)
                cy.get('div[data-test-id=date-field-day-input]').type(newEmployee.day)
                cy.get('div[data-test-id=date-field-month-input]').type(newEmployee.month)
                cy.get('div[data-test-id=date-field-year-input]').type(newEmployee.year)
                cy.get('div[data-test-id=registration-form-salary-input]').type(newEmployee.salary)

                cy.get('button[data-test-id=registration-form-register-button]').click()

                cy.get('p[data-test-id=registration-completed-view-title]').contains('Registration successfully completed')
                cy.get('button[data-test-id=return-to-dashboard-button]').click()
                cy.url().should('include', '/dashboard')

                cy.get('button[data-test-id=dashboard-employees-button]').click()
                cy.url().should('include', '/employees')

                cy.contains(newEmployee.firstName)
                cy.contains(newEmployee.lastName)
                cy.contains(newEmployee.email)
                cy.contains(`${newEmployee.day}/${newEmployee.month}/${newEmployee.year}`)
                cy.contains(newEmployee.mobilePhone)
                cy.contains(`${newEmployee.salary}€`)
            })

            it('can return to Dashboard', () => {
                cy.get('button[data-test-id=return-to-dashboard-button]').click()
                cy.url().should('include', '/dashboard')
            })
        })
    })
    describe('Associate pathway', () => {
        describe('Login', () => {
            const validUser = {
                email: 'test@associate.com',
                password: 'test123',
            }
            const invalidUser = {
                email: 'invalid@email.com',
                password: 'invalid123'
            }
            beforeEach(() => {
                cy.visit('http://localhost:3000/login')
            })

            it('renders the Login elements', () => {
                cy.get('div[data-test-id=login-form-error]').should('not.exist')
                cy.get('h5[data-test-id=login-form-header]').contains('Login')
                cy.get('label').contains('Email address')
                cy.get('label').contains('Password')
                cy.get('button[data-test-id=login-form-sign-in-button]').contains('Sign in')
            })
            it('can not submit an invalid form (both invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(invalidUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(invalidUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can not submit an invalid form (email invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(invalidUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can not submit an invalid form (password invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(invalidUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can submit a valid form', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.url().should('include', '/dashboard')
            })
        })
        describe('Dashboard', () => {
            beforeEach(() => {
                cy.visit('http://localhost:3000/testing-bypass-dashboard/associate')
            })
            it('renders the Dashboard elements', () => {
                cy.contains(`Welcome Test!`)
                cy.get('button[data-test-id=dashboard-employees-button]').contains('Employee list')
                cy.get('button[data-test-id=dashboard-register-button]').contains('Register')
                cy.get('button[data-test-id=dashboard-logout-button]').contains('Logout')
            })
            it('can visit the employees page', () => {
                cy.get('button[data-test-id=dashboard-employees-button]').click()
                cy.url().should('include', '/employees')
            })
            it('shows the register button disabled', () => {
                cy.get('button[data-test-id=dashboard-register-button]').should('be.disabled')
            })
            it('can logout', () => {
                cy.get('button[data-test-id=dashboard-logout-button]').click()
                cy.url().should('include', '/login')
            })
        })
        describe('Employees', () => {
            const employees = [
                {
                    id: 1,
                    firstName: 'Mario',
                    lastName: 'Jimenez',
                    email: 'mario@gmail.com',
                    dateOfBirth: '11/05/1995',
                    mobilePhone: '666555444',
                    salary: '355000'
                },
                {
                    id: 2,
                    firstName: 'Test',
                    lastName: 'E2E',
                    email: 'e2e@testing.com',
                    dateOfBirth: '11/11/1991',
                    mobilePhone: '611666116',
                    salary: '50000',
                }
            ]

            beforeEach(() => {
                cy.visit('http://localhost:3000/testing-bypass-employees/associate')
            })
            it('renders the Employee List elements', () => {
                cy.get('p[data-test-id=table-header-first-name]').contains('First Name')
                cy.get('p[data-test-id=table-header-last-name]').contains('Last Name')
                cy.get('p[data-test-id=table-header-email]').contains('Email')
                cy.get('p[data-test-id=table-header-date-of-birth]').contains('Date of Birth')
                cy.get('p[data-test-id=table-header-mobile-phone]').contains('Mobile Phone')
                cy.get('p[data-test-id=table-header-salary]').contains('Salary')
                cy.get('p[data-test-id=table-header-actions]').contains('Actions')

                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-first-name]`).contains(employees[0].firstName)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-last-name]`).contains(employees[0].lastName)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-email]`).contains(employees[0].email)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-date-of-birth]`).contains(employees[0].dateOfBirth)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-mobile-phone]`).contains(employees[0].mobilePhone)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-salary]`).contains(`${employees[0].salary}€`)
                cy.get(`button[data-test-id=employees-list-item-${employees[0].id}-edit]`).contains('Edit')
                cy.get(`button[data-test-id=employees-list-item-${employees[0].id}-remove]`).should('not.exist')

                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-first-name]`).contains(employees[1].firstName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-last-name]`).contains(employees[1].lastName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-email]`).contains(employees[1].email)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-date-of-birth]`).contains(employees[1].dateOfBirth)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-mobile-phone]`).contains(employees[1].mobilePhone)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-salary]`).contains(`${employees[1].salary}€`)
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-edit]`).contains('Edit')
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-remove]`).should('not.exist')
            })
            it('can edit the email and mobile phone of an employee', () => {
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-edit]`).click()

                cy.get('input[name=email]').clear()
                cy.get(`div[data-test-id=employees-list-item-${employees[1].id}-email-input]`).type('changed@email.com')
                cy.get('input[name=mobilePhone]').clear()
                cy.get(`div[data-test-id=employees-list-item-${employees[1].id}-mobile-phone-input]`).type('666666666')

                cy.get(`div[data-test-id=employees-list-item-${employees[1].id}-salary-input]`).should('not.exist')

                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-submit]`).click()

                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-email]`).contains('changed@email.com')
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-mobile-phone]`).contains('666666666')
            })
            it('can return to Dashboard', () => {
                cy.get('button[data-test-id=return-to-dashboard-button]').click()
                cy.url().should('include', '/dashboard')
            })
        })
    })
    describe('User pathway', () => {
        describe('Login', () => {
            const validUser = {
                email: 'test@user.com',
                password: 'test123',
            }
            const invalidUser = {
                email: 'invalid@email.com',
                password: 'invalid123'
            }
            beforeEach(() => {
                cy.visit('http://localhost:3000/login')
            })

            it('renders the Login elements', () => {
                cy.get('div[data-test-id=login-form-error]').should('not.exist')
                cy.get('h5[data-test-id=login-form-header]').contains('Login')
                cy.get('label').contains('Email address')
                cy.get('label').contains('Password')
                cy.get('button[data-test-id=login-form-sign-in-button]').contains('Sign in')
            })
            it('can not submit an invalid form (both invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(invalidUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(invalidUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can not submit an invalid form (email invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(invalidUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can not submit an invalid form (password invalid)', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(invalidUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.contains('Email and/or password does not match')
            })
            it('can submit a valid form', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.url().should('include', '/dashboard')
            })
        })
        describe('Dashboard', () => {
            beforeEach(() => {
                cy.visit('http://localhost:3000/testing-bypass-dashboard/user')
            })
            it('renders the Dashboard elements', () => {
                cy.contains(`Welcome Test!`)
                cy.get('button[data-test-id=dashboard-employees-button]').contains('Employee list')
                cy.get('button[data-test-id=dashboard-register-button]').contains('Register')
                cy.get('button[data-test-id=dashboard-logout-button]').contains('Logout')
            })
            it('can visit the employees page', () => {
                cy.get('button[data-test-id=dashboard-employees-button]').click()
                cy.url().should('include', '/employees')
            })
            it('shows the register button disabled', () => {
                cy.get('button[data-test-id=dashboard-register-button]').should('be.disabled')
            })
            it('can logout', () => {
                cy.get('button[data-test-id=dashboard-logout-button]').click()
                cy.url().should('include', '/login')
            })
        })
        describe('Employees', () => {
            const employees = [
                {
                    id: 1,
                    firstName: 'Mario',
                    lastName: 'Jimenez',
                    email: 'mario@gmail.com',
                    dateOfBirth: '11/05/1995',
                    mobilePhone: '666555444',
                    salary: '355000'
                },
                {
                    id: 2,
                    firstName: 'Test',
                    lastName: 'E2E',
                    email: 'e2e@testing.com',
                    dateOfBirth: '11/11/1991',
                    mobilePhone: '611666116',
                    salary: '50000',
                }
            ]

            beforeEach(() => {
                cy.visit('http://localhost:3000/testing-bypass-employees/user')
            })
            it('renders the Employee List elements', () => {
                cy.get('p[data-test-id=table-header-first-name]').contains('First Name')
                cy.get('p[data-test-id=table-header-last-name]').contains('Last Name')
                cy.get('p[data-test-id=table-header-email]').contains('Email')
                cy.get('p[data-test-id=table-header-date-of-birth]').contains('Date of Birth')
                cy.get('p[data-test-id=table-header-mobile-phone]').contains('Mobile Phone')
                cy.get('p[data-test-id=table-header-salary]').should('not.exist')
                cy.get('p[data-test-id=table-header-actions]').should('not.exist')

                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-first-name]`).contains(employees[0].firstName)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-last-name]`).contains(employees[0].lastName)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-email]`).contains(employees[0].email)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-date-of-birth]`).contains(employees[0].dateOfBirth)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-mobile-phone]`).contains(employees[0].mobilePhone)
                cy.get(`p[data-test-id=employees-list-item-${employees[0].id}-salary]`).should('not.exist')
                cy.get(`button[data-test-id=employees-list-item-${employees[0].id}-edit]`).should('not.exist')
                cy.get(`button[data-test-id=employees-list-item-${employees[0].id}-remove]`).should('not.exist')

                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-first-name]`).contains(employees[1].firstName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-last-name]`).contains(employees[1].lastName)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-email]`).contains(employees[1].email)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-date-of-birth]`).contains(employees[1].dateOfBirth)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-mobile-phone]`).contains(employees[1].mobilePhone)
                cy.get(`p[data-test-id=employees-list-item-${employees[1].id}-salary]`).should('not.exist')
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-edit]`).should('not.exist')
                cy.get(`button[data-test-id=employees-list-item-${employees[1].id}-remove]`).should('not.exist')
            })
            it('can return to Dashboard', () => {
                cy.get('button[data-test-id=return-to-dashboard-button]').click()
                cy.url().should('include', '/dashboard')
            })
        })
    })
})
