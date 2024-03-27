import React, { useState } from 'react';
import './Diagnosis.css';

const Diagnosis = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [results, setResults] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setResults('Image uploaded successfully. Click "Upload" to process.');
    }
  };

  const handleManualUpload = () => {
    // Trigger click on hidden file input
    document.getElementById('fileInput').click();
  };

  const handleUpload = async () => {
    if (uploadedImage) {
      const formData = new FormData();
      formData.append("file", uploadedImage);
  
      try {
        const response = await fetch("http://localhost:8000/detection", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          setResults(`Class: ${result.class_name}, Confidence: ${result.confidence_score}`);
        } else {
          setResults("Error processing image. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        setResults("Error processing image. Please try again.");
      }
    }
  };
  
  const handleReupload = () => {
    // Reset the state for a new upload
    setUploadedImage(null);
    setResults('');
  };

  return (
    <div className="detection-container">
      <h2>Parkinson Diagnosis using Spiral/wave Drawings</h2>

      <div
        className={`drop-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
          id="fileInput"
        />
        <p>{isDragging ? 'Drop the image here' : 'Drag and drop image or click to upload'}</p>
        <button className="manual-upload-button" onClick={handleManualUpload}>
          Manual Upload
        </button>
      </div>

      {uploadedImage && (
        <div className="image-preview">
          <img src={uploadedImage} alt="Uploaded" width="640" height="480" />
        </div>
      )}

      <div className="button-group">
        {uploadedImage && (
          <>
            <button className="upload-button" onClick={handleUpload}>
              Upload
            </button>
            <button className="reupload-button" onClick={handleReupload}>
              Reupload
            </button>
          </>
        )}
      </div>

      {results && (
        <div className="results-section">
          <h3>Results:</h3>
          <p>{results}</p>
        </div>
      )}
    </div>
  );
};

export default Diagnosis;
