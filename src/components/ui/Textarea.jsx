import React from 'react';

const Textarea = ({ value, onChange, className, placeholder}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 rounded bg-transparent text-lg ${className}`} // Added bg-transparent and text-lg
      style={{ width: '30%', height: '150px' }} // Added inline styles for default size 
    />
  );
};

export default Textarea;