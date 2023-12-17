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
      // maybe trigger a loading screen
      return;
    }
    if (user) {

      router.replace("/dashboard");
    
    }
  }, [user, loading,router]);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white flex-row">
      <div className="flex flex-col justify-evenly items-center">
        <form >
        <input
          type="text"
          className="border text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          autoComplete="email-address"
        />
        <input
          type="password"
          className="border text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />
        </form>
        <button
          className="border text-black"
          onClick={() => {logInWithEmailAndPassword(email, password)}}
        >
          Login
        </button>
        <button className="border text-black" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div className="text-indigo-500">
          <a href="/reset">Forgot Password</a>
        </div>
        <div className="text-black">
          Don&apos;t have an account? <a className="text-indigo-500" href="/register">Register</a> now.
        </div>
      </div>
    </div>
  );
}
export default Login;