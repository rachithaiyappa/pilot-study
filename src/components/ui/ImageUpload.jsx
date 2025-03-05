import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String); // Set the image preview
        onImageUpload(base64String); // Pass the base64 string to the parent component
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  return (
    <div>
      <label htmlFor="image-upload" style={{ display: 'block', marginBottom: '8px' }}>
        Upload an image of your product UI
      </label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <div className="mt-4">
          <img src={imagePreview} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
