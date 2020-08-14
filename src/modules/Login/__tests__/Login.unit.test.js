import React from 'react'
import { shallow } from 'enzyme'
import Login from "../Login"

const defaultProps = {
    email: 'mario.jimenez@theshopworks.com',
    password: '1q2w3e',
    currentUser: {
        id: 1,
        email: 'mario.jimenez@theshopworks.com',
        password: "1q2w3e",
        role: "admin",
        name: "Mario"
    },
    handleEmailChange: () => null,
    handlePasswordChange: () => null,
    handleOnSubmit: () => null,
}

const renderComponent = (newProps) => {
    const props = {
        ...defaultProps,
        ...newProps
    }
    return (shallow(<Login {...props} />))
}

let wrapper
describe('Login Unit Tests', () => {
    describe('when there are no errors', () => {
        beforeEach(() => {
            wrapper = renderComponent()
        })

        it('renders as expected', () => {
            expect(wrapper).toMatchSnapshot()
        })
        it('sets the input values with the correct prop', () => {
            expect(wrapper.find('[data-test-id~="login-form-email-input"]').prop('value')).toBe(defaultProps.email)
            expect(wrapper.find('[data-test-id~="login-form-email-input"]').prop('onChange')).toBe(defaultProps.handleEmailChange)
            expect(wrapper.find('[data-test-id~="login-form-password-input"]').prop('value')).toBe(defaultProps.password)
            expect(wrapper.find('[data-test-id~="login-form-password-input"]').prop('onChange')).toBe(defaultProps.handlePasswordChange)
        })
    })
    describe('when there are errors', () => {
        it('renders as expected', () => {
            expect(renderComponent({
                currentUser: null
            })).toMatchSnapshot()
        })
    })
})
