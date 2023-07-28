import React from 'react'
import { recordIcon, recordIconWhite } from '../assets'
import Image from 'next/image'

const ScenarioCreator = () => {
  return (
    <div className="w-[435px] h-[174px] p-6 bg-white rounded-xl flex-col justify-start items-center gap-4 inline-flex">
    <div className="text-zinc-950 text-base font-medium leading-snug">Create New Scenario</div>
    <div className="flex-col justify-start items-center gap-2 flex">
        <div className="self-stretch h-10 px-4 py-2 bg-zinc-950 rounded justify-center items-center gap-2 inline-flex">
            <Image src={recordIconWhite} alt='recordIcon' className='stroke-white fill-white '/>
            <div className="justify-start items-start flex">
                <div className="text-center text-white text-base font-semibold">From scratch</div>
            </div>
        </div>
        <div className="h-10 px-4 py-2 bg-white rounded border border-neutral-400 justify-center items-center gap-2 inline-flex">
        <Image src={recordIcon} alt='recordIcon'/>
            <div className="justify-start items-start flex">
                <div className="text-center text-zinc-950 text-base font-semibold">Explore template</div>
            </div>
        </div>
    </div>
</div>
    
  )
}

export default ScenarioCreator