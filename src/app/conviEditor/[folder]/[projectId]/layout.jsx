'use client'
import React, { useState, useEffect } from 'react'
import Button from '@/app/components/buttons/Button'
import { arrow, settings, share } from '@/app/assets';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Page from './page';
const Layout = ({params,children}) => {
  const resolvedParams = React.use(params);
  const projectId= decodeURIComponent(resolvedParams.projectId) ;
  const folder= decodeURIComponent(resolvedParams.folder)
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Function to execute when window is closed or reloaded
    const handleWindowClose = (event) => {
      const message = 'You are leaving the page';
      event.preventDefault();
      event.returnValue = message;
      return message;
    };
  
    // Add event listener
    window.addEventListener('beforeunload', handleWindowClose);
  
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);



  
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
      <Link href={`/preview/${folder}/${resolvedParams.projectId}`}>
      <Button LeftIcon={arrow} title='Preview' 
      border={true} borderColor='border-[#A6A6A6] '
      textColor='text-black'
      onClick={()=>{
        setLeaving(true);
      }}
      />
      </Link>
      <Button LeftIcon={share} backgroundColor='bg-[#10B981]' title='Share' textColor='text-white'/>
    </div>
    </nav>
    <main>
      {<Page params={resolvedParams}  />}
    </main>

</div>
        
    
  )
}

export default Layout