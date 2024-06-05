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

    <div className='w-[270px] rounded-2xl flex flex-col items-center h-fit ' >
        <div className='text-black text-sm font-medium w-full text-left h-5'>{props.title}</div>
      
        
      <div id={props.id}>
        <div>

        </div>

        <div className={` ${props.enabled ? 'border-4 border-indigo-600' : ''} rounded-[20px] py-px px-px`}>
      <div className='w-fit h-fit  rounded-[16px] relative   overflow-hidden ' >
        <div className='w-[270px] h-[480px] rounded-[16px]  overflow-hidden  '>
          <video ref={videoRef} src={props.videosrc!=''? props.videosrc : 'https://firebasestorage.googleapis.com/v0/b/convioo-395117.appspot.com/o/glitch.mp4?alt=media&token=f93e2c6b-ecf3-4c18-9b3d-cb5ba4ab80b9'} className='h-full w-full object-cover absolute rounded-[16px]' autoPlay />
        
          <div className={`relative h-full pt-2 bg-gradient-to-b from-black/60 to-10% flex flex-col justify-between items-center ${props.enabled? null : 'bg-black/60' } `}>
            <div className='flex flex-row justify-start items-center w-full pr-4'>
              <span className="text-white w-full px-4"> {formatTime(currentTime)} / {formatTime(duration)}</span>
              <button className={`${isMuted ? '' : 'border'} rounded-lg w-8 h-7 flex justify-center items-center ${isMuted? '' :  'bg-zinc-950 bg-opacity-50'} ${props.enabled? null : 'hidden'}`} onClick={muteUnmuteToggle}>
                <Image src={isMuted ? muted : volume} alt='volume'/>
              </button>
            </div>
        
          
            <button
            onClick={playPauseToggle}
            className={` h-full flex justify-center opacity-80 items-center w-full ${props.enabled? null : 'hidden'}`}
            >
              <Image src={play} alt='play' />
            </button>
            <div className={`w-full  flex flex-col items-center ${props.enabled? null : 'hidden'}`}>
              <div className={` text-stroke w-full flex justify-center font-medium text-center px-2  `}>
                {props.overlay}
              </div>
              {props.options.map((value,index)=>{
              return value.enabled ? (
              <OptionButton onMobile={true} index={index} scroll={true} setCurrentCard={props.setSelectedCardId} title={value.title} key={index} destination={value.destination} external={value.external} />
              ) : null
              })}

            </div>
            <div className='h-[18px] min-h-[18px] bg-indigo-600/75 w-full flex justify-center items-center text-white text-[10px]'>
            
            <Image src={poweredByConvioo} alt='powered by convioo' />
          </div>

          
          </div>
        </div>
                
          
      </div>
      </div>
      {
        props.options.length ? <div className='w-full flex flex-col items-center relative justify-center'>
        <div className='w-[2px] h-14 bg-black'/>

        <SquarePlus onClick={props.nextClick}/>
    </div> : null
      }
      

    </div>
    

  </div>
  )
}

export default ScenarioPiece