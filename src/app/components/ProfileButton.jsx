import React from 'react'
import { logout } from '../firebase'
import { db } from '../firebase'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

const ProfileButton = (props) => {
  
  return (
<DropdownMenu>
  <DropdownMenuTrigger>
    
    <div  className="w-[218px] self-stretch p-2 bg-white rounded-xl justify-between items-center gap-[15px] flex">
<div className="justify-start items-center gap-2 flex">
<div className=" w-[40px] h-10 bg-blue-100 rounded-[10px] justify-center items-center flex">
<div className="text-zinc-950 text-xl font-black leading-normal">{props.fullname? props.fullname.charAt(0):''}</div>
</div>
<div className="flex-col justify-center items-start gap-0.5 inline-flex">
<div className="h-[15px] text-zinc-950 text-sm font-semibold leading-[18px] text-ellipsis overflow-clip">{props.fullname}</div>
<div className="w-[160px] h-[15px] text-neutral-500 text-xs font-medium leading-[14px] text-ellipsis overflow-clip">{props.email}</div>
</div>
</div>
</div>


  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
    <DropdownMenuItem onClick={logout} >Log Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


  )
}

export default ProfileButton