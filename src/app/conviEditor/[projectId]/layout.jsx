'use client'
import React from 'react'
import Button from '@/app/components/buttons/Button'
import { arrow, settings, share } from '@/app/assets';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Page from './page';
const Layout = ({params,children}) => {
  const projectId= decodeURIComponent(params.projectId)
  const router = useRouter();
  return (
    <div className='h-screen bg-[f4f4f4] overflow-hidden'>
    <nav className='h-[54px] bg-white flex items-center flex-row justify-between px-2'>
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
      <Button LeftIcon={settings} border={true} borderColor='border-[#A6A6A6]' />
      <Link href={`/preview/${params.projectId}`}>
      <Button LeftIcon={arrow} title='Preview' 
      border={true} borderColor='border-[#A6A6A6] '
      textColor='text-black'
      />
      </Link>
      <Button LeftIcon={share} backgroundColor='bg-[#10B981]' title='Share' textColor='text-white'/>
    </div>
    </nav>
    <main>
    {children}
    </main>

</div>
        
    
  )
}

export default Layout