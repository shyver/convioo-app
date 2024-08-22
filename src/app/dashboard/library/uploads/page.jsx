'use client'
import React, {useEffect, useState} from 'react'
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
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
  const [videos, setVideos] = useState([]);
  const router= useRouter();


  useEffect(() => {
    const fetchURLs = async () => {
      if (user) {
        try{
        const listRef = ref(storage, `${user.uid}/videos/`);
        listAll(listRef)
          .then(async (res) => {
            setItemList(res.items);
            const urlsAndDates = await Promise.all(
              res.items.map(async item => {
                const url = await getDownloadURL(item);
                const metadata = await getMetadata(item);
                const creationDate = metadata.timeCreated;
                return {url, creationDate};
              })
            );
            setVideos(urlsAndDates);
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
    {videos.map((url, index) => (

      <li key={index} className='snap-center'>
      <VideoCard videoURL={url.url} videoTitle={itemList[index].name} 
      creationDate={url.creationDate}
      onClick={()=>{
        {props.setSelectedVideo ?props.setSelectedVideo(url.url): null};
        {props.setModalState ? props.setModalState(false): null};
        
        {props.projectName ? props.handleClick(user, props.projectName, url.url, router, props.currentFolder)
        
    : null}

      }}/>
      </li>
      
    ))}
  </ul>
      
      
    </div>
  )
}

export default Uploads


