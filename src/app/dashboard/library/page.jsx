'use client'
import React, {useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { upload, recordIcon, close, smallcross, check } from '@/app/assets'
import OneIconButton from '@/app/components/buttons/OneIconButton'
import Modal from 'react-modal'
import Image from 'next/image'
import VideoThumbnail from 'react-video-thumbnail';
import VideoRecorder from 'react-video-recorder'

export default function Page ()  {
    function MyDropzone() {

    const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles?.length) {
        setFiles(...acceptedFiles.map(file =>Object.assign(file, {preview: URL.createObjectURL(file)}) )
        
        );
        console.log(`length : ${files.length}`);
        if(files.length)
        console.log(files);
        {
        setuploadIsOpen(false);
        setConfirmupload(true);
        }
    }
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop , accept: 'video/mp4',
})

  return (
    <form>
    <div {...getRootProps({className: 'w-[707px] h-[446px] rounded-xl border border-zinc-500 flex-col justify-center items-center gap-2 inline-flex border-dashed'})}>
      <input {...getInputProps()} />
      <div className='w-[707px] h-[446px] flex-col justify-center items-center gap-2 inline-flex'>
        <Image src={upload} alt='upload' className='w-12 h-12' />
      {
        
        isDragActive ?
          <p>Drop the files here ...</p> :
          <div className="text-center"><span className="text-zinc-950 text-sm font-medium leading-snug">Drag & drop or </span><span className="text-zinc-950 text-sm font-bold underline leading-snug">choose file</span><span className="text-zinc-950 text-sm font-medium leading-snug"> to upload</span></div>
        
      }
      <div className="text-zinc-500 text-sm font-medium leading-snug mt-4">Only 5 videos will be uploaded.</div>
      </div>
    </div>
    </form>
  )
}

  function closeModal() {
    setuploadIsOpen(false);
  }



  const [uploadIsOpen, setuploadIsOpen] = React.useState(false);
  const [recordIsOpen, setRecordIsOpen] = useState(false);
  const [confirmupload, setConfirmupload] = useState(false);
  const [files,setFiles]= useState([]);
  const [thumbnail, setThumbnail] = useState('');
  return (
    <div className='flex justify-center pt-[10%]'>
    <div className="w-[374px] h-[234px] flex-col justify-start items-center gap-4 inline-flex">
    <div className="text-zinc-950 text-lg font-medium leading-relaxed tracking-tight">Connect sources to start creating Convis</div>
    <div className="self-stretch p-6 bg-white rounded-xl justify-between items-center gap-[106px] inline-flex">
        <div className="text-zinc-950 text-base font-medium leading-snug w-[150px]">Select files to upload</div>
        <OneIconButton src={upload} title='Upload' onClick={()=>{
            setuploadIsOpen(true);
        }}/>
        <Modal isOpen={uploadIsOpen}
        onRequestClose={closeModal}
        contentLabel="dropzone"
        className='pt-[8%] px-[40%]'
        ariaHideApp={false}
        >
          <div className='w-[739px] h-[516px] px-4 pb-4 bg-white rounded-2xl shadow flex-col justify-start items-start inline-flex'>
            <div className='h-[50px] inline-flex items-center justify-between w-full'>
            <div className="text-zinc-950 text-base font-semibold leading-snug ">Upload File</div>
            <Image src={close} alt={close} onClick={closeModal}/>

            </div>
          <MyDropzone/>
          </div>
        </Modal>
        <Modal 
        isOpen={confirmupload}
        onRequestClose={closeModal}
        contentLabel="dropzone"
        className='pt-[8%] px-[40%]'
        ariaHideApp={false}
        >
          <div className="w-[739px] h-[516px] px-4 pb-4 bg-white rounded-2xl shadow flex-col justify-start items-start inline-flex">
          <div className="self-stretch py-4 bg-white justify-between items-center gap-[37px] inline-flex">
          <div className="text-zinc-950 text-base font-semibold leading-snug">Uploading File</div>
        <button onClick={()=>{
          setConfirmupload(false);
          setuploadIsOpen(true);
        }}>
        <Image src={close} alt='close'/>
        </button>
    </div>
    <div className='self-stretch grow shrink basis-0 rounded-xl border border-zinc-500 flex-col justify-center items-center gap-2 flex bg-fit bg-center bg-cover' style={{
            backgroundImage:
              `url(${thumbnail})`,
          }}>
        <div className="self-stretch grow shrink basis-0 justify-center items-center inline-flex">
        <div className='hidden'>
        { files.length!=0 ? <VideoThumbnail
    videoUrl={files.preview}
    thumbnailHandler={(thumbnail) => {console.log(thumbnail);
    files.length!=0 ? setThumbnail(thumbnail): null;
    }}
    width={0}
    /> : null}
    </div> 
            <div className="flex-col justify-start items-start inline-flex">
                <div className="w-[916.53px] h-[452.50px] pl-[318.76px] pr-[317.76px] pt-[167.25px] pb-[205.25px] justify-center items-center inline-flex">
                    <div className="self-stretch p-3 bg-white rounded-xl justify-center items-center gap-4 inline-flex">
                        <div className="text-zinc-950 text-base font-bold leading-none">Use this video?</div>
                        <div className="justify-center items-center gap-2 flex">
                          <button onClick={()=>{
                            setConfirmupload(false);
                            setuploadIsOpen(true);
                          }}>
                            <div className="p-4 bg-rose-100 rounded-xl justify-start items-center gap-4 flex">
                                <Image src={smallcross} alt='smallcross'/>
                            </div>
                            </button>
                            <div className="p-4 bg-teal-100 rounded-xl justify-start items-center gap-4 flex">
                                <Image src={check} alt='check'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </Modal>
    </div>
    <div className="self-stretch p-6 bg-white rounded-xl justify-between items-center gap-[106px] inline-flex">
        <div className="text-zinc-950 text-base font-medium leading-snug w-[150px]">Record video</div>
        <OneIconButton src={recordIcon} title='Upload' onClick={()=>{
          setRecordIsOpen(true);
        }}/>
        <Modal
        isOpen={recordIsOpen}
        onRequestClose={()=>{setRecordIsOpen(false)}}
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
    <VideoRecorder
            isOnInitially
    onRecordingComplete={(videoBlob) => {
      // Do something with the video... x
      console.log('videoBlob', videoBlob)
    }}
  
  />  
    </div>
     </div>       
    </Modal>
    </div>
</div>
</div>
  )
}









