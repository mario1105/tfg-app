import React from 'react';
import { shallow } from 'enzyme';
import InputExpansion from '../InputExpansion';

const defaultProps = {
  content: 'content',
  expanded: true,
  handleChange: () => null,
  children: <div id="ChildrenMock" />,
};

const renderComponent = (newProps) => {
  const props = {
    ...defaultProps,
    ...newProps,
  };

  return (shallow(<InputExpansion {...props} />));
};

describe('InputExpansion', () => {
  it('renders as expected', () => {
    expect(renderComponent()).toMatchSnapshot();
  });
});
