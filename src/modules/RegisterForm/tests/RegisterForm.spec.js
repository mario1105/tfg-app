import React from 'react'
import { shallow } from 'enzyme'
import RegisterForm from '../RegisterForm'

const defaultProps = {
  user: {},
  fields: {
    email: 'mario.jimenez@theshopworks.com',
    firstName: 'Mario',
    lastName: 'Jimenez',
    mobilePhone: '+444444444444',
    day: '11',
    month: '11',
    year: '1999',
    salary: '50000'
  },
  errors: {
    email: false,
    firstName: false,
    lastName: false,
    mobilePhone: false,
    day: false,
    month: false,
    year: false,
    salary: false,
  },
  loading: false,
  confirmationView: false,
  requestError: false,
  handleFieldsChange: () => null,
  handleFieldsErrors: () => null,
  submitRegisterForm: () => null,
  resetErrors: () => null
}

const renderComponent = (newProps) => {
  const props = {
    ...defaultProps,
    ...newProps,
  }

  return (shallow(<RegisterForm {...props} />))
}

let wrapper
describe('RegisterForm', () => {
  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = renderComponent()
    })

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('sets the input values with the correct prop', () => {
      expect(wrapper.find('[data-test-id~="registration-form-email-input"]').prop('value')).toBe(defaultProps.fields.email)
      expect(wrapper.find('[data-test-id~="registration-form-first-name-input"]').prop('value')).toBe(defaultProps.fields.firstName)
      expect(wrapper.find('[data-test-id~="registration-form-last-name-input"]').prop('value')).toBe(defaultProps.fields.lastName)
      expect(wrapper.find('[data-test-id~="registration-form-mobile-phone-input"]').prop('value')).toBe(defaultProps.fields.mobilePhone)
      expect(wrapper.find('[data-test-id~="registration-form-salary-input"]').prop('value')).toBe(defaultProps.fields.salary)
    })
    it('passes the correct props to InputDate', () => {
      expect(wrapper.find('InputDate').prop('date')).toEqual({ day: defaultProps.fields.day, month: defaultProps.fields.month, year: defaultProps.fields.year })
      expect(wrapper.find('InputDate').prop('errors')).toEqual({ day: defaultProps.errors.day, month: defaultProps.errors.month, year: defaultProps.errors.year })
      expect(wrapper.find('InputDate').prop('handleFieldsChange')).toBe(defaultProps.handleFieldsChange)
      expect(wrapper.find('InputDate').prop('handleFieldsErrors')).toBe(defaultProps.handleFieldsErrors)
      expect(wrapper.find('InputDate').prop('resetErrors')).toBe(defaultProps.resetErrors)
    })
  })
  describe('when there are errors', () => {
    it('renders as expected', () => {
      expect(renderComponent({
        errors: {
          email: 'Email error',
          firstName: 'First name error',
          lastName: 'Last name error',
          mobilePhone: 'Mobile phone error',
          day: 'Day error',
          month: 'Month error',
          year: 'Year error',
          salary: 'Salary error'
        },
      })).toMatchSnapshot()
    })
  })
})
