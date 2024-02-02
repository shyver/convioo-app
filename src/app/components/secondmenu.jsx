import React, {useEffect, useState} from 'react'
import { menustyle } from '../constants'
import Source from './Source'
import Image from 'next/image'
import { folderstack_black } from '../assets'
import { usePathname } from 'next/navigation'

const Secondmenu = (props) => {
    const [selected, setSelected] = useState();
    const path=usePathname();
    useEffect(() => {
      setSelected(path);
    
    }, [path])
    
    
  return (
    <div className={menustyle}>
        <Source bg={props.bg}/>
    <div className="self-stretch flex-col justify-start items-start gap-8 flex">
        <div className="text-black text-base font-semibold leading-tight">Folders</div>
        <div className="self-stretch  flex-col justify-start items-center gap-1.5 flex">
            <div className={` ${selected == props.allDirectory ? 'bg-[#f4f4f4] ' : ''} w-[217px] px-4 py-2.5  rounded justify-between items-center gap-2 inline-flex`} onClick={()=>{
                props.allClick();
                console.log(selected);
                setSelected('/dashboard/library/uploads');
                
            }}>
                <div className="justify-start items-center gap-2 flex">
                    <Image src={folderstack_black} alt="folderstack"/>
                    <div className={`text-zinc-950 text-sm  leading-[18px] ${selected==props.allDirectory ? 'font-semibold' : 'font-medium'} `}>All</div>
                </div>
                <div className="text-right text-zinc-950 text-xs font-medium leading-[18px]">23</div>
            </div>

        </div>
    </div>
</div>
  )
}

export default Secondmenu