import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { upload } from '../assets';
import Image from 'next/image';

function MyDropzone() {
    const [files,setFiles]= useState([]);
  const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles?.length) {
        setFiles(...acceptedFiles.map(file =>Object.assign(file, {preview: URL.createObjectURL(file)}) )
        )
    }
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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


        <div >{files.name}
        { files.length!=0 ? <video width="320" height="240" controls >
            <source src={files.preview} type='video/mp4' />
            </video> : null} 
        </div>

    </form>
  )
}

export default MyDropzone