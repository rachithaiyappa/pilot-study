import React from 'react';
import Papa from 'papaparse';

const CSVUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          onFileUpload(results.data);
        },
      });
    }
  };

  return (
    <div>
      <label htmlFor="csv-upload" style={{ display: 'block', marginBottom: '8px' }}>
        Upload CSV with user demographics
      </label>
      <input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default CSVUpload;
