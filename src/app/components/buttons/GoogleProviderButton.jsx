import React from 'react'
import Image from 'next/image'
import { google } from '../../assets'

const GoogleProviderButton = (props) => {
  return (
    <button onClick={props.onClick} className="w-[432px] h-12 px-4 py-2 bg-white rounded-lg justify-center items-center gap-2 inline-flex">
    <Image src={google} alt='google icon' />
    <div className="justify-center items-center flex">
        <div className="text-center text-neutral-950 text-base font-medium ">Continue with google</div>
    </div>
</button>
  )
}

export default GoogleProviderButton