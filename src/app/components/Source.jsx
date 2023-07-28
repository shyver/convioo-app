import React from 'react'
import Image from 'next/image'
import { addIcon, recordIcon, upload } from '../assets'
const Source = (props) => {
   return props.bg ? (
    <div className="w-[218px] h-[138px] flex-col justify-start items-start gap-8 inline-flex">
    <div className="text-black text-base font-semibold leading-tight">Source</div>
        <div className="self-stretch h-[86px] flex-col justify-start items-center gap-1.5 flex">
            <div className="w-[217px] px-4 py-2.5 bg-white rounded justify-between items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <Image src={upload} alt="upload"/>
                        <div className="text-zinc-950 text-sm font-medium leading-[18px]">Uploaded</div>
                </div>
                <Image src ={addIcon} alt="addIcon"/>
            </div>
            <div className="w-[217px] px-4 py-2.5 bg-white rounded justify-between items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <Image src={recordIcon} alt="recordIcon"/>
                    <div className="text-zinc-950 text-sm font-medium leading-[18px]">Recordings</div>
                </div>
                <Image src={addIcon} alt ="addIcon"/>
            </div>
        </div>
    </div>
  ) : null
}

export default Source