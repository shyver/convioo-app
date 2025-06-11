'use client'
import { useState, useEffect, Suspense } from 'react'
import Firstmenu from '../components/firstmenu'
import Navbar from '../components/navbar'
import Secondmenu from '../components/secondmenu'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { db } from '../firebase'
import { doc,getDoc } from 'firebase/firestore'
import Loading from '../loading'
 
export default function Layout({ children }) {
    const [bg, setBg] = useState(true) //first menu button states
    const router = useRouter();
    const [user,loading] = useAuthState(auth);
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
      if (loading) {
        return; // Wait for loading to finish
      }
      if(user!=null)
      {
      fetchData();
      }
      else{
        router.push('/login');
      }
    }, [user,loading, router]);

  return (
    <div className='h-screen max-h-screen overflow-hidden'>
      <Suspense fallback={<Loading/>}>
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
      </Suspense>
    </div>
  )
}