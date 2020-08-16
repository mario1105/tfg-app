import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from "../Dashboard"

const getProps = (role) => ({
    user: {
        id: 1,
        email: 'test@test.com',
        role,
        name: 'Mario'
    },
    handleNextRoute: () => null,
})

const renderComponent = (role) => {
    return (shallow(<Dashboard {...getProps(role)} />))
}

let wrapper
describe('Dashboard Unit Tests', () => {
    it('renders as expected', () => {
        wrapper = renderComponent('admin')
        expect(wrapper).toMatchSnapshot()
    })
    describe('when the role is admin', () => {
        beforeEach(() => {
            wrapper = renderComponent('admin')
        })

        it('Logout button is not disabled', () => {
            expect(wrapper.find('[data-test-id~="dashboard-logout-button"]').prop('disabled')).not.toBe(true)
        })
        it('Employees list button is not disabled', () => {
            expect(wrapper.find('[data-test-id~="dashboard-employees-button"]').prop('disabled')).not.toBe(true)
        })
        it('Register button is not disabled', () => {
            expect(wrapper.find('[data-test-id~="dashboard-register-button"]').prop('disabled')).not.toBe(true)
        })
    })
    {
        ['associate', 'user'].map(role =>
            describe(`when the role is ${role}`, () => {
                beforeEach(() => {
                    wrapper = renderComponent(role)
                })

                it('Logout button is not disabled', () => {
                    expect(wrapper.find('[data-test-id~="dashboard-logout-button"]').prop('disabled')).not.toBe(true)
                })
                it('Employees list button is not disabled', () => {
                    expect(wrapper.find('[data-test-id~="dashboard-employees-button"]').prop('disabled')).not.toBe(true)
                })
                it('Register button is disabled', () => {
                    expect(wrapper.find('[data-test-id~="dashboard-register-button"]').prop('disabled')).toBe(true)
                })
            }))
    }
})
