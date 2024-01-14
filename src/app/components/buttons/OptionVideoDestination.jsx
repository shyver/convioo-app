import React from 'react'
import Image from 'next/image'
import { trash } from '@/app/assets';

const OptionVideoDestination = (props) => {
  return props.videoSelection == 'selected' ?(
    <div className='flex flex-row gap-1'>
    <div className='h-[50px]  w-[90%] bg-white flex flex-row rounded-lg border justify-start items-center gap-2'>

        <div className='h-full w-[50px] overflow-hidden'>
            <video src={props.cards[props.option.destination] ? props.cards[props.option.destination].videosrc : ''}
            className='object-cover relative h-full w-full'
            ></video>
        </div>
        <div className='bg-indigo-600 h-5 w-5 flex items-center justify-center rounded-full'>
            {props.option.destination}
        </div>

        <div className='text-black'>
            {props.cards[props.option.destination] ? props.cards[props.option.destination].title : ''}
        </div>
        </div>
        <button onClick={()=>{
            props.handleOptionsEdit(props.option.id,props.option.title,'',false,props.option.enabled);
            props.setVideoSelection('idle');
            console.log('CAAAARDS',props.cards);
        }}>
            <Image src={trash} alt='trash' />
        </button>
    </div>
  ) : null;
}

export default OptionVideoDestination