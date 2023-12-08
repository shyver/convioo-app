import React from 'react'
import Button from './buttons/Button'
import { arrowsRepeat, close } from '../assets'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Modal from 'react-modal'
import firebase_app from '@/app/config';
import { auth } from '@/app/firebase';
import { useState, useEffect } from 'react'
import VideoCard from './VideoCard';
import Secondmenu from './secondmenu';
import Image from 'next/image';

const storage = getStorage();

const VideoDisplay = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [user]= useAuthState(auth);
  const [itemList, setItemList] = useState([]);
  const [videoURLs, setVideoURLs] = useState([]);


  useEffect(()=>{

    const fetchURLs = async ()=> 
    {  if(user){
      const listRef = ref(storage, `${user.uid}/videos/`);
      const videoList= await listAll(listRef)
      .then((res) => {
        setItemList(res.items);
      });
      const urls = await Promise.all(
        itemList.map(async item => {
        const url = await getDownloadURL(item);
        return url;
      })
    );
    setVideoURLs(urls);
    }
  };
  fetchURLs();

  },[itemList,user])
  return (
    <div>
        
        <div className='w-[340px] h-[172px] rounded-xl relative overflow-hidden '>
          
            <video src={props.src} width={340} height={172} className='absolute' ></video>
            <div className='relative h-full flex flex-col justify-between px-4 py-2 bg-gradient-to-b from-black/60 to-25%'>
              <div className='text-white text-sm font-medium '>
                video title ?
              </div>
              <div className='flex justify-end'>
                <Button title='replace' backgroundColor='bg-white' LeftIcon={arrowsRepeat} onClick={()=>{
                  setOpenModal(true);
                }}/>
              </div>
              
            </div>
        </div>
        <Modal isOpen={openModal} className='h-[70%] bg-neutral-300 w-[70%] rounded-xl  flex flex-col gap-px overflow-hidden' overlayClassName='flex items-center justify-center fixed inset-0 bg-black/80' >
          <div className='font-bold text-lg bg-white p-2 flex flex-row justify-between px-2'>
            <div>All videos</div>
            <button onClick={()=>{
              setOpenModal(false)
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
                props.setVideoURL(url);
                setOpenModal(false);
              }}/>
              </li>
            ))}
          </ul>
          </div>



        </Modal>



        
    </div>
  )
}

export default VideoDisplay