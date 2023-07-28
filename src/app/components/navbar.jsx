import React from 'react'
import ProfileButton from './ProfileButton'
import { convioo } from '../assets'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className='flex row justify-between bg-white mb-px px-[16px]'> 
    <Image src={convioo} alt="icon"  priority={true}/>
        <ProfileButton/>
    </nav>
  )
}

export default Navbar