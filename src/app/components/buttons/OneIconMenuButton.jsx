import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const OneIconButton = (props) => {
  return (
    <div onClick={props.onClick} className={`self-stretch ${props.bg} flex items-start`}>
    <div className='self-stretch px-4 py-2.5 rounded justify-start items-start gap-2 inline-flex'>
                <Image src={props.image} alt ="Icon"/>
                <div className="text-zinc-950 text-sm font-medium leading-[18px]">{props.title}</div>
            </div>
            </div>
  )
}

export default OneIconButton