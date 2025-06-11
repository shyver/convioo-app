'use client'
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleProviderButton from "../components/buttons/GoogleProviderButton";
import InputBox from "../components/InputBox";
import Button from "../components/buttons/Button";
import { arrow, arrowWhite } from "../assets";
import Loading from "../loading";

const Login = ()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, loading, error] = useAuthState(auth);
  
  const router = useRouter();
  useEffect(() => {
    if (loading) { 

      return;
    }
    if (user) {
      router.replace("/dashboard");
    
    }
  }, [user, loading,router]);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f4f4f4] flex-row">
      <div className="flex flex-col justify-evenly items-center">
        <div className="text-black text-2xl font-medium">
        Sign in 🤟
        </div>
        <div className="h-[32px]"/>
        
          <GoogleProviderButton onClick={signInWithGoogle} />
          <div className="h-[32px]"/>
          <div className="flex flex-row w-full h-fit justify-center items-center">
            <div className="h-px w-full bg-[#A6A6A6]"/>
            <div className="p-2 text-[#A6A6A6]">OR</div>
            <div className="h-px w-full bg-[#A6A6A6]"/>
          </div>
          <div className="h-[32px]"/>


        <form className="input w-full" onSubmit={(e)=>{
          e.preventDefault();
            logInWithEmailAndPassword(email, password, setErrorMessage);
        }} >
          <InputBox setvalue={setEmail} title='Email' placeholder='Email Address'/>
          <div className="h-[16px]"/>
          
          <InputBox type="password" setvalue={setPassword} title='Password' placeholder='Password'/>
          <div className="text-indigo-500 w-full flex justify-end">
          <a href="/forgotpassword">Forgot Password ?</a>
          
            </div>
            <div className="h-[16px]"/>
        <Button backgroundColor='bg-black' width='w-full' RightIcon={arrowWhite}
         title='Sign In' textColor='text-white'   type='submit'
         />
        
        </form>
        <div className="text-red-500 font-semibold">{errorMessage}</div>
        <div className="h-[32px]"/>

        <div className="text-black">
          Don&apos;t have an account? <a className="text-indigo-500" href="/register">Sign up</a>
        </div>
      </div>

    </div>

  ) ;

}
export default Login;