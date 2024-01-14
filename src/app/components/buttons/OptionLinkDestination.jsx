import React from 'react'
import Image from 'next/image';
import { link, trash } from '@/app/assets';

const OptionLinkDestination = (props) => {
    return props.videoSelection == 'link' ?(
        <div className='flex flex-row gap-1'>
        <div className='h-[50px]  w-[90%] bg-white flex flex-row rounded-lg border justify-start items-center gap-2 px-4'>

            
            
            <Image src={link} alt='link'/>
            <input type="text" className='text-black' value={props.option.destination} onChange={(event)=>{
                props.handleOptionsEdit(props.option.id,props.option.title,event.target.value,true,props.option.enabled);
            }}/>
            </div>
            <button onClick={()=>{
                props.handleOptionsEdit(props.option.id,props.option.title,'',false,props.option.enabled);
                props.setVideoSelection('idle');
            }}>
                <Image src={trash} alt='trash' />
            </button>
        </div>
      ) : null;
}

export default OptionLinkDestination