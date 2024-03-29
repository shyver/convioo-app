'use client'
import React, {useEffect, useState} from 'react'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import VideoCard from '@/app/components/VideoCard';
import firebase_app from '@/app/config';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';


const storage = getStorage();

// Create a reference under which you want to list

const Uploads = (props) => {
  const [user]= useAuthState(auth);

  const [itemList, setItemList] = useState([]);
  const [videoURLs, setVideoURLs] = useState([]);
  const router= useRouter();


  useEffect(() => {
    const fetchURLs = async () => {
      if (user) {
        try{
        const listRef = ref(storage, `${user.uid}/videos/`);
        listAll(listRef)
          .then(async (res) => {
            setItemList(res.items);
            const urls = await Promise.all(
              res.items.map(async item => {
                const url = await getDownloadURL(item);
                return url;
              })
            );
            setVideoURLs(urls);
          });
      }catch(err){
        console.log(err);
      }
    }
    };
    fetchURLs();
  }, [user]);

  


  return (
    <div className='p-8 h-full overflow-y-scroll w-full scrollbar bg-[#f4f4f4]'>
      <div className="text-black text-xl font-semibold leading-tight">All Videos</div>
  <ul className='flex flex-wrap gap-2 '>
    {videoURLs.map((url, index) => (

      <li key={index} className='snap-center'>
      <VideoCard videoURL={url} videoTitle={itemList[index].name} onClick={()=>{
        {props.setSelectedVideo ?props.setSelectedVideo(url): null};
        {props.setModalState ? props.setModalState(false): null};
        {props.projectName ? props.handleClick(user, props.projectName, url, router)
        
    : null}
      }}/>
      </li>
      
    ))}
  </ul>
      
      
    </div>
  )
}

export default Uploads


