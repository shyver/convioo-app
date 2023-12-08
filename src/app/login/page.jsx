'use client'
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Login = ()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      console.log(loading);
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      console.log('ure in !')
      console.log(user);
      router.replace("/dashboard");
    
    }
  }, [user, loading,router]);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col justify-evenly items-center">
        <input
          type="text"
          className="border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="border"
          onClick={() => {logInWithEmailAndPassword(email, password)}}
        >
          Login
        </button>
        <button className="border" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <a href="/reset">Forgot Password</a>
        </div>
        <div>
          Don&apos;t have an account? <a href="/register">Register</a> now.
        </div>
      </div>
    </div>
  );
}
export default Login;