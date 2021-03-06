describe('End to end tests', () => {
    beforeEach(() => {
        cy.exec('cp testing-db-data.json testing-db.json')
    })
    describe('Admin happy path', () => {
        describe('Login', () => {
            const validUser = {
                email: 'test@admin.com',
                password: 'test123',
            }

            beforeEach(() => {
                cy.visit('http://localhost:3000/login')
            })

            it('can submit a valid form', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.url().should('include', '/dashboard')
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
        })
    })
    describe('Associate happy path', () => {
        describe('Login', () => {
            const validUser = {
                email: 'test@associate.com',
                password: 'test123',
            }

            beforeEach(() => {
                cy.visit('http://localhost:3000/login')
            })

            it('can submit a valid form', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.url().should('include', '/dashboard')
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
        })
    })
    describe('User happy path', () => {
        describe('Login', () => {
            const validUser = {
                email: 'test@user.com',
                password: 'test123',
            }
            beforeEach(() => {
                cy.visit('http://localhost:3000/login')
            })

            it('can submit a valid form', () => {
                cy.get('div[data-test-id=login-form-email-input]').type(validUser.email)
                cy.get('div[data-test-id=login-form-password-input]').type(validUser.password)

                cy.get('button[data-test-id=login-form-sign-in-button]').click()
                cy.url().should('include', '/dashboard')
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
        })
    })
})
