
'use client'
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
 const router =useRouter();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [user, loading,router]);
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col justify-center gap-2">
        <input
          type="text"
          className="border text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="border text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="border text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="text-black" onClick={register}>
          Register
        </button>
        <button
          className="text-black"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div className="text-black">
          Already have an account? <a className="text-indigo-500" href="/">Login</a> now.
        </div>
      </div>
    </div>
  );
}
export default Register;