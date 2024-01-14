'use client'
import React,{useState} from 'react'

const Switch = (props) => {

  return (
    <div className='h-[40px]  w-[350px] bg-[#F4F4F4] rounded-lg flex flex-row justify-evenly items-center overflow-hidden p-[2px]'>
        <button className={`w-[50%] h-full ${props.rightSelected? '' :'bg-white'} rounded-lg ${props.rightSelected? 'text-[#C3C3C3]' :'text-zinc-950'} text-sm font-semibold leading-[14px]`} onClick={()=>{
            props.setRightSelected(false);
            {props.LeftOnClick ?props.LeftOnClick() : null;}
        }}> {props.LeftTitle}</button>
        <button className={`w-[50%] h-full ${props.rightSelected? 'bg-white' :''} rounded-lg ${ props.rightSelected ? 'text-zinc-950':'text-[#C3C3C3]'} text-sm font-semibold leading-[14px]`} onClick={()=>{
            props.setRightSelected(true);
            {props.RightOnClick ? props.RightOnClick() : null;}
        }}> {props.RightTitle}</button>
        
    </div>
  )
}

export default Switch