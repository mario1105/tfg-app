import React from 'react'
import { shallow } from 'enzyme'
import Employees from "../../Employees"

const renderComponent = () => {
    return (shallow(<Employees location={{state: {}}} />))
}

let wrapper
describe('Employees Unit Tests', () => {
    it('renders as expected', () => {
        wrapper = renderComponent()
        expect(wrapper).toMatchSnapshot()
    })
})
