import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputExpansion from './InputExpansion';


const InputExpansionContainer = ({ content, children, ...props }) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (event = { target: { className: {} } }) => {
    if (event.target.tagName === 'svg' || event.target.tagName === 'path' || event.target.className.includes('MuiButtonBase-root')) {
      setExpanded(!expanded);
    }
  };
  return (
    <InputExpansion content={content} expanded={expanded} handleChange={handleChange} {...props}>
      {children}
    </InputExpansion>
  );
};

InputExpansionContainer.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired
};

export default InputExpansionContainer;
