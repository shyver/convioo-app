import React from 'react'
import Image from 'next/image'
const Button = (props) => {
  return (
    <button type={props.type?? null} className={`${props.width} ${ props.height ? props.height : 'h-10'} ${ props.padding ? props.padding : ' py-2'} ${props.backgroundColor} rounded justify-center items-center gap-2 inline-flex ${props.border ? 'border' : ''} ${props.borderColor}`} onClick={props.onClick}>
      <div>
      {props.LeftIcon ?(<Image src={props.LeftIcon} alt="left icon" className={`w-fit pl-[7.83px] pr-[6.10px] py-[4.41px] justify-center items-center flex ${props.LeftIcon ? '' : 'hidden'} ${props.flipLeftIcon? 'rotate-180' : ''}`} />) : null}
      </div>

    
    <div className="justify-start items-start flex w-fit ">
        <div className={`text-center ${props.textColor} text-base font-semibold`}>{props.title}</div>
    </div>
    <div>
    {props.RightIcon ? (<Image src={props.RightIcon} alt="right icon" className={`w-fit pl-[7.83px] pr-[6.10px] py-[4.41px] justify-center items-center flex ${props.RightIcon ? '' : 'hidden'} `} />) : null}
    </div>

</button>
  )
}

export default Button