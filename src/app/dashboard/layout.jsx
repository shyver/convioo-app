'use client'
import { useState, useEffect } from 'react'
import Firstmenu from '../components/firstmenu'
import Navbar from '../components/navbar'
import Secondmenu from '../components/secondmenu'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { db } from '../firebase'
import { doc,getDoc } from 'firebase/firestore'
 
export default function Layout({ children }) {
    const [bg, setBg] = useState(true) //first menu button states
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState([]);

    useEffect(() => {

      const fetchData=async()=>{
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data=docSnap.data();
          setUserData(data);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }

      if(user!=null)
      {
      fetchData();
      }
      else{
        router.push('/login');
      }
    }, [user]);

  return (
    <div className='h-screen max-h-screen overflow-hidden'>
      <Navbar fullname={userData.name} email={userData.email}
      onClick={()=>{
        router.push('/login');
      }}
      />
      <div className='flex flex-row h-full'>
      <Firstmenu firstbuttonclick={()=>{
                setBg(true);
                router.replace('/dashboard/library')
            }}
            secondbuttonclick={()=>{
              setBg(false);
              router.replace('/dashboard/scenario')
              
          }} bg={bg}/>
      
      <main className='w-screen '>{children}</main>
      </div>
    </div>
  )
}