// Import the functions you need from the SDKs you need
'use client'
import React from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth,GoogleAuthProvider, createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword,sendPasswordResetEmail,signOut } from "firebase/auth";
import {getFirestore,query,getDocs,collection,where,setDoc,doc, getDoc} from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { uploadBytesResumable } from "firebase/storage";
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

const listFolders = async ({user}) => {
  if(user!=null)
    {
      const res = await getDoc(doc(db, 'scenarios', user.uid));
      if (res.exists()) {
        return res.data()['folders'];
      }
    }
  
}

// const uploadVideo = ({
//   storageRef,
//   files,
//   setUploading,
//   setUploadProgress,
//   setConfirmupload,
//   setUploadIsOpen,
//   handleClick,
//   projectName,
//   navigateTo,
//   user,
//   router,
//   currentFolder
// }) => {
//   // setUploading(true);
//   const uploadTask = uploadBytesResumable(storageRef.current, files);
//   uploadTask.on('state_changed', 
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       setUploadProgress(progress);
      
//       switch (snapshot.state) {
//         case 'paused':
//           console.log('Upload is paused');
//           break;
//         case 'running':
//           console.log('Upload is running');
//           break;
//       }
//     }, 
//     (error) => {
//       // Handle unsuccessful uploads
//     }, 
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref)
//         .then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           handleClick(user,projectName, downloadURL, router, currentFolder )
//         })
//       setUploading(false);
//       setConfirmupload(false);
//       setUploadIsOpen(false);
//       router.replace(navigateTo)
//     }
//   );
// }


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users",user.uid), {
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
const logInWithEmailAndPassword = async (email, password,setErrorMessage) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);

      if(err.code==='auth/invalid-credential'){
        setErrorMessage('User not found. Please register first');
      }
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

  const SaveCards=async(cards, user,folder, projectId, db, setDoc, doc)=>{
    cards.map((card,index)=>{
      try{
      setDoc(doc(db, `scenarios/${user.uid}/${folder}/${projectId}/cards`, `${index}`), {
        title: card.title,
        overlay: card.overlay,
        videosrc: card.videosrc,
        options: card.options,
        position: card.position
    })}catch(e){
      console.log(e);
      alert('There was a problem saving your cards. Please try again later');
    }
    }
    );
  }
// Initialize Firebase
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    SaveCards,
    // uploadVideo,
    listFolders

  };