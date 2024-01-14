import { tick } from '@/app/assets'
import React from 'react'
import Image from 'next/image'

const OneIconCheckbox = (props) => {
  return (
    <div className={`${props.sizeCss} bg-blue-100 flex flex-row border border-neutral-200 rounded-lg items-center justify-between px-3`}>
        <div className='flex flex-row gap-2'>
        <div className='h-6 w-6 rounded-full bg-indigo-600 flex justify-center items-center text-white'>A</div>
        <div > {props.title}</div>
        </div>
        <button className={`w-[20px] h-[20px] border-2 border-indigo-600 rounded-md  `}
        onClick={()=>{
          props.setNextId(props.id);
        }}
        >
          {props.id==props.nextId ? 
          <Image
          src={tick}
          alt="tick"
          /> :
           null}
        </button>
        


    </div>
  )
}

export default OneIconCheckbox