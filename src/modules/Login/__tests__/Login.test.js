import React from "react"
import {mount} from "enzyme"
import { MemoryRouter, Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../../../theme"
import LoginContainer from "../../Login"
import usersService from "../../../services/usersService"
import {
    findSignInButton,
    findEmailInput,
    findPasswordInput,
    findLoginError
} from "./loginTestsUtils"
import flushPromises from "../../../utils/flushPromises"
import actImmediate from "../../../utils/actInmediate"

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
    beforeEach(async () => {
        wrapper = renderUi()
        await actImmediate(wrapper)
        jest.spyOn(usersService, 'getUsers').mockReturnValue(Promise.resolve(mockedUsers))
    })

    describe('Validation', () => {
        it('does not show any error by default', () => {
            expect(findLoginError(wrapper)).toHaveLength(0)
        })
        it('shows the Sign In button disabled by default', () => {
            expect(findSignInButton(wrapper).props().disabled).toBe(true)
        })
        it('shows the Sign In button disabled if there is no password', async () => {
            findEmailInput(wrapper).simulate('change', {
                target: {
                    value: 'mario@jimenez.com'
                },
            })
            expect(findSignInButton(wrapper).props().disabled).toBe(true)
        })
        it('shows the Sign In button disabled if there is no email', async () => {
            findPasswordInput(wrapper).simulate('change', {
                target: {
                    value: '123qwerty'
                },
            })
            expect(findSignInButton(wrapper).props().disabled).toBe(true)
        })
    })
    describe('On submit', () => {
        beforeEach( async () => {
            await flushPromises()
        })

        it('shows an error if email/passoword does not match', async () => {
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
        it('redirects to dashboard if login details are correct', async () => {
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
