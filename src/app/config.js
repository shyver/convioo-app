// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";


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

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];



export default firebase_app;