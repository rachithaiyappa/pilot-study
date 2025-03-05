// filepath: /Users/rachithaiyappa/Documents/jobs_practice/pilot-study/src/components/ui/CSVUpload.jsx

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
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default CSVUpload;