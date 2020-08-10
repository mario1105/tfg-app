export const findFormRegisterButton = (wrapper) => wrapper.find('[data-test-id~="registration-form-register-button"]').hostNodes();

export const findRegistrationCompletedView = (wrapper) => wrapper.find('[data-test-id~="registration-completed-view"]').hostNodes();

export const findRegistrationFormSubmitError = (wrapper) => wrapper.find('[data-test-id~="registration-form-submit-error"]').hostNodes();

export const findFormEmailInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-email-input"]').find('input');

export const findFormEmailError = (wrapper) => wrapper.find('[data-test-id~="registration-form-email-error"]').hostNodes();

export const findFormFirstNameInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-first-name-input"]').find('input');

export const findFormFirstNameError = (wrapper) => wrapper.find('[data-test-id~="registration-form-first-name-error"]').hostNodes();

export const findFormLastNameInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-last-name-input"]').find('input');

export const findFormLastNameError = (wrapper) => wrapper.find('[data-test-id~="registration-form-last-name-error"]').hostNodes();

export const findFormMobilePhoneInput = (wrapper) => wrapper.find('[data-test-id~="registration-form-mobile-phone-input"]').find('input');

export const findFormMobilePhoneError = (wrapper) => wrapper.find('[data-test-id~="registration-form-mobile-phone-error"]').hostNodes();

export const findFormMobilePhoneExpansionField = (wrapper) => wrapper.find('[data-test-id~="registration-form-mobile-phone-expansion-field"]').at(2);

export const findFormMobilePhoneExpansionFieldPanelSummary = (wrapper) => wrapper
  .find('[data-test-id~="registration-form-mobile-phone-expansion-field"]')
  .find('[data-test-id~="expansion-panel-summary"]').hostNodes();

export const findFormMobilePhoneExpansionFieldHereLink = (wrapper) => wrapper.find('[data-test-id~="registration-form-mobile-phone-expansion-field-here-link"]').hostNodes();

export const findDateFieldDayFormControl = (wrapper) => wrapper.find('[data-test-id~="date-field-day-form-control"]').first();

export const findDateFieldDayInput = (wrapper) => wrapper.find('[data-test-id~="date-field-day-input"]').find('input');

export const findDateFieldMonthFormControl = (wrapper) => wrapper.find('[data-test-id~="date-field-month-form-control"]').first();

export const findDateFieldMonthInput = (wrapper) => wrapper.find('[data-test-id~="date-field-month-input"]').find('input');

export const findDateFieldYearFormControl = (wrapper) => wrapper.find('[data-test-id~="date-field-year-form-control"]').first();

export const findDateFieldYearInput = (wrapper) => wrapper.find('[data-test-id~="date-field-year-input"]').find('input');
