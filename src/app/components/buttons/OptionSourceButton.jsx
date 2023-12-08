import React from 'react'
import Image from 'next/image';

const OptionSourceButton = (props) => {
  return (
    <button className='w-full h-8 bg-white flex items-center justify-start gap-2 px-3' onClick={props.onClick}>
        <Image src={props.icon} alt='icon' />
        {props.switched? <input autoFocus onBlur={props.onBlur} defaultValue={props.defaultValue}
        />:<div className='text-slate-400 text-sm'>
            {props.title}
        </div>}
        
    </button>
  )
}

export default OptionSourceButton