import React , {useEffect, useState} from 'react'
import Image from 'next/image'
import Modal from 'react-modal'
import Secondmenu from './secondmenu'
import VideoCard from './VideoCard'
import { close } from '../assets'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import firebase_app from '@/app/config';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";


const storage = getStorage();
const VideoSelector = (props) => {
    
    const [user]= useAuthState(auth);
    const [itemList, setItemList] = useState([]);
    const [videoURLs, setVideoURLs] = useState([]);
  useEffect(()=>{

    const fetchURLs = async ()=> 
    {  if(user){
      const listRef = ref(storage, `${user.uid}/videos/`);
      const res= await listAll(listRef);
        setItemList(res.items);
      
      const urls = await Promise.all(
        res.items.map(async item => {
        const url = await getDownloadURL(item);
        return url;
      })
    );
    setVideoURLs(urls);
    }
  };
  fetchURLs();

  },[user])
  return (
    <Modal isOpen={props.isOpen} className='h-[70%] bg-neutral-300 w-[70%] rounded-xl  flex flex-col gap-px overflow-hidden' overlayClassName='flex items-center justify-center fixed inset-0 bg-black/80' >
          <div className='font-bold text-lg bg-white p-2 flex flex-row justify-between px-2'>
            <div className='text-black'>All videos</div>
            <button onClick={()=>{
              props.setIsOpen(false);
            }}>
            <Image src={close} alt='close'/>
            </button>
            </div>
          <div className='h-px bg-slate-300 w-full'></div>
          <div className='flex flex-row h-full gap-2 '>
            <Secondmenu height='h-full'/>
          <ul className='flex flex-wrap gap-2 overflow-auto pt-2'>
            {videoURLs.map((url,index)=>(
              <li key={index} className='snap-center'>
              <VideoCard videoURL={url} videoTitle={itemList[index].name} onClick={()=>{
                props.handleCardsEdit(false,false,url);
                props.setNewVideoId(props.selectedCardId);
                props.setIsOpen(false);
              }}/>
              </li>
            ))}
          </ul>
          </div>



        </Modal>
  )
}

export default VideoSelector