import React from 'react'

const ProfileButton = () => {
  return (

<div className="w-[218px] self-stretch p-2 bg-white rounded-xl justify-between items-center gap-[15px] flex">
<div className="justify-start items-center gap-2 flex">
<div className="h-10 pl-[13.13px] pr-[12.87px] pt-[7.50px] pb-[8.50px] bg-blue-100 rounded-[10px] justify-center items-center flex">
<div className="text-zinc-950 text-xl font-black leading-normal">M</div>
</div>
<div className="flex-col justify-center items-start gap-0.5 inline-flex">
<div className="text-zinc-950 text-sm font-semibold leading-[18px]">Marwen Essalah</div>
<div className="w-[108px] h-[15px] text-neutral-500 text-xs font-medium leading-[14px]">marwen@etikks.com</div>
</div>
</div>
</div>

  )
}

export default ProfileButton