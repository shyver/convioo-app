import React, { useRef, useState, useEffect } from 'react';
import { play, poweredByConvioo, volume, muted } from '../assets';
import Image from 'next/image';
import OptionButton from './buttons/OptionButton';
import SquarePlus from './buttons/SquarePlus';
const ScenarioPiece = (props) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);


  useEffect(() => {
    const video = videoRef.current;

    // Handle video play/pause
    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }

    // Update current time
    video.addEventListener('timeupdate', () => {
      setCurrentTime(video.currentTime)
      setDuration(video.duration);
    });

    video.addEventListener('loadedmetadata', () => {
      setIsPlaying(true)
      setDuration(video.duration);
    });
    video.muted = isMuted;

    // Clean up event listeners on unmount
  }, [isPlaying,duration,videoRef,isMuted]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  const playPauseToggle = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const muteUnmuteToggle = () => {
    setIsMuted((prevState) => !prevState);
  };
  return (

    <div className='w-[270px] rounded-b-2xl flex flex-col items-center '>
      <div className='flex flex-row items-end justify-between w-full '>
        <div className='text-black text-sm font-medium w-[50%] '>{props.title}</div>
        <div className={`w-[60%] ${props.prev? '':'hidden'}`}>
          <div className='w-fit flex flex-col items-center'>
            <div className='w-[2px] h-10 bg-black'/>
            <SquarePlus/>
            <div className='w-[2px] h-14 bg-black'/>
          </div>
        </div>
        <div className={`h-32 ${props.prev? 'hidden' : ''} `}>

        </div>
      
      </div>
      
      
      
      <div className='w-[270px] h-[480px] rounded-2xl relative '>
        <div className='w-[270px] h-[480px] rounded-2xl  overflow-hidden'>
          <video ref={videoRef} src={props.videosrc} className='h-full w-full object-cover absolute rounded-2xl' autoPlay />
        
          <div className='relative h-full pt-2 bg-gradient-to-b from-black/60 to-10% flex flex-col justify-between items-center'>
            <div className='flex flex-row justify-start items-center w-full pr-4'>
              <span className="text-white w-full px-4"> {formatTime(currentTime)} / {formatTime(duration)}</span>
              <button className={`${isMuted ? '' : 'border'} rounded-lg w-8 h-7 flex justify-center items-center ${isMuted? '' :  'bg-zinc-950 bg-opacity-50'}`} onClick={muteUnmuteToggle}>
                <Image src={isMuted ? muted : volume} alt='volume'/>
              </button>
            </div>
        
          
            <button
            onClick={playPauseToggle}
            className={`h-full flex justify-center items-center w-full`}
            >
              <Image src={play} alt='play'/>
            </button>
            <div className='w-full flex flex-col items-center'>
              <div className=' text-stroke w-full flex justify-center font-medium text-center px-2'>
                {props.overlay}
              </div>
              {props.options.map((value,index)=>{
              return value.enabled ? (
              <OptionButton index={index} title={value.title} key={index} destination={value.destination} external={value.external} />
              ) : null
              })}
              <div className='h-[18px] bg-indigo-600/75 w-full flex justify-center items-center text-white text-[10px]'>
            
                <Image src={poweredByConvioo} alt='powered by convioo' />
              </div>
            </div>
          
          </div>
        </div>
        <div className='w-full flex flex-col items-center relative justify-center'>
          <div className='w-[2px] h-14 bg-black'/>
          <SquarePlus onClick={props.nextClick}/>
        
        </div>
          
      </div>
    

    </div>
  )
}

export default ScenarioPiece