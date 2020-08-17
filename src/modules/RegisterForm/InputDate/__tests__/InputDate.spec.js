import React from 'react';
import { shallow } from 'enzyme';
import InputDate from '../index';

const defaultProps = {
  date: {
    day: '11',
    month: '11',
    year: '1999'
  },
  errors: {
    day: false,
    month: false,
    year: false
  },
  handleFieldsChange: () => null,
  handleFieldsErrors: () => null,
  resetErrors: () => null,
};

const renderComponent = (newProps) => {
  const props = {
    ...defaultProps,
    ...newProps,
  };

  return (shallow(<InputDate {...props} />));
};

let wrapper;
describe('InputDate', () => {
  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = renderComponent();
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('sets the input values with the correct prop', () => {
      expect(wrapper.find('[data-test-id~="date-field-day-input"]').prop('value')).toBe(defaultProps.date.day);
      expect(wrapper.find('[data-test-id~="date-field-month-input"]').prop('value')).toBe(defaultProps.date.month);
      expect(wrapper.find('[data-test-id~="date-field-year-input"]').prop('value')).toBe(defaultProps.date.year);
    });
  });
  describe('when there are errors', () => {
    it('renders as expected', () => {
      expect(renderComponent({
        errors: {
          day: true,
          month: true,
          year: true
        },
      })).toMatchSnapshot();
    });
  });
});
