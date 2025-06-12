'use client'
import React, {useState,useEffect} from 'react';
import { collection, getDocs} from "firebase/firestore"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { db } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { listFolders } from '@/app/firebase';

const Page = () => {
  const [projects, setProjects] = useState([]);
  const [user]=useAuthState(auth);
  const router=useRouter();


  useEffect(() => {
    const fetchProjects = async ({folder}) => {
      const firestoreProjects=[];
      try {
        const querySnapshot = await getDocs(collection(db, `scenarios/${user.uid}/${folder}`));
        console.log(querySnapshot.empty);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
          firestoreProjects.push(doc.data());
        });
        
        return firestoreProjects;

      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    if(user)
    {
      listFolders({user:user}).then(async (folderNames) => {
  const projectsData = folderNames? await folderNames.reduce(async (prevPromise, folderName) => {
    const acc = await prevPromise;
    const snapshot = await getDocs(collection(db, `scenarios/${user.uid}/${folderName}`));
    const projects = snapshot.docs.map(doc => ({ id: doc.data().id, folder: folderName }));
    return [...acc, ...projects];
  }, Promise.resolve([])) : [];

  console.log('projectData', projectsData);
  setProjects(projectsData);
});
    }
  }, [user]);
  return (
    <div className='bg-[#f4f4f4] w-full text-center text-black'>
        <ul className='flex flex-wrap gap-2 p-4'>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/conviEditor/${project.folder}/${project.id}`} >

            {/* <Button key={folder.id} title={folder.id} backgroundColor='bg-red-500' 
            />
             */}
             <div className=' w-44 h-40 bg-white rounded-xl flex flex-col justify-start items-start p-2 '>
                  <div className='w-40 text-ellipsis overflow-clip text-start font-medium'> {project.id}</div>
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