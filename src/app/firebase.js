// Import the functions you need from the SDKs you need
'use client'
import React from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth,GoogleAuthProvider, createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword,sendPasswordResetEmail,signOut } from "firebase/auth";
import {getFirestore,query,getDocs,collection,where,setDoc,doc} from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
const firebaseConfig = {
    apiKey: "AIzaSyASOEmk7hmcrgMJoilEekXVu0fCH7sTCpQ",
    authDomain: "convioo-395117.firebaseapp.com",
    projectId: "convioo-395117",
    storageBucket: "convioo-395117.appspot.com",
    messagingSenderId: "324947097570",
    appId: "1:324947097570:web:3ed3d807157b2d0ceeabbb",
    measurementId: "G-XF46C2692W",
    credentials:true
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);




const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(collection(db, "users",user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await setDoc(doc(db, "users",user.uid), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

// Initialize Firebase
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };