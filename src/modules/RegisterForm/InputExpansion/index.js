import React, { useState } from 'react';
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

export default InputExpansionContainer;
