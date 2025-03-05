import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
