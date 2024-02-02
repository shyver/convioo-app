'use client'
import React from 'react'
import Button from '@/app/components/buttons/Button'
import { arrow, settings, share } from '@/app/assets';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Layout = ({params,children}) => {
    const router =useRouter();
    const projectId= decodeURIComponent(params.projectId);
  return (
    <div className='flex flex-col gap-0 w-full h-screen max-h-screen '>
        <nav className='h-[54px] min-h-[54px] bg-white flex items-center flex-row justify-between px-2 z-20'>
            <div className='flex flex-row gap-2 items-center'>
                <Button title='Back' LeftIcon={arrow} flipLeftIcon={true} 
                textColor='text-black'
                onClick={()=>{
                router.back();
                }}
                />
                <div className="text-center text-black text-2xl font-semibold ">{projectId}</div>
            </div>
            <div className='flex flex-row gap-2 '>
                <Button LeftIcon={share} backgroundColor='bg-[#10B981]' title='Share' textColor='text-white'/>
            </div>
        </nav>
        <div className='w-full h-[22px] min-h-[22px] bg-emerald-500 flex justify-center items-center font-medium leading-[14.40px] text-xs z-20'>
        You&apos;re in preview mode, answers won&apos;t be submitted

        </div>
    
    <main className=' bg-[#F4F4F4] w-full h-full'>
        {children}
    </main>

    </div>
  )
}

export default Layout