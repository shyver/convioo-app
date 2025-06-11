import React from 'react'
import Button from './buttons/Button'
import { arrowsRepeat, close, down } from '../assets';
import { useState, useEffect } from 'react'
import VideoSelector from './VideoSelector';
import Image from 'next/image';



const VideoDisplay = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideoName, setSelectedVideoName] = useState('')
  useEffect(()=>{
    if(props.src&& props.user)
    {
      const url = props.src;
      const pathParts = url.split('/');
      let encodedVideoName = pathParts[pathParts.length - 1];
  
      // Remove the alt parameter
      encodedVideoName = encodedVideoName.split('?alt')[0];
      let videoName = decodeURIComponent(encodedVideoName);
      videoName = videoName.split(`${props.user.uid}/videos/`)[1];
      console.log(videoName);
      setSelectedVideoName(videoName);

    }

  },[props.src,props.user])



  return (
    <div>
        

            {props.src? 
                    <div className='w-[340px] h-[172px] rounded-xl relative overflow-hidden bg-black '>
            <video src={props.src} width={340} height={172} className='absolute h-[172px]' ></video>
            <div className='relative h-full flex flex-col justify-between px-4 py-2 bg-gradient-to-b from-black/60 to-25%'>
              <div className='text-white text-sm font-medium '>
                {selectedVideoName}
              </div>
              <div className='flex justify-end'>
                <Button title='replace' textColor='text-black' backgroundColor='bg-white' LeftIcon={arrowsRepeat} onClick={()=>{
                  setOpenModal(true);
                }}/>
              </div>
              
            </div>
            </div>
          :
           <button className='w-[340px] h-[50px] border rounded-lg flex flex-row justify-between items-center p-2'
           onClick={()=>setOpenModal(true)}>
              <div className='text-[14px] text-gray-400'>
                Choose File
              </div>
              <div>
                <Image src={down} alt="down" />
              </div>
           </button>
          
          }
            
        
        <VideoSelector isOpen={openModal} setIsOpen={setOpenModal} 
        setVideoURL={props.setVideoURL} setNewVideoId={props.setNewVideoId}
        selectedCardId={props.selectedCardId} handleCardsEdit={props.handleCardsEdit}
        />



        
    </div>
  )
}

export default VideoDisplay