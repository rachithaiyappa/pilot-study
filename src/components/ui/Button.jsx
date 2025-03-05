import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
