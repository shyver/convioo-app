'use client'
import React from 'react'

const InputBox = (props) => {
  return (
    <div className="self-stretch  flex-col justify-start items-start gap-1 flex">
          <div className={`text-zinc-950 ${props.titleStyle} font-medium`}>{props.title}</div>
          <input className={`self-stretch ${props.height ? props.height : 'h-[50px]'} px-2 py-4 bg-white rounded-lg border border-neutral-200 justify-start items-center inline-flex text-black`} 
          placeholder={props.placeholder}
           onChange={(event)=>{
            props.handleCardsEdit(props.edit=='videoName'?event.target.value : false, props.edit=='overlay'? event.target.value : false,false)
          }} 

          value={props.defaultValue}/>
        </div>
  )
}

export default InputBox