import React, {useState} from 'react'
import Image from 'next/image';
import VideoSelector from '../VideoSelector'; 

const OptionSourceButton = (props) => {
  return props.videoSelection != 'selected' ?(
    <button className='w-full h-8 bg-white flex items-center justify-start gap-2 px-3' onClick={props.onClick}>
        <Image src={props.icon} alt='icon' />
        <div className='text-slate-400 text-sm'>
            {props.title}
        </div>
        
    </button>
  ) : null
}

export default OptionSourceButton