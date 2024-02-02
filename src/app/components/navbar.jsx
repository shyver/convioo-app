import React from 'react'
import ProfileButton from './ProfileButton'
import { convioo } from '../assets'
import Image from 'next/image'
const Navbar = (props) => {
  return (
    <nav className='flex row justify-between bg-white border-b  px-[16px]'>
    <Image src={convioo} alt="icon"  priority={true}/>
        <ProfileButton fullname={props.fullname} email={props.email} onClick={props.onClick}/>
    </nav>
  )
}

export default Navbar