import React, {useRef,useState,useEffect} from 'react';
import Image from 'next/image';
import OptionButton from './buttons/OptionButton';
import { play, poweredByConvioo, volume, muted, expand } from '../assets';

const ScenarioCard = (props) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [percentage, setPercentage] = useState(0);




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
          setPercentage((video.currentTime/video.duration)*100);
        });
    
        video.addEventListener('loadedmetadata', () => {
          setIsPlaying(true)
          setDuration(video.duration);
        });
        video.muted = props.isMuted;
    
        // Clean up event listeners on unmount
      }, [isPlaying,duration,videoRef,props.isMuted]);
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
      const playPauseToggle = () => {
        setIsPlaying((prevState) => !prevState);
      };
      const muteUnmuteToggle = () => {
        props.setIsMuted((prevState) => !prevState);
      };
  return (
    <div className='w-fit h-fit  rounded-[16px] relative   overflow-hidden ' >
        <div className={`${props.onMobile ? 'w-[270px] ':'w-[909px]'} transition-all h-[480px] rounded-[16px]  overflow-hidden  `}>
          <video ref={videoRef} src={props.cardData ? props.cardData.videosrc : ''} 
          className='h-full w-full object-cover absolute rounded-[16px]' autoPlay
          onEnded={playPauseToggle} />
        
          <div className={`relative h-full pt-2 bg-gradient-to-b from-black/60 to-10% flex flex-col justify-between items-center `}>
            <div className='flex flex-row justify-start items-center w-full pr-4 gap-4'>
              <span className="text-white w-[140px] min-w-[110px] pl-4 "> {formatTime(currentTime)} / {formatTime(duration)}</span>
                <div className='h-1 rounded w-full bg-[#D0CCCC]/50 flex justify-start items-start'>
                    <div className={`h-1 bg-white rounded transition-all ${isPlaying? 'duration-1000' : 'duration-100'} `} style={{width: `${percentage}%`}} >

                    </div>
                </div>
              <div className='flex flex-row items-center gap-1 w-[75px] h-[30px]'>
                    <button className={`${props.isMuted ? '' : 'border'} rounded-md w-6 h-6  flex justify-center items-center ${props.isMuted? '' :  'bg-zinc-950 bg-opacity-50 p-1'} `} onClick={muteUnmuteToggle}>
                    <Image src={props.isMuted ? muted : volume} alt='volume'/>
                    </button>
                    <button className={`border rounded-md w-6 max-w-6 min-w-6 p-1 h-6 flex justify-center items-center bg-zinc-950 bg-opacity-50 `}>
                    <Image src={expand} alt='expand' />
                    </button>

                </div>
            </div>
        
          
            <button
            onClick={playPauseToggle}
            className={`h-full flex justify-center opacity-80 items-center w-full  `}
            >
              <Image src={play} alt='play' className={isPlaying?'hidden':''}/>
            </button>
            <div className={`w-full flex flex-col items-center `}>
              <div className={` text-stroke w-full flex justify-center font-medium text-center px-2  `}>
                {props.cardData ? props.cardData.overlay : ''}
              </div>


              <div className={`w-full flex ${props.onMobile ? 'flex-col' : 'flex-row gap-x-[8px] px-[16px]'} transition-all duration-300 justify-center items-center `}>
              {props.cardData ? props.cardData.options.map((value,index)=>{
              return value.enabled ? (
              <OptionButton onMobile={props.onMobile} index={index} title={value.title} key={index} destination={value.destination} external={value.external} setCurrentCard={props.setCurrentCard}/>
              ) : null
              }) : null}
              </div>

            </div>
            <div className='h-[18px] min-h-[18px] bg-indigo-600/75 w-full flex justify-center items-center text-white text-[10px]'>
            
            <Image src={poweredByConvioo} alt='powered by convioo' />
          </div>

          
          </div>
        </div>
                
          
      </div>
  )
}

export default ScenarioCard