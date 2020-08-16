import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { mount } from 'enzyme'
import { theme } from '../../../theme'
import employeesService from "../../../services/employeesService"
import flushPromises from '../../../utils/flushPromises'
import actImmediate from "../../../utils/actInmediate"
import RegisterFormContainer from '../../RegisterForm'

const findFormRegisterButton = (wrapper) => wrapper.find('[data-test-id~="registration-form-register-button"]').hostNodes();

const findRegistrationCompletedView = (wrapper) => wrapper.find('[data-test-id~="registration-completed-view"]').hostNodes();

const findFormEmailInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-email-input"]').find('input');

const findFormEmailError = (wrapper) => wrapper.find('[data-test-id~="registration-form-email-error"]').hostNodes();

const findFormFirstNameInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-first-name-input"]').find('input');

const findFormFirstNameError = (wrapper) => wrapper.find('[data-test-id~="registration-form-first-name-error"]').hostNodes();

const findFormLastNameInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-last-name-input"]').find('input');

const findFormLastNameError = (wrapper) => wrapper.find('[data-test-id~="registration-form-last-name-error"]').hostNodes();

const findFormMobilePhoneInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-mobile-phone-input"]').find('input');

const findFormMobilePhoneError = (wrapper) => wrapper.find('[data-test-id~="registration-form-mobile-phone-error"]').hostNodes();

const findFormMobilePhoneExpansionField = (wrapper) => wrapper.find('[data-test-id~="registration-form-mobile-phone-expansion-field"]').at(2);

const findFormMobilePhoneExpansionFieldPanelSummary = (wrapper) => wrapper
    .find('[data-test-id~="registration-form-mobile-phone-expansion-field"]')
    .find('[data-test-id~="expansion-panel-summary"]').hostNodes();

const findDateFieldDayFormControl = (wrapper) => wrapper.find('[data-test-id~="date-field-day-form-control"]').first();

const findDateFieldDayInput = (wrapper) => wrapper.find('[data-test-id~="date-field-day-input"]').find('input');

const findDateFieldMonthFormControl = (wrapper) => wrapper.find('[data-test-id~="date-field-month-form-control"]').first();

const findDateFieldMonthInput = (wrapper) => wrapper.find('[data-test-id~="date-field-month-input"]').find('input');

const findDateFieldYearFormControl = (wrapper) => wrapper.find('[data-test-id~="date-field-year-form-control"]').first();

const findDateFieldYearInput = (wrapper) => wrapper.find('[data-test-id~="date-field-year-input"]').find('input');

const findFormSalaryInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-salary-input"]').find('input');

const findFormSalaryError = (wrapper) => wrapper.find('[data-test-id~="registration-form-salary-error"]').hostNodes();

const renderUi = () => mount(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <RegisterFormContainer location={{}} />
      </ThemeProvider>
    </MemoryRouter>
)

