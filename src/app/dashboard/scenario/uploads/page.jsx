'use client'
import React, {useState,useEffect} from 'react';
import { collection, getDocs} from "firebase/firestore"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import Button from '@/app/components/buttons/Button';
import firebase_app from '@/app/config';
import { db } from '@/app/firebase';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [folders, setFolders] = useState([]);
  const [user]=useAuthState(auth);
  const router=useRouter();


  useEffect(() => {
    const fetchFolders = async () => {
      const firestoreFolders=[];
      try {
        const querySnapshot = await getDocs(collection(db, `scenarios/${user.uid}/folderless`));
        console.log(querySnapshot.empty);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
          firestoreFolders.push(doc.data());

          
        });
        console.log(firestoreFolders);
        setFolders(firestoreFolders);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };
    if(user)
    {
      fetchFolders();
    }

  }, [user]);
  return (
    <div className='bg-[#f4f4f4] w-full text-center text-black'>
        <div className='flex flex-row gap-2 '>
        {folders.map((folder) => (
          <Button key={folder.id} title={folder.id} backgroundColor='bg-red-500' 
          onClick={() => {
            router.push(`/conviEditor/${folder.id}`)
          }}
          />
        )
        )}
        </div>
    </div>
  )
}

export default Page