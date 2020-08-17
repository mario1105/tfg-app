import React from 'react'
import { shallow } from 'enzyme'
import EmployeeListItem from "../EmployeeListItem"

const id = 1
const parameters = {
    firstName: 'Mario',
    lastName: 'Jimenez',
    email: 'mario@test.com',
    dateOfBirth: '11/05/1995',
    mobilePhone: '666555444',
    salary: '355000'
}

const getProps = ({ role, editMode }) => ({
    id,
    role,
    editMode,
    parameters,
    handleOnChange: () => null,
    handleOnSubmit: () => null,
    handleEditMode: () => null,
    handleOnRemove: () => null
})

const renderComponent = ({ role, editMode }) => {
    return (shallow(<EmployeeListItem {...getProps({ role, editMode })} />))
}

let wrapper
describe('EmployeeListItem Unit Tests', () => {
    describe('when the user is an admin', () => {
        describe('when the edit mode is disabled', () => {
            beforeEach( () => {
                wrapper = renderComponent({ role: 'admin', editMode: false})
            })
            it('renders as expected', () => {
                expect(wrapper).toMatchSnapshot()
            })
        })
        describe('when the edit mode is enabled', () => {
            beforeEach( () => {
                wrapper = renderComponent({ role: 'admin', editMode: true})
            })
            it('renders as expected', () => {
                expect(wrapper).toMatchSnapshot()
            })
        })
    })
    describe('when the user is an associate', () => {
        describe('when the edit mode is disabled', () => {
            beforeEach( () => {
                wrapper = renderComponent({ role: 'associate', editMode: false})
            })
            it('renders as expected', () => {
                expect(wrapper).toMatchSnapshot()
            })
            it('renders all the fields available for the associate',  () => {
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-first-name"]`)
                    .contains(parameters.firstName)).toBe(true)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-last-name"]`)
                    .contains(parameters.lastName)).toBe(true)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-email"]`)
                    .contains(parameters.email)).toBe(true)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-date-of-birth"]`)
                    .contains(parameters.dateOfBirth)).toBe(true)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-mobile-phone"]`)
                    .contains(parameters.mobilePhone)).toBe(true)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-salary"]`)
                    .contains(parameters.salary)).toBe(true)
            })
            it('renders the edit button',  () => {
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-edit"]`)).toHaveLength(1)
            })
            it('does not render the remove button',  () => {
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-remove"]`)).toHaveLength(0)
            })
        })
        describe('when the edit mode is enabled', () => {
            beforeEach( () => {
                wrapper = renderComponent({ role: 'associate', editMode: true})
            })
            it('renders as expected', () => {
                expect(wrapper).toMatchSnapshot()
            })
            it('renders email and mobile phone inputs',  () => {
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-email-input"]`)).toHaveLength(1)
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-mobile-phone-input"]`)).toHaveLength(1)
            })
            it('does not render salary input',  () => {
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-salary-input"]`)).toHaveLength(0)
            })
            it('renders the submit button',  () => {
                expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-submit"]`)).toHaveLength(1)
            })
        })
    })
    describe('when the user is an user', () => {
        beforeEach( () => {
            wrapper = renderComponent({ role: 'user', editMode: false})
        })
        it('renders as expected', () => {
            expect(wrapper).toMatchSnapshot()
        })
        it('renders all the fields available for the associate',  () => {
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-first-name"]`)
                .contains(parameters.firstName)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-last-name"]`)
                .contains(parameters.lastName)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-email"]`)
                .contains(parameters.email)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-date-of-birth"]`)
                .contains(parameters.dateOfBirth)).toBe(true)
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-mobile-phone"]`)
                .contains(parameters.mobilePhone)).toBe(true)
        })
        it('does not render the salary field',  () => {
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-salary"]`)).toHaveLength(0)
        })
        it('does not render the edit button',  () => {
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-edit"]`)).toHaveLength(0)
        })
        it('does not render the remove button',  () => {
            expect(wrapper.find(`[data-test-id~="employees-list-item-${id}-remove"]`)).toHaveLength(0)
        })
    })

})
