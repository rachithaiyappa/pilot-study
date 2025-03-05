import React from 'react';

const Input = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`border p-2 rounded ${className}`}
    />
  );
};

export default Input;