import React from 'react'
import { shallow } from 'enzyme'
import EmployeeList from "../EmployeeList"

const props = {
    role: 'admin',
    employees: [
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
    ],
    handleRemoveEmployee: () => null
}
const renderComponent = () => {
    return (shallow(<EmployeeList {...props} />))
}

let wrapper
describe('EmployeeList Unit Tests', () => {
    it('renders as expected', () => {
        wrapper = renderComponent()
        expect(wrapper).toMatchSnapshot()
    })
})