let wrapper
describe('RegisterForm Integration Tests', () => {
  beforeEach(async () => {
    jest.useFakeTimers()
    jest.spyOn(document, 'getElementById').mockReturnValue({ focus: jest.fn() })

    wrapper = renderUi()
    await actImmediate(wrapper)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  describe('Validation', () => {
    it('shows the Register button disabled by default', () => {
      expect(findFormRegisterButton(wrapper).props().disabled).toBe(true)
    })

    it('shows the Register button disabled if any field is empty', () => {
      findFormEmailInput(wrapper).simulate('change', {
        target: {
          value: 'mario.jimenez-theshopworks.com'
        },
      })
      findFormEmailInput(wrapper).find('input').simulate('blur')

      findFormFirstNameInput(wrapper).simulate('change', {
        target: {
          value: 'mario.jimenez-theshopworks.com'
        },
      })
      findFormFirstNameInput(wrapper).find('input').simulate('blur')

      expect(findFormRegisterButton(wrapper).props().disabled).toBe(true)
    })

    describe('Email', () => {
      it('does not show any error by default', () => {
        expect(findFormEmailError(wrapper)).toHaveLength(0)
      })
      it('does not show any error when entering a valid email', () => {
        findFormEmailInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez@theshopworks.com'
          },
        })
        findFormEmailInput(wrapper).simulate('blur')

        expect(findFormEmailError(wrapper)).toHaveLength(0)
      })
      it('shows an error when entering an invalid email', () => {
        findFormEmailInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez-theshopworks.com'
          },
        })
        findFormEmailInput(wrapper).find('input').simulate('blur')

        expect(findFormEmailError(wrapper)).toHaveLength(1)
      })
    })
    describe('First name', () => {
      it('does not show any error by default', () => {
        expect(findFormFirstNameError(wrapper)).toHaveLength(0)
      })
      it('does not show any error when entering a valid first name', () => {
        findFormFirstNameInput(wrapper).simulate('change', {
          target: {
            value: 'Mario'
          },
        })
        findFormFirstNameInput(wrapper).simulate('blur')

        expect(findFormFirstNameError(wrapper)).toHaveLength(0)
      })
      it('shows an error when entering a first name with less than 2 characters', () => {
        findFormFirstNameInput(wrapper).simulate('change', {
          target: {
            value: 'M'
          },
        })
        findFormFirstNameInput(wrapper).find('input').simulate('blur')

        expect(findFormFirstNameError(wrapper)).toHaveLength(1)
      })
    })
    describe('Last name', () => {
      it('does not show any error by default', () => {
        expect(findFormLastNameError(wrapper)).toHaveLength(0)
      })
      it('does not show any error when entering a valid last name', () => {
        findFormLastNameInput(wrapper).simulate('change', {
          target: {
            value: 'Jimenez'
          },
        })
        findFormLastNameInput(wrapper).simulate('blur')

        expect(findFormLastNameError(wrapper)).toHaveLength(0)
      })
      it('shows an error when entering a last name with less than 2 characters', () => {
        findFormLastNameInput(wrapper).simulate('change', {
          target: {
            value: 'J'
          },
        })
        findFormLastNameInput(wrapper).find('input').simulate('blur')

        expect(findFormLastNameError(wrapper)).toHaveLength(1)
      })
    })
    describe('Mobile phone', () => {
      it('does not show any error by default', () => {
        expect(findFormMobilePhoneError(wrapper)).toHaveLength(0)
      })
      it('does not show any error when entering a valid phone number format', () => {
        findFormMobilePhoneInput(wrapper).simulate('change', {
          target: {
            value: '612345678'
          },
        })
        findFormMobilePhoneInput(wrapper).simulate('blur')

        expect(findFormMobilePhoneError(wrapper)).toHaveLength(0)
      })
      it('shows an error when entering an invalid phone number format', () => {
        findFormMobilePhoneInput(wrapper).simulate('change', {
          target: {
            value: '769834201'
          },
        })
        findFormMobilePhoneInput(wrapper).find('input').simulate('blur')

        expect(findFormMobilePhoneError(wrapper)).toHaveLength(1)
      })
      it('does not show the info message by default', () => {
        expect(findFormMobilePhoneExpansionFieldPanelSummary(wrapper).props()['aria-expanded']).toBe(false)
      })
      describe('when clicking on the info button', () => {
        beforeEach(() => {
          findFormMobilePhoneExpansionField(wrapper).prop('onChange')({ target: { tagName: 'svg' } })
          wrapper.update()
        })
        it('shows the info message', () => {
          expect(findFormMobilePhoneExpansionFieldPanelSummary(wrapper).props()['aria-expanded']).toBe(true)
        })
      })
    })
    describe('Date', () => {
      describe('Day', () => {
        it('does not show any error by default', () => {
          expect(findDateFieldDayFormControl(wrapper).prop('error')).toBe(false)
        })

        it('does not show any error when entering a valid day', () => {
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '31'
            },
          })
          findDateFieldDayInput(wrapper).simulate('blur')

          expect(findDateFieldDayFormControl(wrapper).prop('error')).toBe(false)
        })

        it('highlights the input in red when the day is invalid', () => {
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '32'
            },
          })
          findDateFieldDayInput(wrapper).simulate('blur')

          expect(findDateFieldDayFormControl(wrapper).prop('error')).toBe(true)
        })

        it('changes the focus to month when the day has being entered', () => {
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '11'
            },
          })
          jest.runAllTimers()
          expect(document.getElementById).toHaveBeenCalledWith('month-input')
          expect(document.getElementById().focus).toHaveBeenCalled()
        })

        it('changes the focus to year when the month has being previously entered', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '05'
            },
          })

          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '11'
            },
          })
          jest.runAllTimers()
          expect(document.getElementById).toHaveBeenCalledWith('year-input')
          expect(document.getElementById().focus).toHaveBeenCalled()
        })
      })
      describe('Month', () => {
        it('does not show any error by default', () => {
          expect(findDateFieldMonthFormControl(wrapper).prop('error')).toBe(false)
        })

        it('does not show any error when entering a valid month', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '12'
            },
          })
          findDateFieldMonthInput(wrapper).simulate('blur')

          expect(findDateFieldMonthFormControl(wrapper).prop('error')).toBe(false)
        })

        it('highlights the input in red when the month is invalid', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '13'
            },
          })
          findDateFieldMonthInput(wrapper).simulate('blur')

          expect(findDateFieldMonthFormControl(wrapper).prop('error')).toBe(true)
        })

        it('changes the focus to year when the month has being entered', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '05'
            },
          })
          jest.runAllTimers()
          expect(document.getElementById).toHaveBeenCalledWith('year-input')
          expect(document.getElementById().focus).toHaveBeenCalled()
        })
      })
      describe('Year', () => {
        it('does not show any error by default', () => {
          expect(findDateFieldYearFormControl(wrapper).prop('error')).toBe(false)
        })

        it('does not show any error when entering a valid year', () => {
          findDateFieldYearInput(wrapper).simulate('change', {
            target: {
              value: '1995'
            },
          })
          findDateFieldYearInput(wrapper).simulate('blur')

          expect(findDateFieldYearFormControl(wrapper).prop('error')).toBe(false)
        })

        it('highlights the input in red when the year is invalid', () => {
          findDateFieldYearInput(wrapper).simulate('change', {
            target: {
              value: '1000'
            },
          })
          findDateFieldYearInput(wrapper).simulate('blur')

          expect(findDateFieldYearFormControl(wrapper).prop('error')).toBe(true)
        })
      })
    })
    describe('Salary', () => {
      it('does not show any error by default', () => {
        expect(findFormSalaryError(wrapper)).toHaveLength(0)
      })
      it('does not show any error when entering a valid last name', () => {
        findFormSalaryInput(wrapper).simulate('change', {
          target: {
            value: '35000'
          },
        })
        findFormSalaryInput(wrapper).simulate('blur')

        expect(findFormSalaryError(wrapper)).toHaveLength(0)
      })
      it('shows an error when entering a wrong value', () => {
        findFormSalaryInput(wrapper).simulate('change', {
          target: {
            value: '3a000'
          },
        })
        findFormSalaryInput(wrapper).find('input').simulate('blur')

        expect(findFormSalaryError(wrapper)).toHaveLength(1)
      })
    })
  })
  describe('On submit', () => {
    beforeEach(() => {
      jest.spyOn(employeesService, 'registerEmployee').mockReturnValue(Promise.resolve())
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })
    describe('when all the fields are filled and the Register button is clicked', () => {
      beforeEach(() => {
        findFormEmailInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez@theshopworks.com'
          },
        })
        findFormFirstNameInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez-theshopworks.com'
          },
        })
        findFormLastNameInput(wrapper).simulate('change', {
          target: {
            value: 'Jimenez'
          },
        })
        findFormMobilePhoneInput(wrapper).simulate('change', {
          target: {
            value: '+44123456789'
          },
        })
        findDateFieldDayInput(wrapper).simulate('change', {
          target: {
            value: '11'
          },
        })
        findDateFieldMonthInput(wrapper).simulate('change', {
          target: {
            value: '12'
          },
        })
        findDateFieldYearInput(wrapper).simulate('change', {
          target: {
            value: '2000'
          },
        })
        findFormSalaryInput(wrapper).simulate('change', {
          target: {
            value: '50000'
          },
        })
        findFormRegisterButton(wrapper).simulate('click')
      })
      describe('before loading', () => {
        it('does not show the registration completed view', () => {
          expect(findRegistrationCompletedView(wrapper)).toHaveLength(0)
        })
        it('shows the Register button disabled', () => {
          expect(findFormRegisterButton(wrapper).props().disabled).toBe(true)
        })
      })
      describe('after loading', () => {
        beforeEach(async () => {
          await flushPromises()
          wrapper.update()
        })

        it('shows the registration completed view', () => {
          expect(findRegistrationCompletedView(wrapper)).toHaveLength(1)
        })
      })
    })
  })
})
