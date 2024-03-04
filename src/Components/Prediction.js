import React, { useState } from 'react';
import './Prediction.css';

const Prediction = () => {
  const [ess, setEss] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // Assuming a binary choice for simplicity
  const [file, setFile] = useState(null);
  const [result, setResult] = useState({
    apneaCount: '',
    detection: '',
    severity: '',
  });

  const handleEssChange = (e) => {
    setEss(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const handleProcess = () => {
    // Perform the prediction logic here
    // For now, display dummy results
    setResult({
      apneaCount: '5',
      detection: 'Detected',
      severity: 'Moderate',
    });
  };

  return (
    <div className="prediction-container">
      <h2>Sleep Apnea Prediction using ECG Signals</h2>
      <p>Here the Prediction of sleep Apnea works on Records of Ecg data</p>
      <br></br>

      <label htmlFor="height">Height (cm):</label>
        <input type="text" id="height" name="height" value={height} onChange={handleHeightChange} />
        <br></br>

        <label htmlFor="weight">Weight (kg):</label>
        <input type="text" id="weight" name="weight" value={weight} onChange={handleWeightChange} />
        <br></br>

        <label htmlFor="age">Age:</label>
        <input type="text" id="age" name="age" value={age} onChange={handleAgeChange} />
        <br></br>

        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" value={gender} onChange={handleGenderChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br></br>

        <label htmlFor="ess">Ess (No. of Hours sleep):</label>
        <input type="text" id="ess" name="ess" value={age} onChange={handleEssChange} />
        <br></br>
        

      <label>Pre-defined Data:</label>
      <form className="prediction-form">
       
       <select>
          <option value="">Select</option>
          <option value="X01">X01</option>
          <option value="X02">X02</option>
          <option value="X03">X03</option>
          <option value="X04">X04</option>
          <option value="X05">X05</option>
          <option value="X06">X06</option>
          <option value="X07">X07</option>
          <option value="X08">X08</option>
          <option value="X09">X09</option>
          <option value="X10">X10</option>
        </select>

        <br></br>

        <label htmlFor="file" className="file-label">
           Choose File:
        
          <input
            type="file"
            id="file"
            name="file"
            accept=".csv"
            onChange={handleFileChange}
            onDrop={handleFileDrop}
          />
        </label>

        <button type="button" onClick={handleProcess} className="process-button">
          Process
        </button>
      </form>

      {result.apneaCount && (
        <div className="result-box">
          <h3>Results:</h3>
          <p>Apnea Count: {result.apneaCount}</p>
          <p>Detection: {result.detection}</p>
          <p>Severity: {result.severity}</p>
        </div>
      )}
    </div>
  );
};

export default Prediction;
