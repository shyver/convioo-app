'use client'
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleProviderButton from "../components/buttons/GoogleProviderButton";
import InputBox from "../components/InputBox";
import Button from "../components/buttons/Button";
import { arrow, arrowWhite } from "../assets";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const Login = ()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const auth= getAuth();
    const sendResetEmail = async () => {
        console.log(email);
        try {
            console.log('sending email');
            await sendPasswordResetEmail(auth,email).then(() => {
                setMessage("Password reset email sent")
            });
        }catch (error) {
            setErrorMessage(error.message);
        }
    };



  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f4f4f4] flex-row">
      <div className="flex flex-col justify-evenly items-center">
        <div className="text-black text-2xl font-medium">
        Recover password
        </div>
        <div className="h-[32px]"/>


        <form className="input w-[432px]" onSubmit={(e)=>{
          e.preventDefault();
          sendResetEmail();
        }} >
          <InputBox setvalue={setEmail} title='Email' placeholder='Email Address'/>
          <div className="h-[16px]"/>
          <div className="text-indigo-500 w-full flex justify-end">
          
            </div>
            <div className="h-[16px]"/>
        <Button backgroundColor='bg-black' width='w-full' RightIcon={arrowWhite}
         title='Send reset email' textColor='text-white'  
            type='submit' 
         />
        </form>
        <div className="text-red-500 font-semibold">{errorMessage}</div>
        <div className="text-green-500 font-semibold">{message}</div>
        <div className="h-[32px]"/>

        <div className="text-black">
          Suddenly remembering your password ? <a className="text-indigo-500" href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );

}
export default Login;