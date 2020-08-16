import React from "react"
import {mount} from "enzyme"
import { MemoryRouter, Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../../../theme"
import DashboardContainer from "../../Dashboard"

const getState = {
    state: {
        id: 1,
        email: 'test@test.com',
        role: 'admin',
        name: 'Mario'
    }
}

const renderUi = () => mount(
    <MemoryRouter initialEntries={[`/dashboard`]}>
        <ThemeProvider theme={theme}>
            <Route component={({location}) => <DashboardContainer location={{...location, ...getState}} />}/>
        </ThemeProvider>
    </MemoryRouter>
)

let wrapper
describe('Dashboard Integration Test', () => {
    beforeEach(async () => {
        wrapper = renderUi()
    })
    it('redirects to login page when Logout button is clicked',  () => {
        wrapper.find('[data-test-id~="dashboard-logout-button"]').hostNodes().simulate('click')

        expect(wrapper.find(DashboardContainer).props().location.pathname).toBe('/login')
    })
    it('redirects to employees page when Employees list button is clicked',  () => {
        wrapper.find('[data-test-id~="dashboard-employees-button"]').hostNodes().simulate('click')

        expect(wrapper.find(DashboardContainer).props().location.pathname).toBe('/employees')
    })
    it('redirects to register page when Register button is clicked',  () => {
        wrapper.find('[data-test-id~="dashboard-register-button"]').hostNodes().simulate('click')

        expect(wrapper.find(DashboardContainer).props().location.pathname).toBe('/register')
    })
})
