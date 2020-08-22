import React from "react"
import {mount} from "enzyme"
import { MemoryRouter, Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../../../theme"
import LoginContainer from "../../Login"
import usersService from "../../../services/usersService"
import flushPromises from "../../../utils/flushPromises"
import actImmediate from "../../../utils/actInmediate"

const findSignInButton = (wrapper) => wrapper.find('[data-test-id~="login-form-sign-in-button"]').hostNodes()

const findEmailInput = (wrapper) => wrapper.find('[data-test-id~="login-form-email-input"]').find('input')

const findPasswordInput = (wrapper) => wrapper.find('[data-test-id~="login-form-password-input"]').find('input')

const findLoginError = (wrapper) => wrapper.find('[data-test-id~="login-form-error"]').hostNodes()

const mockedUsers = [
    {
        id: 1,
        email: 'test@test.com',
        password: 'test123',
        role: 'admin',
        name: 'Mario'
    },
    {
        id: 2,
        email: 'test2@test.com',
        password: 'test123',
        role: 'admin',
        name: 'Mario'
    }
]

const renderUi = () => mount(
    <MemoryRouter initialEntries={[`/`]}>
        <ThemeProvider theme={theme}>
            <Route component={LoginContainer} />
        </ThemeProvider>
    </MemoryRouter>
)

let wrapper
describe('Login Integration Test', () => {
    beforeEach( () => {
        wrapper = renderUi()
        jest.spyOn(usersService, 'getUsers').mockReturnValue(Promise.resolve(mockedUsers))
    })

    describe('On submit', () => {
        beforeEach( async () => {
            await flushPromises()
            wrapper.update()
        })

        it('shows an error if email/password does not match', () => {
            findEmailInput(wrapper).simulate('change', {
                target: {
                    value: 'mario@jimenez.com'
                },
            })

            findPasswordInput(wrapper).simulate('change', {
                target: {
                    value: '123qwerty'
                },
            })

            findSignInButton(wrapper).simulate('click')

            expect(findLoginError(wrapper)).toHaveLength(1)
        })
        it('redirects to dashboard if login details are correct', () => {
            findEmailInput(wrapper).simulate('change', {
                target: {
                    value: mockedUsers[0].email
                },
            })

            findPasswordInput(wrapper).simulate('change', {
                target: {
                    value: mockedUsers[0].password
                },
            })

            findSignInButton(wrapper).simulate('click')

            expect(findLoginError(wrapper)).toHaveLength(0)
            expect(wrapper.find(LoginContainer).props().location.pathname).toBe('/dashboard')
        })
    })
})
