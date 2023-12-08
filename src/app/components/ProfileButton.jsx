import React from 'react'
import { logout } from '../firebase'
import { db } from '../firebase'

const ProfileButton = (props) => {
  
  return (

<button onClick={logout} className="w-[218px] self-stretch p-2 bg-white rounded-xl justify-between items-center gap-[15px] flex">
<div className="justify-start items-center gap-2 flex">
<div className="h-10 pl-[13.13px] pr-[12.87px] pt-[7.50px] pb-[8.50px] bg-blue-100 rounded-[10px] justify-center items-center flex">
<div className="text-zinc-950 text-xl font-black leading-normal">{props.fullname? props.fullname.charAt(0):''}</div>
</div>
<div className="flex-col justify-center items-start gap-0.5 inline-flex">
<div className="text-zinc-950 text-sm font-semibold leading-[18px]">{props.fullname}</div>
<div className="w-[108px] h-[15px] text-neutral-500 text-xs font-medium leading-[14px]">{props.email}</div>
</div>
</div>
</button>

  )
}

export default ProfileButton