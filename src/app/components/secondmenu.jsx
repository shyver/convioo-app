import React from 'react'
import { menustyle } from '../constants'
import Source from './Source'

const Secondmenu = (props) => {
  return (
    <div className={menustyle}>
        <Source bg={props.bg}/>
    <div className="self-stretch h-[230px] flex-col justify-start items-start gap-8 flex">
        <div className="text-black text-base font-semibold leading-tight">Folders</div>
        <div className="self-stretch h-[178px] flex-col justify-start items-center gap-1.5 flex">
            <div className="w-[217px] px-4 py-2.5 bg-white rounded justify-between items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <div className="w-5 h-5 relative" />
                    <div className="text-zinc-950 text-sm font-medium leading-[18px]">All</div>
                </div>
                <div className="text-right text-zinc-950 text-xs font-medium leading-[18px]">23</div>
            </div>
            <div className="w-[217px] px-4 py-2.5 bg-white rounded justify-between items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <div className="w-5 h-5 relative" />
                    <div className="text-zinc-950 text-sm font-medium leading-[18px]">Folder 1</div>
                </div>
                <div className="text-right text-zinc-950 text-xs font-medium leading-[18px]">23</div>
            </div>
            <div className="w-[217px] px-4 py-2.5 bg-white rounded justify-between items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <div className="w-5 h-5 relative" />
                    <div className="text-zinc-950 text-sm font-medium leading-[18px]">Folder 2</div>
                </div>
                <div className="text-right text-zinc-950 text-xs font-medium leading-[18px]">23</div>
            </div>
            <div className="w-[217px] px-4 py-2.5 bg-white rounded justify-between items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <div className="w-5 h-5 relative" />
                    <div className="text-zinc-950 text-sm font-medium leading-[18px]">No folder</div>
                </div>
                <div className="text-right text-zinc-950 text-xs font-medium leading-[18px]">23</div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Secondmenu