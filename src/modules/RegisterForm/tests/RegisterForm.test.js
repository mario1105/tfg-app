import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import { mount } from 'enzyme';
import * as hocs from 'utils/hocs';
import * as request from 'utils/request';

import * as HelpInfoModal from 'components/HelpInfoModal';
import flushPromises from 'utils/flushPromises';
import RegisterFormContainer from '../RegisterFormContainer';
import {
  findFormRegisterButton,
  findRegistrationCompletedView,
  findRegistrationFormSubmitError,
  findFormEmailInput,
  findFormEmailError,
  findFormFirstNameInput,
  findFormFirstNameError,
  findFormLastNameInput,
  findFormLastNameError,
  findFormMobilePhoneInput,
  findFormMobilePhoneError,
  findFormMobilePhoneExpansionField,
  findFormMobilePhoneExpansionFieldPanelSummary,
  findFormMobilePhoneExpansionFieldHereLink,
  findDateFieldDayFormControl,
  findDateFieldDayInput,
  findDateFieldMonthFormControl,
  findDateFieldMonthInput,
  findDateFieldYearFormControl,
  findDateFieldYearInput,
} from './registerFormTestUtils';

jest.mock('../service/apiEndpointBase', () => 'api-url');

const renderUi = () => mount(
  <MemoryRouter>
    <ThemeProvider theme={createMuiTheme()}>
      <RegisterFormContainer />
    </ThemeProvider>
  </MemoryRouter>
);

