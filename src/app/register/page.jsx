
'use client'
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import Button from "../components/buttons/Button";
import GoogleProviderButton from "../components/buttons/GoogleProviderButton";
import InputBox from "../components/InputBox";
import arrowWhite from "../assets/arrowWhite.svg";
import Checkbox from "../components/buttons/Checkbox";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [agreed, setAgreed] = useState(false);
 const router =useRouter();
  const register = () => {
    if (!name) alert("Please enter name");
    else if (!agreed) alert("Please agree to the terms and conditions");
    else if (!email) alert("Please enter email");
    else if (!password) alert("Please enter password");
    else 
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [user, loading,router]);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f4f4f4] flex-row">
      <div className="flex flex-col justify-evenly items-center">
        <div className="text-black text-2xl font-medium">
        Sign up 🤟
        </div>
        <div className="h-[32px]"/>

          <GoogleProviderButton onClick={signInWithGoogle} />
          <div className="h-[32px]"/>
          <div className="flex flex-row w-full h-fit justify-center items-center">
            <div className="h-px w-full bg-[#A6A6A6]"/>
            <div className="p-2 text-[#A6A6A6]">OR</div>
            <div className="h-px w-full bg-[#A6A6A6]"/>
          </div>
          <div className="h-[16px]"/>


        <form className="input w-full" onSubmit={(e)=>{
          e.preventDefault();
          register();
        }} >
          <InputBox setvalue={setName} title='Name' placeholder='Name'/>
          <div className="h-[8px]"/>
          <InputBox setvalue={setEmail} title='Email' placeholder='Email Address'/>
          <div className="h-[8px]"/>
          
          <InputBox type="password" setvalue={setPassword} title='Password' placeholder='Password'/>

            <div className="h-[16px]"/>
            <div className="flex flex-row justify-start items-center gap-2">
            <Checkbox checked={agreed} setChecked={setAgreed}/>
            <div className="text-black"> I agree to the <span className="text-indigo-600"> Terms of Service </span> and <span className="text-indigo-600">Privacy Policy</span></div>
            </div>
            
            <div className="h-[16px]"/>
        <Button backgroundColor='bg-black' width='w-full' RightIcon={arrowWhite}
         title='Create your account' textColor='text-white'   type='submit'
         />
        
        </form>
        <div className="h-[32px]"/>

        <div className="text-black">
          Alread have an account? <a className="text-indigo-500" href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
export default Register;