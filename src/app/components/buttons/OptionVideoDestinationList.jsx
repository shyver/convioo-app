import React from 'react'
import Image from 'next/image'

const OptionVideoDestinationList = (props) => {
  return (
    <div className='flex flex-col'>
      {props.videoSelection=='selecting'? 
      props.cards.map((card,index)=>{
        
        return props.selectedCardId == index ? null : (
          <button key={index} className='border bg-white rounded-lg h-12 flex flex-row items-center overflow-hidden gap-4 justify-start'
          onClick={()=>{
            props.handleOptionsEdit(props.option.id,props.option.title,
              `${index}`,false,props.option.enabled);
              props.setVideoSelection('selected');

          }}
          >
            <div className='h-full w-12  overflow-hidden'>
            <video src={card.videosrc} className='object-cover relative h-full w-full'></video>
            </div>
              <div className='bg-indigo-600 h-5 w-5 rounded-full flex justify-center items-center'> {index} </div>
            <div className='text-black'> {card.title}</div>
          </button>
        )
      }) : null
    
    }
    </div>
  )
}

export default OptionVideoDestinationList