let wrapper;
describe('RegisterForm Integration Test', () => {
  const handleOpenDialogWithTab = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(hocs, 'isMobile').mockReturnValue(false);
    jest.spyOn(HelpInfoModal, 'useHelpInfoContext').mockImplementation(() => ({ handleOpenDialogWithTab }));
    jest.spyOn(document, 'getElementById').mockReturnValue({ focus: jest.fn() });

    wrapper = renderUi();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Validation', () => {
    it('shows the Register button disabled by default', () => {
      expect(findFormRegisterButton(wrapper).props().disabled).toBe(true);
    });

    it('shows the Register button disabled if any field is empty', () => {
      findFormEmailInput(wrapper).simulate('change', {
        target: {
          value: 'mario.jimenez-theshopworks.com'
        },
      });
      findFormEmailInput(wrapper).find('input').simulate('blur');

      findFormFirstNameInput(wrapper).simulate('change', {
        target: {
          value: 'mario.jimenez-theshopworks.com'
        },
      });
      findFormFirstNameInput(wrapper).find('input').simulate('blur');

      expect(findFormRegisterButton(wrapper).props().disabled).toBe(true);
    });

    describe('Email', () => {
      it('does not show any error by default', () => {
        expect(findFormEmailError(wrapper)).toHaveLength(0);
      });
      it('does not show any error when entering a valid email', () => {
        findFormEmailInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez@theshopworks.com'
          },
        });
        findFormEmailInput(wrapper).simulate('blur');

        expect(findFormEmailError(wrapper)).toHaveLength(0);
      });
      it('shows an error when entering an invalid email', () => {
        findFormEmailInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez-theshopworks.com'
          },
        });
        findFormEmailInput(wrapper).find('input').simulate('blur');

        expect(findFormEmailError(wrapper)).toHaveLength(1);
      });
    });
    describe('First name', () => {
      it('does not show any error by default', () => {
        expect(findFormFirstNameError(wrapper)).toHaveLength(0);
      });
      it('does not show any error when entering a valid first name', () => {
        findFormFirstNameInput(wrapper).simulate('change', {
          target: {
            value: 'Mario'
          },
        });
        findFormFirstNameInput(wrapper).simulate('blur');

        expect(findFormFirstNameError(wrapper)).toHaveLength(0);
      });
      it('shows an error when entering a first name with less than 2 characters', () => {
        findFormFirstNameInput(wrapper).simulate('change', {
          target: {
            value: 'M'
          },
        });
        findFormFirstNameInput(wrapper).find('input').simulate('blur');

        expect(findFormFirstNameError(wrapper)).toHaveLength(1);
      });
    });
    describe('Last name', () => {
      it('does not show any error by default', () => {
        expect(findFormLastNameError(wrapper)).toHaveLength(0);
      });
      it('does not show any error when entering a valid last name', () => {
        findFormLastNameInput(wrapper).simulate('change', {
          target: {
            value: 'Jimenez'
          },
        });
        findFormLastNameInput(wrapper).simulate('blur');

        expect(findFormLastNameError(wrapper)).toHaveLength(0);
      });
      it('shows an error when entering a last name with less than 2 characters', () => {
        findFormLastNameInput(wrapper).simulate('change', {
          target: {
            value: 'J'
          },
        });
        findFormLastNameInput(wrapper).find('input').simulate('blur');

        expect(findFormLastNameError(wrapper)).toHaveLength(1);
      });
    });
    describe('Mobile phone', () => {
      it('does not show any error by default', () => {
        expect(findFormMobilePhoneError(wrapper)).toHaveLength(0);
      });
      it('does not show any error when entering a valid phone number format', () => {
        findFormMobilePhoneInput(wrapper).simulate('change', {
          target: {
            value: '+447123456789'
          },
        });
        findFormMobilePhoneInput(wrapper).simulate('blur');

        expect(findFormMobilePhoneError(wrapper)).toHaveLength(0);
      });
      it('shows an error when entering an invalid phone number format', () => {
        findFormMobilePhoneInput(wrapper).simulate('change', {
          target: {
            value: '+449123456789'
          },
        });
        findFormMobilePhoneInput(wrapper).find('input').simulate('blur');

        expect(findFormMobilePhoneError(wrapper)).toHaveLength(1);
      });
      it('does not show the info message by default', () => {
        expect(findFormMobilePhoneExpansionFieldPanelSummary(wrapper).props()['aria-expanded']).toBe(false);
      });
      describe('when clicking on the info button', () => {
        beforeEach(() => {
          findFormMobilePhoneExpansionField(wrapper).prop('onChange')({ target: { tagName: 'svg' } });
          wrapper.update();
        });
        it('shows the info message', () => {
          expect(findFormMobilePhoneExpansionFieldPanelSummary(wrapper).props()['aria-expanded']).toBe(true);
        });
        it('calls the open help modal handler when clicking on the here link', () => {
          findFormMobilePhoneExpansionFieldHereLink(wrapper).simulate('click');
          expect(handleOpenDialogWithTab).toHaveBeenCalledWith(2);
        });
      });
    });
    describe('Date', () => {
      describe('Day', () => {
        it('does not show any error by default', () => {
          expect(findDateFieldDayFormControl(wrapper).prop('error')).toBe(false);
        });

        it('does not show any error when entering a valid day', () => {
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '31'
            },
          });
          findDateFieldDayInput(wrapper).simulate('blur');

          expect(findDateFieldDayFormControl(wrapper).prop('error')).toBe(false);
        });

        it('highlights the input in red when the day is invalid', () => {
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '32'
            },
          });
          findDateFieldDayInput(wrapper).simulate('blur');

          expect(findDateFieldDayFormControl(wrapper).prop('error')).toBe(true);
        });

        it('changes the focus to month when the day has being entered', () => {
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '11'
            },
          });
          jest.runAllTimers();
          expect(document.getElementById).toHaveBeenCalledWith('month-input');
          expect(document.getElementById().focus).toHaveBeenCalled();
        });

        it('changes the focus to year when the month has being previously entered', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '05'
            },
          });

          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '11'
            },
          });
          jest.runAllTimers();
          expect(document.getElementById).toHaveBeenCalledWith('year-input');
          expect(document.getElementById().focus).toHaveBeenCalled();
        });
      });
      describe('Month', () => {
        it('does not show any error by default', () => {
          expect(findDateFieldMonthFormControl(wrapper).prop('error')).toBe(false);
        });

        it('does not show any error when entering a valid month', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '12'
            },
          });
          findDateFieldMonthInput(wrapper).simulate('blur');

          expect(findDateFieldMonthFormControl(wrapper).prop('error')).toBe(false);
        });

        it('highlights the input in red when the month is invalid', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '13'
            },
          });
          findDateFieldMonthInput(wrapper).simulate('blur');

          expect(findDateFieldMonthFormControl(wrapper).prop('error')).toBe(true);
        });

        it('changes the focus to year when the month has being entered', () => {
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '05'
            },
          });
          jest.runAllTimers();
          expect(document.getElementById).toHaveBeenCalledWith('year-input');
          expect(document.getElementById().focus).toHaveBeenCalled();
        });
      });
      describe('Year', () => {
        it('does not show any error by default', () => {
          expect(findDateFieldYearFormControl(wrapper).prop('error')).toBe(false);
        });

        it('does not show any error when entering a valid year', () => {
          findDateFieldYearInput(wrapper).simulate('change', {
            target: {
              value: '1995'
            },
          });
          findDateFieldYearInput(wrapper).simulate('blur');

          expect(findDateFieldYearFormControl(wrapper).prop('error')).toBe(false);
        });

        it('highlights the input in red when the year is invalid', () => {
          findDateFieldYearInput(wrapper).simulate('change', {
            target: {
              value: '1000'
            },
          });
          findDateFieldYearInput(wrapper).simulate('blur');

          expect(findDateFieldYearFormControl(wrapper).prop('error')).toBe(true);
        });
      });
    });
  });
  describe('On Success', () => {
    beforeEach(() => {
      jest.spyOn(request, 'default').mockReturnValue(Promise.resolve());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('when all the fields are filled and the Register button is clicked', () => {
      beforeEach(() => {
        findFormEmailInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez@theshopworks.com'
          },
        });
        findFormFirstNameInput(wrapper).simulate('change', {
          target: {
            value: 'mario.jimenez-theshopworks.com'
          },
        });
        findFormLastNameInput(wrapper).simulate('change', {
          target: {
            value: 'Jimenez'
          },
        });
        findFormMobilePhoneInput(wrapper).simulate('change', {
          target: {
            value: '+44123456789'
          },
        });
        findDateFieldDayInput(wrapper).simulate('change', {
          target: {
            value: '11'
          },
        });
        findDateFieldMonthInput(wrapper).simulate('change', {
          target: {
            value: '12'
          },
        });
        findDateFieldYearInput(wrapper).simulate('change', {
          target: {
            value: '2000'
          },
        });

        findFormRegisterButton(wrapper).simulate('click');
      });
      describe('before loading', () => {
        it('does not show the registration completed view', () => {
          expect(findRegistrationCompletedView(wrapper)).toHaveLength(0);
        });
        it('shows the Register button disabled', () => {
          expect(findFormRegisterButton(wrapper).props().disabled).toBe(true);
        });
      });
      describe('after loading', () => {
        beforeEach(async () => {
          await flushPromises();
          wrapper.update();
        });

        it('shows the registration completed view', () => {
          expect(findRegistrationCompletedView(wrapper)).toHaveLength(1);
        });
      });
    });
  });
  describe('On Error', () => {
    describe('when there is a generic error from the API', () => {
      beforeEach(() => {
        jest.spyOn(request, 'default').mockReturnValue(Promise.reject(Error()));
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      describe('when all the fields are filled and the Register button is clicked', () => {
        beforeEach(() => {
          findFormEmailInput(wrapper).simulate('change', {
            target: {
              value: 'mario.jimenez@theshopworks.com'
            },
          });
          findFormFirstNameInput(wrapper).simulate('change', {
            target: {
              value: 'mario.jimenez-theshopworks.com'
            },
          });
          findFormLastNameInput(wrapper).simulate('change', {
            target: {
              value: 'Jimenez'
            },
          });
          findFormMobilePhoneInput(wrapper).simulate('change', {
            target: {
              value: '+44123456789'
            },
          });
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '11'
            },
          });
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '12'
            },
          });
          findDateFieldYearInput(wrapper).simulate('change', {
            target: {
              value: '2000'
            },
          });

          findFormRegisterButton(wrapper).simulate('click');
        });
        describe('before loading', () => {
          it('does not show the registration completed view', () => {
            expect(findRegistrationCompletedView(wrapper)).toHaveLength(0);
          });
          it('shows the Register button disabled', () => {
            expect(findFormRegisterButton(wrapper).props().disabled).toBe(true);
          });
        });
        describe('after loading', () => {
          beforeEach(async () => {
            await flushPromises();
            wrapper.update();
          });

          it('shows the generic error message', () => {
            expect(findRegistrationFormSubmitError(wrapper).text().includes('There was an error, please try again')).toBe(true);
          });
        });
      });
    });
    describe('when the email already exists', () => {
      beforeEach(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        jest.spyOn(request, 'default').mockReturnValue(Promise.reject(
          {
            response:
                  {
                    json: () => Promise.resolve({
                      errors: [
                        {
                          meta: {
                            validation: {
                              failed: {
                                Okta: 'An object with this field already exists in the current organization'
                              }
                            }
                          }
                        }
                      ]
                    })
                  }
          }));
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      describe('when all the fields are filled and the Register button is clicked', () => {
        beforeEach(() => {
          findFormEmailInput(wrapper).simulate('change', {
            target: {
              value: 'mario.jimenez@theshopworks.com'
            },
          });
          findFormFirstNameInput(wrapper).simulate('change', {
            target: {
              value: 'mario.jimenez-theshopworks.com'
            },
          });
          findFormLastNameInput(wrapper).simulate('change', {
            target: {
              value: 'Jimenez'
            },
          });
          findFormMobilePhoneInput(wrapper).simulate('change', {
            target: {
              value: '+44123456789'
            },
          });
          findDateFieldDayInput(wrapper).simulate('change', {
            target: {
              value: '11'
            },
          });
          findDateFieldMonthInput(wrapper).simulate('change', {
            target: {
              value: '12'
            },
          });
          findDateFieldYearInput(wrapper).simulate('change', {
            target: {
              value: '2000'
            },
          });

          findFormRegisterButton(wrapper).simulate('click');
        });
        describe('before loading', () => {
          it('does not show the registration completed view', () => {
            expect(findRegistrationCompletedView(wrapper)).toHaveLength(0);
          });
          it('shows the Register button disabled', () => {
            expect(findFormRegisterButton(wrapper).props().disabled).toBe(true);
          });
        });
        describe('after loading', () => {
          beforeEach(async () => {
            await flushPromises();
            wrapper.update();
          });

          it('shows the email address already exists error message', () => {
            expect(findRegistrationFormSubmitError(wrapper).text().includes('This email address already exists')).toBe(true);
          });
        });
      });
    });
  });
});
