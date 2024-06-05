import { down, multiChoice } from '@/app/assets'
import React from 'react'
import Image from 'next/image'

const DropList = () => {
  return (
    <div className='w-[95%] h-[50px] min-h-[50px] bg-zinc-100 flex items-center px-4 rounded-xl border border-neutral-200 flex-row justify-between'>
        <div className='flex flex-row gap-2'>
        <Image src={multiChoice} alt='multichoice'/>
        <div className='text-zinc-950 text-base font-medium '>Multiple choices</div>
        </div>
        <Image src={down} alt='down'/>
    </div>
  )
}

export default DropList