'use client'
import React, { useEffect } from 'react';
import firebase_app from './config';
import { auth } from './firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';


const Page = () => {
  const [user, loading, error] = useAuthState(auth);
  const router= useRouter();
  useEffect(() => {
    console.log(user);
    const redirect =()=>{
      if(loading)
      {
        return
      }
      if(!user)
      {
        router.push('/login');
      }else router.push('/dashboard');

    }
    redirect();
  }, [user,loading,router])

}

export default Page