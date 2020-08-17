import React from "react"
import {mount} from "enzyme"
import { MemoryRouter, Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../../../theme"
import Employees from "../../Employees"
import employeesService from "../../../services/employeesService"
import flushPromises from "../../../utils/flushPromises"
import ReturnButton from "../../../components/ReturnButton"

const mockedEmployees = [
    {
        id: 1,
        firstName: 'Mario',
        lastName: 'Jimenez',
        email: 'mario@test.com',
        dateOfBirth: '11/05/1995',
        mobilePhone: '666555444',
        salary: '355000'
    },
    {
        id: 2,
        firstName: 'Daniel',
        lastName: 'Gomez',
        email: 'daniel@test.com',
        dateOfBirth: '19/11/1992',
        mobilePhone: '612345632',
        salary: '42000'
    },
    {
        id: 3,
        firstName: 'Carlos',
        lastName: 'Lopez',
        email: 'carlos@test.com',
        dateOfBirth: '25/02/1996',
        mobilePhone: '692746285',
        salary: '30000'
    }
]

const state = {
    state: {
        id: 1,
        email: 'test@test.com',
        role: 'admin',
        name: 'Mario'
    }
}

const renderUi = () => mount(
    <MemoryRouter initialEntries={[`/employees`]}>
        <ThemeProvider theme={theme}>
            <Route component={({location}) => <Employees location={{...location, ...state}} />}/>
        </ThemeProvider>
    </MemoryRouter>
)

let wrapper
describe('Employees Integration Test', () => {
    beforeEach(async () => {
        wrapper = renderUi()
        jest.spyOn(employeesService, 'getEmployees').mockReturnValue(Promise.resolve(mockedEmployees))
        jest.spyOn(employeesService, 'editEmployee').mockReturnValue(Promise.resolve())
        jest.spyOn(employeesService, 'removeEmployee').mockReturnValue(Promise.resolve())
    })
    it('redirects to Dashboard page when clicking the Return to Dashboard button',  () => {
        wrapper.find(ReturnButton).simulate('click')

        expect(wrapper.find(Employees).props().location.pathname).toBe('/dashboard')
    })
    describe('before loading', () => {
        it('does not render any employee',  () => {
            expect(wrapper.find('[data-test-id~="employees-list-item"]').hostNodes()).toHaveLength(0)
        })
    })
    describe('after loading', () => {
        beforeEach(async () => {
            await flushPromises()
            wrapper.update()
        })
        it('renders all the employees',  () => {
            expect(wrapper.find('[data-test-id~="employees-list-item"]').hostNodes()).toHaveLength(3)
        })
        it('populates the correct data from the API',  () => {
            expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-first-name"]`)
                .contains(mockedEmployees[1].firstName)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-last-name"]`)
                .contains(mockedEmployees[1].lastName)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-email"]`)
                .contains(mockedEmployees[1].email)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-date-of-birth"]`)
                .contains(mockedEmployees[1].dateOfBirth)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-mobile-phone"]`)
                .contains(mockedEmployees[1].mobilePhone)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-salary"]`)
                .contains(mockedEmployees[1].salary)).toBe(true)
        })
        describe('when clicking on Edit', () => {
            beforeEach( async() => {
                wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-edit"]`)
                    .hostNodes().simulate('click')
            })
            it('renders an input on the editable fields',  () => {
                expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-email-input"]`)
                    .hostNodes()).toHaveLength(1)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-mobile-phone-input"]`)
                    .hostNodes()).toHaveLength(1)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-salary-input"]`)
                    .hostNodes()).toHaveLength(1)
            })
            describe('when editing the fields and clicking Submit', () => {
                beforeEach(async () => {
                    wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-email-input"]`)
                        .find('input').simulate('change', {
                        target: {
                            name: 'email',
                            value: 'changed@email.com'
                        },
                    })
                    wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-mobile-phone-input"]`)
                        .find('input').simulate('change', {
                        target: {
                            name: 'mobilePhone',
                            value: '666666666'
                        },
                    })
                    wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-salary-input"]`)
                        .find('input').simulate('change', {
                        target: {
                            name: 'salary',
                            value: '10000'
                        },
                    })
                    wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-submit"]`)
                        .hostNodes().simulate('click')

                    await flushPromises()
                    wrapper.update()
                })
                it('updates the employee',  () => {
                    expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-first-name"]`)
                        .contains(mockedEmployees[1].firstName)).toBe(true)
                    expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-last-name"]`)
                        .contains(mockedEmployees[1].lastName)).toBe(true)
                    expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-date-of-birth"]`)
                        .contains(mockedEmployees[1].dateOfBirth)).toBe(true)
                    expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-email"]`)
                        .contains('changed@email.com')).toBe(true)
                    expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-mobile-phone"]`)
                        .contains('666666666')).toBe(true)
                    expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-salary"]`)
                        .contains('10000')).toBe(true)
                })
            })
        })
        describe('when clicking on Remove', () => {
            beforeEach(async () => {
                wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}-remove"]`)
                    .hostNodes().simulate('click')

                await flushPromises()
                wrapper.update()
            })
            it('removes the employee',  () => {
                expect(wrapper.find('[data-test-id~="employees-list-item"]').hostNodes()).toHaveLength(2)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${mockedEmployees[1].id}"]`)).toHaveLength(0)
            })
        })

    })
})
