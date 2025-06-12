import React from 'react'

const OptionButton = (props) => {
    const letters =['A','B','C'];
  return (
    <button className={`min-h-8 ${props.onMobile? 'w-[238px]':'w-[287px]'} transition-all bg-black/50 rounded-md border-2 border-white/80 flex flex-row items-center p-2 gap-2 mb-1`}
    onClick={()=>{
      if(props.external)
      {
        const absoluteUrl = props.destination.startsWith('http://') || props.destination.startsWith('https://') ? props.destination : `https://${props.destination}`;
        window.open(absoluteUrl);
      }
      else{
        props.destination!=''?props.setCurrentCard(parseInt(props.destination)):null;
        if(props.scroll){
        const card = document.getElementById(props.destination);
        if(card){
            card.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
        }
        }
      
      }
    }}
    
    >
        <div className='w-6 min-w-[24px] h-6 bg-blue-700 flex justify-center items-center text-white rounded-xl'>{letters[props.index]}</div>

        <div className='text-white w-full text-start '>
            {props.title}
        </div>

    </button>
  )
}

export default OptionButton