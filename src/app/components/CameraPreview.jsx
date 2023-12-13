import React, { useRef, useEffect } from 'react';

const CameraPreview = (props) => {
  // const videoRef = useRef(null);

  // useEffect(() => {
  //   // Function to access the user's camera and display the live feed
  //   const getCameraFeed = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.play();
  //       }
        
  //     } catch (error) {
  //       console.error('Error accessing camera:', error);
  //     }
  //     if(props.close==true)
  //     {
  //       videoRef.current.stop();
  //     }
  //   };

  //   getCameraFeed(); // Call the function to get the camera feed

  //   // Clean up the video stream when the component is unmounted
  //   return () => {
  //     if (videoRef.current) {
  //       const stream = videoRef.current.srcObject;
  //       if (stream) {
  //         const tracks = stream.getTracks();
  //         tracks.forEach((track) => track.stop());
  //       }
  //     }
  //   };
  // });

  return (
    <div>
      <h2>Camera Preview</h2>
      <video  className='w-full h-full' />
    </div>
  );
};

export default CameraPreview;
