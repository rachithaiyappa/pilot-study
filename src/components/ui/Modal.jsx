import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(apiKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {/* <h2 className="text-xl font-bold mb-4">Enter API Key</h2> */}
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter your OpenAI API Key and hit submit"
        />
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;