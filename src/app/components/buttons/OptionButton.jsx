import React from 'react'

const OptionButton = (props) => {
    const letters =['A','B','C'];
  return (
    <button className='h-8 w-[90%] bg-black/50 rounded-md border-2 border-white/80 flex flex-row items-center p-2 gap-2 mb-1' 
    onClick={()=>{
      if(props.external)
      {
        const absoluteUrl = props.destination.startsWith('http://') || props.destination.startsWith('https://') ? props.destination : `https://${props.destination}`;
        window.open(absoluteUrl);
      }
    }}
    
    >
        <div className='w-6 h-6 bg-blue-700 flex justify-center items-center text-white rounded-xl'>{letters[props.index]}</div>

        <div className='text-white'>
            {props.title}
        </div>

    </button>
  )
}

export default OptionButton