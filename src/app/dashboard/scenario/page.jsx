'use client'

import ScenarioCreator from '@/app/components/ScenarioCreator'
import React from 'react'
import Image from 'next/image';
import { recordIcon, recordIconWhite} from '@/app/assets'
import Button from '@/app/components/buttons/Button';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
  return (
    <div className='flex justify-center pt-[10%] bg-[#f4f4f4] w-full'>
<div className="w-[435px] h-[174px] p-6 bg-white rounded-xl flex-col justify-start items-center gap-4 inline-flex">
    <div className="text-zinc-950 text-base font-medium leading-snug">Create New Scenario</div>
    <div className="flex-col justify-start items-center gap-2 flex">
    <Button LeftIcon={recordIconWhite} title='From scratch' backgroundColor='bg-zinc-950' textColor='text-white' width='w-[220px]' onClick={()=>{
            router.push('/newconvi')
    }}/>
    <Button LeftIcon={recordIcon} title='Explore templates' backgroundColor='bg-white' border={true} borderColor='border-neutral-400' width='w-[220px]' textColor='text-black'/>


    </div>
</div>
    </div>
  )
}
