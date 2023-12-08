'use client'
import React from 'react'
import Secondmenu from '@/app/components/secondmenu'
import { useRouter } from 'next/navigation'

const Layout = ({children}) => {
    const router = useRouter();
  return (
    <div className='flex flex-row h-full justify-between'>
        <Secondmenu bg={true}
      allClick={()=>{
        router.replace('/dashboard/library/uploads')
      }}/>
      {children}
      <div></div>
    </div>
  )
}

export default Layout