import React, {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/navigation';
import Modal from 'react-modal'
import Image from 'next/image'
import VideoThumbnail from 'react-video-thumbnail';
import firebase_app from '@/app/config';
import { getStorage, ref, uploadBytesResumable, listAll } from "firebase/storage";
import { upload,  close, smallcross, check } from '@/app/assets'
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const UploadModal = (props) => {
    const router = useRouter();
    const [confirmupload, setConfirmupload] = useState(false);
const [files,setFiles]= useState([]);
const [thumbnail, setThumbnail] = useState('');
const [uploadProgress, setUploadProgress] = useState(0);
const [uploading, setUploading] = useState(false); 
const [user] = useAuthState(auth);
const storageRef = useRef([])
const itemCount= useRef(0);

useEffect(() => {
    if(user){
    const listRef = ref(storage, `${user.uid}/videos/`);

    if(listRef!='') {
      listAll(listRef)
    .then((res) => {
      itemCount.current=res.items.length;
    });
    }

    }
  
  }, [user])

    function MyDropzone() {

        const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles?.length) {
            setFiles(...acceptedFiles.map(file =>Object.assign(file, {preview: URL.createObjectURL(file)}) )
            
            );
    
            if(files)
            {
            storageRef.current=ref(storage, `${user.uid}/videos/Convioo #${itemCount.current}`);
            props.setUploadIsOpen(false);
            setConfirmupload(true);
            console.log('itemcount = '+itemCount.current);
            }
        }
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop , accept: 'video/mp4',
    })
    
      return itemCount.current<5 ?(
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
      ) : (<div className="text-zinc-500 text-sm font-medium leading-snug mt-4">You already have 5 videos, consider deleting some.</div>)
    }
    function closeModal() {
        props.setUploadIsOpen(false);
      }

  return (
    <div>
    <Modal isOpen={props.uploadIsOpen}
        onRequestClose={closeModal}
        contentLabel="dropzone"
        className={`w-fit h-fit bg-transparent `}
        overlayClassName="flex items-center justify-center fixed inset-0 bg-black/80"
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
          props.setuploadIsOpen(true);
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
    thumbnailHandler={(thumbnail) => {
    files.length!=0 ? setThumbnail(thumbnail): null;
    }}
    width={0}
    /> : null}
    </div> 
            <div className="flex-col justify-start items-start inline-flex">
                <div className="w-[916.53px] h-[452.50px] pl-[318.76px] pr-[317.76px] pt-[167.25px] pb-[205.25px] justify-center items-center inline-flex">
                    <div className="self-stretch p-3 bg-white rounded-xl justify-center items-center gap-4 inline-flex">
                        <div className={`text-zinc-950 text-base font-bold leading-none ${uploading ? "hidden" :  "" }`}>Use this video?</div>
                        <div className={`justify-center items-center gap-2 flex ${uploading ? "hidden" :  "" }`}>
                          <button onClick={()=>{
                            setConfirmupload(false);
                            props.setuploadIsOpen(true);
                          }}>
                            <div className="p-4 bg-rose-100 rounded-xl justify-start items-center gap-4 flex">
                                <Image src={smallcross} alt='smallcross'/>
                            </div>
                            </button>
                            <button className="p-4 bg-teal-100 rounded-xl justify-start items-center gap-4 flex" onClick={() => {
                              setUploading(true);
                              const uploadTask = uploadBytesResumable(storageRef.current, files);
                              uploadTask.on('state_changed', 
                                (snapshot) => {
                                  // Observe state change events such as progress, pause, and resume
                                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                  setUploadProgress(progress);
                                  
                                  switch (snapshot.state) {
                                    case 'paused':
                                      console.log('Upload is paused');
                                      break;
                                    case 'running':
                                      console.log('Upload is running');
                                      break;
                                  }
                                }, 
                                (error) => {
                                  // Handle unsuccessful uploads
                                }, 
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref)
                                    .then((downloadURL) => {
                                    console.log('File available at', downloadURL);
                                    props.handleClick(user, props.projectName, downloadURL, router)
                                    })
                                  setUploading(false);
                                  setConfirmupload(false);
                                  props.setUploadIsOpen(false);
                                  
                                  
                                  // Handle successful uploads on complete
                                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                  router.replace(props.navigateTo)
                                }
                              );
                              
                            }}>
                                <Image src={check} alt='check'/>
                            </button>
                        </div>
                        <div className={`w-[104px] h-14 p-4 bg-zinc-100 rounded-xl justify-start items-center gap-4 inline-flex ${uploading ? "" :  "hidden" } `}>

                        <div className="w-6 h-6 relative">
                            <div className="w-px h-px left-0 top-0 absolute" />
                        </div>
                        <div className="text-emerald-500 text-base font-semibold leading-none">{uploadProgress.toFixed(0)}%</div>
                        
                    
                    </div>
                    <div className={`text-zinc-950 text-base font-bold leading-none  ${uploading ? "" :  "hidden" }`}>Uploading video</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </Modal>
        </div>
  )
}

export default UploadModal