import React from 'react'
import Button from './buttons/Button'
import { arrowsRepeat, close } from '../assets';
import { useState, useEffect } from 'react'
import VideoSelector from './VideoSelector';



const VideoDisplay = (props) => {
  const [openModal, setOpenModal] = useState(false);




  return (
    <div>
        
        <div className='w-[340px] h-[172px] rounded-xl relative overflow-hidden '>
          
            <video src={props.src} width={340} height={172} className='absolute' ></video>
            <div className='relative h-full flex flex-col justify-between px-4 py-2 bg-gradient-to-b from-black/60 to-25%'>
              <div className='text-white text-sm font-medium '>
                video title ?
              </div>
              <div className='flex justify-end'>
                <Button title='replace' textColor='text-black' backgroundColor='bg-white' LeftIcon={arrowsRepeat} onClick={()=>{
                  setOpenModal(true);
                }}/>
              </div>
              
            </div>
        </div>
        <VideoSelector isOpen={openModal} setIsOpen={setOpenModal} 
        setVideoURL={props.setVideoURL} setNewVideoId={props.setNewVideoId}
        selectedCardId={props.selectedCardId}
        />



        
    </div>
  )
}

export default VideoDisplay