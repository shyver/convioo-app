'use client'
import React, { useEffect } from 'react';
import firebase_app from './config';
import { auth } from './firebase';
import { useRouter } from 'next/navigation';


const Page = () => {
  const user=auth.currentUser;
  const router= useRouter();
  useEffect(() => {
    console.log(user);
    const redirect =()=>{
      if(user!=null)
      {
        router.push('/dashboard');
      }else router.push('/login');
    }
    redirect();
  }, [user,router])

}

export default Page