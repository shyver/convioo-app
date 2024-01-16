import React from 'react'
import Image from 'next/image'
import { check, tick } from '@/app/assets'
const Checkbox = (props) => {
  return (
    <button type='button' className={`h-5 w-5 border-2 ${props.checked ? 'border-indigo-600':'border-black'}  rounded-md `}
    onClick={()=>{
        props.setChecked(!props.checked);
    }}>
        {props.checked ? <Image src={tick} alt='check'/>:null}
    </button>
  )
}

export default Checkbox