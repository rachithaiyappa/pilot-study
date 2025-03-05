import React from 'react';

const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-4 rounded bg-white text-black w-full`} // white background, black text
      style={{ width: '20.5%', height: '150px' }}// height remains fixed
    />
  );
};

export default Textarea;