// <Dropzone onDrop={handleDrop} >
//   {({getRootProps, getInputProps}) => (
//           <div className="w-[500px] h-[350px] px-4 pb-4 bg-white rounded-2xl shadow flex-col justify-start items-start inline-flex">
//     <div className="self-stretch py-4 bg-white justify-between items-center gap-[37px] inline-flex">
//         <div className="text-zinc-950 text-base font-semibold leading-snug">Upload File</div>
//         <button onClick={()=>{
//           setuploadIsOpen(false);
//         }}>
//         <Image src={close} alt='close'/>
//         </button>
//     </div>
//     <div className="self-stretch grow shrink basis-0 rounded-xl border border-zinc-500 flex-col justify-center items-center gap-2 flex">
//         <Image src={upload} alt='upload' width={35}/>
//         <div className="text-center"><span className="text-zinc-950 text-sm font-medium leading-snug">Drag & drop or </span>
//         <label htmlFor='file-upload'> <span className="text-zinc-950 text-sm font-bold underline leading-snug">choose file</span></label>
//         <input type='file' id='file-upload' className='hidden' accept='video/*' onChange={handleDrop}  />
//         <span className="text-zinc-950 text-sm font-medium leading-snug"> to upload</span>
        
//         </div>
        
//         <div className="text-zinc-500 text-sm font-medium leading-snug">Only 5 videos will be uploaded.</div>
//     </div>
// </div>  )}
// </Dropzone>