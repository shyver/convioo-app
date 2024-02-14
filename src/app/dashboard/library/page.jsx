'use client'
import React, {useCallback, useState, useRef, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { upload, recordIcon, close, smallcross, check } from '@/app/assets'
import OneIconButton from '@/app/components/buttons/OneIconButton'
import Modal from 'react-modal'
import Image from 'next/image'
import VideoThumbnail from 'react-video-thumbnail';
import firebase_app from '@/app/config';
import { getStorage, ref, uploadBytesResumable, listAll } from "firebase/storage";
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import UploadModal from '@/app/components/UploadModal'



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
    <UploadModal uploadIsOpen={uploadIsOpen} setUploadIsOpen={setuploadIsOpen} navigateTo='dashboard/library/uploads' />
    <div className="self-stretch p-6 bg-white rounded-xl justify-between items-center gap-[106px] inline-flex">
        <div className="text-zinc-950 text-base font-medium leading-snug w-[150px]">Record video</div>
        <OneIconButton src={recordIcon} title='Upload' onClick={()=>{
          setRecordIsOpen(true);
        }}/>
        {/* <Modal
        isOpen={recordIsOpen}
        onRequestClose={()=>{setRecordIsOpen(false);}}
        contentLabel="recordModal"
        className='pt-[8%] px-[40%]'
        ariaHideApp={false}
        >
          <div className="w-[739px] h-[516px] px-4 pb-4 bg-white rounded-2xl shadow flex-col justify-start items-start inline-flex">
          <div className="self-stretch py-4 bg-white justify-between items-center gap-[37px] inline-flex">
          <div className="text-zinc-950 text-base font-semibold leading-snug">Uploading File</div>
        <button onClick={()=>{
          setRecordIsOpen(false);
        }}>
        <Image src={close} alt='close'/>
        </button>
    </div>
    <div className='self-stretch grow shrink basis-0 rounded-xl border border-zinc-500 flex-col justify-center items-center gap-2 flex bg-fit bg-center bg-cover overflow-hidden'>
      <RecordView close={!recordIsOpen}/>

    </div>
     </div>       
        </Modal> */}
    </div>
</div>
</div>
  )
}