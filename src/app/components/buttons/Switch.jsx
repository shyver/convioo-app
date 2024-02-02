'use client'
import React,{useState} from 'react'

const Switch = (props) => {

  return (
    <div className={`h-[40px] ${props.width} bg-[#F4F4F4] rounded-lg flex flex-row justify-evenly items-center overflow-hidden p-[2px] border border-neutral-200`} >
      <div className={`${props.width} h-[40px] absolute z-0 `} >
      <div className={`w-[50%] h-full bg-white rounded-md transition-all ${props.rightSelected? 'ml-[50%]':''}`}>

      </div>
      </div>
        <button className={`w-[50%] h-full z-10 rounded-md ${props.rightSelected? 'text-[#C3C3C3]' :'text-zinc-950'} text-sm filter font-semibold leading-[14px] flex justify-center items-center`} onClick={()=>{
            props.setRightSelected(false);
            {props.LeftOnClick ?props.LeftOnClick() : null;}
        }}> {props.LeftTitle}</button>
        <button className={`w-[50%] h-full z-10 rounded-md ${ props.rightSelected ? 'text-zinc-950':'text-[#C3C3C3]'} text-sm font-semibold leading-[14px] flex justify-center items-center`} onClick={()=>{
            props.setRightSelected(true);
            {props.RightOnClick ? props.RightOnClick() : null;}
        }}> {props.RightTitle}</button>
        
    </div>
  )
}

export default Switch