// import React, { useState, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const EmotionDetection = () => {
//   const [emotion, setEmotion] = useState(null);

//   const webcamRef = React.useRef(null);

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     console.log(imageSrc); // Check if the image is captured
//   };

//   useEffect(() => {
//     // Simulating emotion detection
//     const detectEmotion = () => {
//       // Replace this with actual emotion detection logic
//       setEmotion('Happy');
//     };

//     detectEmotion();
//   }, []);

//   return (
//     <div>
//       <h1>Emotion Detection</h1>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width="100%"
//       />
//       <button onClick={captureImage}>Capture Image</button>
//       <h2>{emotion ? `Detected Emotion: ${emotion}` : 'Detecting Emotion...'}</h2>
//     </div>
//   );
// };

// export default EmotionDetection;

import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const EmotionDetection = () => {
  const [emotion, setEmotion] = useState(null);
  const [facesDetected, setFacesDetected] = useState(null);
  const webcamRef = useRef(null);

  // Function to send image to the Flask backend
  const sendImageToBackend = async (imageSrc) => {
    try {
      const response = await fetch('http://localhost:5000/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc }), // Send the image as base64
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setFacesDetected(data.faces_detected);
        setEmotion(data.emotion); // Receive emotion data from backend
      }
    } catch (error) {
      console.error("Error sending image to backend", error);
    }
  };

  // Function to capture the image from webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc); // You can check the image captured here
    sendImageToBackend(imageSrc); // Send captured image to backend for processing
  };

  return (
    <div>
      <h1>Emotion Detection</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <button onClick={captureImage}>Capture Image</button>
      <h2>{emotion ? `Detected Emotion: ${emotion}` : 'Detecting Emotion...'}</h2>
      {facesDetected !== null && (
        <p>{facesDetected} face(s) detected in the image.</p>
      )}
    </div>
  );
};

export default EmotionDetection;
