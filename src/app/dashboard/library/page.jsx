'use client'
import React, {useCallback, useState, useRef, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { upload, recordIcon, close, smallcross, check } from '@/app/assets'
import OneIconButton from '@/app/components/buttons/OneIconButton'
import Modal from 'react-modal'
import Image from 'next/image'
import firebase_app from '@/app/config';
import { getStorage, ref, uploadBytesResumable, listAll } from "firebase/storage";
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import UploadModal from '@/app/components/UploadModal'
import RecordModal from '@/app/components/RecordModal'



export default function Page ()  {
  const router = useRouter();

const [uploadIsOpen, setuploadIsOpen] = React.useState(false);
const [recordIsOpen, setRecordIsOpen] = useState(false);















  const VideoPreview = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream,videoRef]);
    if (!stream) {
      return null;
    }
    return <video ref={videoRef} width={500} height={500} autoPlay controls />;
  };
  


  // const RecordView = () => (
  //   <div  className='w-full'>
  //     <ReactMediaRecorder 
  //       video askPermissionOnMount={true} 
  //       render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
  //         <div>
            
  //           <button onClick={startRecording}>Start Recording</button>
  //           <button onClick={stopRecording}>Stop Recording</button>
  //           {/* <CameraPreview close={close}/> */}
  //           {/* <VideoPreview stream={previewStream} />;
  //           <video src={mediaBlobUrl} controls autoPlay loop /> */}
  //         </div>
  //       )}
  //     />
  //   </div>
  // );






  return (
    
    <div className='flex justify-center pt-[10%] bg-[#f4f4f4] w-full overflow-hidden'>
    <div className="w-[374px] flex-col justify-start items-center gap-4 inline-flex ">
    <div className="text-zinc-950 text-lg font-medium leading-relaxed tracking-tight">Connect sources to start creating Convis</div>
    <div className="self-stretch p-6 bg-white rounded-xl flex flex-row justify-between items-center">
        <div className="text-zinc-950  font-medium ">Select files to upload</div>
        <OneIconButton src={upload} title='Upload'
        width='w-[110px]'
        onClick={()=>{
          setuploadIsOpen(true );
        }}/>

        
    </div>
    <UploadModal uploadIsOpen={uploadIsOpen} setUploadIsOpen={setuploadIsOpen} navigateTo='/dashboard/library/uploads' />
    <div className="self-stretch p-6 bg-white rounded-xl justify-between items-center gap-[106px] inline-flex">
        <div className="text-zinc-950 text-base font-medium leading-snug w-[150px]">Record video</div>
        <OneIconButton src={recordIcon} title='Upload' onClick={()=>{
          setRecordIsOpen(true);
        }}/>
        <RecordModal  recordIsOpen={recordIsOpen} setRecordIsOpen={setRecordIsOpen} />
    </div>
</div>
</div>
  )
}