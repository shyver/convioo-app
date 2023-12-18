import React from 'react'
import Image from 'next/image'

const SourceButton = (props) => {
  return (
    <button className="w-[432px] h-[70px] p-6 bg-white rounded-xl border border-blue-100 justify-start items-center gap-[106px] inline-flex hover:transition-colors hover:bg-[#f4f4f4] duration-1000 hover:border-[#7783e6]"
    onClick={props.onClick}
    >
    <div className="justify-start items-center gap-2 flex ">
        <Image src={props.icon} alt='icon' className='fill-blue-600'/>
        <div className="text-zinc-950 text-base font-medium leading-snug">{props.title}</div>
    </div>
</button>
  )
}

export default SourceButton