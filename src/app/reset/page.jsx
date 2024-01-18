'use client'
import React, {useState} from 'react'
import InputBox from '../components/InputBox';
import Button from '../components/buttons/Button';
import { arrowWhite } from '../assets';
const Page = () => {
    const [password, setPassword] = useState('');
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f4f4f4] flex-row">
    <div className="flex flex-col justify-evenly items-center">
      <div className="text-black text-2xl font-medium w-[432px] text-center">
      Change password 🤟
      </div>
      <div className="h-[32px]"/>



      <form className="input w-full" onSubmit={(e)=>{
        e.preventDefault();
      }} >
        <div className="h-[16px]"/>
        
        <InputBox type="password" setvalue={setPassword} title='Password' placeholder='Password'/>
        <div className='h-[16px]' />
        <InputBox type="password" setvalue={setPassword} title='Confirm Password' placeholder='Confirm Password'/>

          <div className="h-[16px]"/>
      <Button backgroundColor='bg-black' width='w-full' RightIcon={arrowWhite}
       title='Sign In' textColor='text-white'   type='submit'
       />
      
      </form>
      <div className="h-[32px]"/>
    </div>
  </div>
  )
}

export default Page