describe('Bypass routes on production', () => {
    describe('Dashboard', () => {
        it('can not access the dashboard page as admin', () => {
            cy.visit('http://localhost:5000/testing-bypass-dashboard/admin')
            cy.url().should('include', '/login')
        })
        it('can not access the dashboard page as associate', () => {
            cy.visit('http://localhost:5000/testing-bypass-dashboard/associate')
            cy.url().should('include', '/login')
        })
        it('can not access the dashboard page as user', () => {
            cy.visit('http://localhost:5000/testing-bypass-dashboard/user')
            cy.url().should('include', '/login')
        })
    })
    describe('Employees', () => {
        it('can not access the employees page as admin', () => {
            cy.visit('http://localhost:5000/testing-bypass-employees/admin')
            cy.url().should('include', '/login')
        })
        it('can not access the employees page as associate', () => {
            cy.visit('http://localhost:5000/testing-bypass-employees/associate')
            cy.url().should('include', '/login')
        })
        it('can not access the employees page as user', () => {
            cy.visit('http://localhost:5000/testing-bypass-employees/user')
            cy.url().should('include', '/login')
        })
    })
    describe('Register', () => {
        it('can not access the employees page as admin', () => {
            cy.visit('http://localhost:5000/testing-bypass-register/admin')
            cy.url().should('include', '/login')
        })
    })
})
