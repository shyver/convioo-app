import React, {useState,useEffect,useCallback, useRef} from 'react'
import Modal from 'react-modal'
import Webcam from "react-webcam";
const RecordModal = (props) => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [videoConstraints, setVideoConstraints] = useState({

        aspectRatio: 9/16,
        facingMode: {exact: "user"}
      });
      useEffect(() => {
        const handleResize = () => {
          setVideoConstraints({

            aspectRatio: 9/16,
            facingMode: {exact: "user"}
          });
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const handleDataAvailable = useCallback(
        ({ data }) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
      );
      const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
      }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

      const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
      }, [mediaRecorderRef, setCapturing]);
    
      const handleUpload = useCallback(() => {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: "video/mp4",
          });
        //   const url = URL.createObjectURL(blob);
        //   const a = document.createElement("a");
        //   document.body.appendChild(a);
        //   a.style = "display: none";
        //   a.href = url;
        //   a.download = "react-webcam-stream-capture.webm";
        //   a.click();
        //   window.URL.revokeObjectURL(url);
        //   setRecordedChunks([]);
        }
      }, [recordedChunks]);
    


  return (
    <Modal
    isOpen={props.recordIsOpen}
    onRequestClose={()=>{props.setRecordIsOpen(false);}}
    contentLabel="recordModal"
    className={`w-fit h-fit bg-transparent `}
    overlayClassName="flex items-center justify-center fixed inset-0 bg-black/80"
    ariaHideApp={false}
    >
      <div className='p-2 rounded-2xl bg-white'>
        <div className='w-fit h-fit rounded-lg overflow-hidden'>
        {recordedChunks.length > 0 ? 
    <video 
    src={URL.createObjectURL(new Blob(recordedChunks, { type: "video/mp4" }))}
    controls
     />:       <Webcam 
     ref={webcamRef}
     imageSmoothing={true}
       mirrored={true} videoConstraints={videoConstraints} />
    }

              {capturing ? (
        <button className='bg-red-500' onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button className='bg-red-500' onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button className='bg-blue-500' onClick={handleUpload}>Upload</button>
      )}
        </div>
      </div>
    </Modal>
  )
}

export default RecordModal