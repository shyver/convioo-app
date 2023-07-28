'use client'
import { useState } from 'react'
import Firstmenu from '../components/firstmenu'
import Navbar from '../components/navbar'
import Secondmenu from '../components/secondmenu'
import { useRouter } from 'next/navigation'
 
export default function Layout({ children }) {
    const [bg, setBg] = useState(true) //first menu button states
    const router = useRouter();
  return (
    <>
      <Navbar />
      <div className='flex flex-row h-screen'>
      <Firstmenu firstbuttonclick={()=>{
                setBg(true);
                router.replace('/dashboard/library')
            }}
            secondbuttonclick={()=>{
              setBg(false);
              router.replace('/dashboard/scenario')
              
          }} bg={bg}/>
      <Secondmenu bg={bg} />
      <main className='w-screen '>{children}</main>
      </div>
    </>
  )
}