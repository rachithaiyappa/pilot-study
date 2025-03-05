import React from 'react';
import ReactDOM from 'react-dom/client';
import PilotStudySim from './PilotStudySim';
import './index.css'; // Ensure you have some basic styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PilotStudySim />
  </React.StrictMode>
);