import React from 'react'
import Image from 'next/image'
const OneIconButton = (props) => {
  return (
    <button className={`${props.width ? props.width : 'w-[140px]'} px-4 py-2 bg-white rounded border border-neutral-400 justify-center items-center gap-2 flex`}
    onClick={props.onClick}
    >
            <Image src={props.src} alt={props.title} width={18}/>
            <div className="justify-start items-start flex">
                <div className="text-center text-zinc-950 text-base font-semibold">{props.title}</div>
            </div>
        </button>
  )
}

export default OneIconButton