import React, {useState} from 'react'
import Image from 'next/image';
import VideoSelector from '../VideoSelector'; 

const OptionSourceButton = (props) => {
  const [VideoURL, setVideoURL] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button className='w-full h-8 bg-white flex items-center justify-start gap-2 px-3' onClick={props.onClick}>
        <Image src={props.icon} alt='icon' />
        {props.switched? <input className='text-black' autoFocus onBlur={props.onBlur} defaultValue={props.defaultValue}
        />:<div className='text-slate-400 text-sm'>
            {props.title}
        </div>}
        <VideoSelector isOpen={isOpen} setIsOpen={setIsOpen} setVideoURL={setVideoURL}/>
        
    </button>
  )
}

export default OptionSourceButton