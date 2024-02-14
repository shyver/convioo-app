'use client'
import React, { useState, useEffect } from 'react';
import ScenarioCard from '@/app/components/ScenarioCard';
import Switch from '@/app/components/buttons/Switch';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { db } from '@/app/firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { computer, computerInactive,mobile,mobileInactive } from '@/app/assets';
import { AnimatePresence,motion } from 'framer-motion';

const Page = ({params}) => {
    const [user]= useAuthState(auth);
    const projectId = decodeURIComponent(params.projectId);
    const [onMobile, setOnMobile] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {


        const getCardList= async ()=>{
          const fetchedData= await getDocs(collection(db,`scenarios/${user.uid}/folderless/${projectId}/cards`));
          setCardList(fetchedData.docs);
          const cardPromises = fetchedData.docs.map((document) => {
            return getDoc(doc(db, `scenarios/${user.uid}/folderless/${projectId}/cards`, `${document.id}`));
          });
          const cardDataList = await Promise.all(cardPromises);
          const allCards = cardDataList.map(cardData => cardData.data());

          setCards(allCards);
          console.log(allCards[0]);
        }
        
      
        if(user)
        {
        getCardList();
        }

      }, [user])
  return (
    <div className=' w-full h-full flex flex-col justify-between items-center  '>
        <div></div>
        <div className={`border-2 border-black  z-10 overflow-hidden h-[480px] rounded-[19px] `}>
        {cards.map((card,index)=>
                <AnimatePresence key={index}>
       { currentCard==index &&(



                              <motion.div 
                key={index}
                
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: -500 }}
      
            transition={{duration:0.3}}
        >
                <ScenarioCard className={`${currentCard==index ? '':'hidden'}  z-0`} cardData={card} onMobile={onMobile} setCurrentCard={setCurrentCard}
                isMuted={isMuted} setIsMuted={setIsMuted}
                />
            </motion.div>
)}
            
        </AnimatePresence>)}
        </div>


        
        <Switch width='w-[80px]' LeftTitle={<Image src={onMobile? computerInactive : computer} alt='computer' />}
         RightTitle={<Image src={onMobile? mobile : mobileInactive} alt='computer' />}
         rightSelected={onMobile}
         setRightSelected={setOnMobile}/>
         <div></div>
    </div>
  )
}

export default Page