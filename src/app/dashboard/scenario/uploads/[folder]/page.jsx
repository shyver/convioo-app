'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth,db } from '@/app/firebase';
import Link from 'next/link';
import { getDocs, collection } from 'firebase/firestore';
const Page = ({params}) => {
    const folderName = decodeURIComponent(params.folder);
    const [folders, setFolders] = useState([]);
  const [user]=useAuthState(auth);
  const router=useRouter();


  useEffect(() => {
    const fetchFolders = async () => {
      const firestoreFolders=[];
      try {
        const querySnapshot = await getDocs(collection(db, `scenarios/${user.uid}/${folderName}`));
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
        <ul className='flex flex-wrap gap-2 p-4'>
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link href={`/conviEditor/${folderName}/${folder.id}`} >

            {/* <Button key={folder.id} title={folder.id} backgroundColor='bg-red-500' 
            />
             */}
             <div className=' w-44 h-40 bg-white rounded-xl flex flex-col justify-start items-start p-2 '>
                  <div className='w-40 text-ellipsis overflow-clip text-start font-medium'> {folder.id}</div>
                  <div className='w-full h-px bg-[#f4f4f4] my-2'></div>
             </div>
            </Link>

          </li>
        )
        )}
        </ul>
    </div>
  )
}

export default Page