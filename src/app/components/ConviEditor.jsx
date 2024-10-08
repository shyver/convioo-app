'use client'

import Switch from '@/app/components/buttons/Switch'
import React, {useEffect, useState,useRef} from 'react'
import VideoDisplay from '@/app/components/VideoDisplay'
import InputBox from '@/app/components/InputBox'
import DropList from '@/app/components/buttons/DropList'
import Button from '@/app/components/buttons/Button'
import { addIconWhite, arrow} from '@/app/assets'
import Optionsetter from '@/app/components/Optionsetter'
import { useAuthState } from 'react-firebase-hooks/auth';
import { SaveCards, auth } from '@/app/firebase';
import { db } from '@/app/firebase';
import { getDoc,updateDoc,doc, getDocs, collection, addDoc } from 'firebase/firestore';
import ActionSetter from '@/app/components/ActionSetter'
import Modal from 'react-modal'
import OneIconCheckbox from '@/app/components/buttons/OneIconCheckbox'
import Canvas from './Canvas';
import Tester from './Tester';
import { setDoc } from 'firebase/firestore';



const ConviEditor = (props) => {
    const [user]= useAuthState(auth);
    const [done, setDone] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(0);
    const [nextCardSelector, setNextCardSelector] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [cards, setCards] = useState([]);
    const [newVideoId, setNewVideoId] = useState(-1);
    const [nextId, setNextId] = useState(-1);
    const newCardPosition = useRef();

    useEffect(() => {
      if(cards.length)
      newCardPosition.current = {x:cards[selectedCardId].position.x,y:cards[selectedCardId].position.y+700};
    }, [nextCardSelector])
    

    useEffect(() => {
      if(props.leaving)
      {
        SaveCards(cards,user,props.folder,props.projectId,db,setDoc, doc);
      }
    }, [props.leaving])



      const removeOption = (optionId) => {
        // Use the filter method to create a new array without the object to remove
        var newArray = cards[selectedCardId].options.map((item)=>{
          if(item.id>optionId)
          {
            item.id--;
            return item
          }
          if(item.id<optionId) return item;
        });
        
        newArray=newArray.filter(item => item!=undefined)
        // Update the state with the new array
        const updatedCards = cards.map((card,index) => {
          if (index == selectedCardId) {
            return { ...card, options:newArray };
          }
          return card; // Return the original item for other items
        });
        setCards(updatedCards);
      };
      const initNextCard=()=>
      {
        const updatedOptions = cards[selectedCardId].options.map((option) => {
          if (option.id == nextId) {
          return {...option,destination:`${cards.length}`}
          
          }
          return option; // Return the original item for other items
        })
        const updatedCards = cards.map((card,index) => {
          if (index == selectedCardId) {
            return { ...card, options:updatedOptions };
          }
          return card; // Return the original item for other items
        });
        const newCard={
          title:'',
          overlay:'',
          videosrc:'',
          options:[],
          position: newCardPosition.current
        }
        const newCards = [...updatedCards,newCard];
        setCards(newCards);
        console.log(newCards);
        

      }
      

      useEffect(() => {


        const getCardList= async ()=>{
          const fetchedData= await getDocs(collection(db,`scenarios/${user.uid}/${props.folder}/${props.projectId}/cards`));
          setCardList(fetchedData.docs);
          const cardPromises = fetchedData.docs.map((document) => {
            return getDoc(doc(db, `scenarios/${user.uid}/${props.folder}/${props.projectId}/cards`, `${document.id}`));
          });
          const cardDataList = await Promise.all(cardPromises);
          const allCards = cardDataList.map(cardData => cardData.data());

          setCards(allCards);
        }
        
      
        if(user)
        {
        getCardList();
        }

      }, [user])
      


      const handleCardsEdit=(videoName,overlay,videosrc)=>{
        const updatedCards = cards.map((card,index) => {
          if (index == selectedCardId) {
            if(videoName!==false && overlay!==false && videosrc!==false)
            return { ...card, title: videoName, overlay:overlay, videosrc:videosrc };
            else if(videoName!==false && overlay!==false)
            return { ...card, title: videoName, overlay:overlay };
            else if(videoName!==false && videosrc!==false)
            return { ...card, title: videoName, videosrc:videosrc };
            else if(overlay!==false && videosrc!==false)
            return { ...card, overlay:overlay, videosrc:videosrc };
            else if(videoName!==false)
            return { ...card, title: videoName };
            else if(overlay!==false)
            return { ...card, overlay:overlay };
            else if(videosrc!==false)
            return { ...card, videosrc:videosrc };

          }
          return card; // Return the original item for other items
        });
      
        // Update the state with the new array
        setCards(updatedCards);
      }

      const handleOptionsEdit=(optionId,title,destination,external,enabled)=>{
        const updatedOptions = cards[selectedCardId].options.map((option) => {
          if (option.id == optionId) {
          return {...option,title : title!=null? title : option.title,
            destination:destination,
            external:external,enabled:enabled}
          
          }
          return option; // Return the original item for other items
        })
        const updatedCards = cards.map((card,index) => {
          if (index == selectedCardId) {
            return { ...card, options:updatedOptions };
          }
          return card; // Return the original item for other items
        });

        setCards(updatedCards);
        console.log(updatedCards);

      }
      

      const addOption=()=>{
        if(cards[selectedCardId].options.length<3){
        const newOption={
          id:cards[selectedCardId].options.length,
          title:'',
          destination:'',
          external:false,
          enabled:false,
        }
        const updatedOptions = [...cards[selectedCardId].options,newOption];
        const updatedCards = cards.map((card,index) => {
          if (index == selectedCardId) {
            return { ...card, options:updatedOptions };
          }
          return card; // Return the original item for other items
        });
        setCards(updatedCards);
      }
      }

      
    return (
<div className='flex flex-row w-screen max-w-screen h-screen bg-[#f4f4f4] max-h-full'>
    <div className={`w-[404px] bg-white h-[95%] px-[32px] py-[14px] flex flex-col `}>

        <Switch width='w-[340px] p-px' LeftTitle='videos' RightTitle='Actions' rightSelected={done} setRightSelected={setDone}/>
        <div className={`h-[77%] w-fit mt-4 flex flex-col gap-4 overflow-auto  ${done ? 'hidden' : ''} `}>
            <div className='text-black'> File
            <VideoDisplay user={user} src={cards.length? cards[selectedCardId].videosrc : null} handleCardsEdit={handleCardsEdit} newVideoId={newVideoId} setNewVideoId={setNewVideoId} selectedCardId={selectedCardId} />
            </div>
            <InputBox title='Video name' placeholder='Choose a name for your video'
            handleCardsEdit={handleCardsEdit} edit='videoName'
             titleStyle='text-sm text-black' height='h-[40px]'
             defaultValue={cards.length ? cards[selectedCardId].title : ''}/>
            <div className='h-0 w-full border border-neutral-200' ></div>
            <InputBox title='Overlay text' placeholder='Placeholder here' edit='overlay'
             titleStyle='text-sm' height='h-[40px]' handleCardsEdit={handleCardsEdit} 
              defaultValue={cards.length ? cards[selectedCardId].overlay: ''}/>
            <div className='h-0 w-full border border-neutral-200'></div>
            <div className='text-zinc-950 text-sm font-semibold'>
                Select answer type
            </div>
            <DropList/>
            <div>
            <div>
            { cards.length? cards[selectedCardId].options.map((item) =>{
              return (
              
            <Optionsetter
          key={item.id}
          id={item.id}
          text={item.title}
          onChange={(event)=>{
            handleOptionsEdit(item.id,event.target.value,item.destination,item.external,event.target.value!='');
            
          }}

          minusOnClick={()=>{
            removeOption(item.id);
          }}
          
        />
      )}):null}
            </div>
                <Button title='Add' backgroundColor='bg-[#10B981]' textColor='text-white' RightIcon={addIconWhite} padding='py-2 px-2' height='h-8' 
                onClick={addOption}
                />
            </div>
            <div className='h-0 w-full border border-neutral-200 my-2'></div>
            
            
            
        </div>
        <div className={` ${done?'':'hidden'} mt-4 overflow-y-auto`}>
          {cards.length ? cards[selectedCardId].options.map((item)=>
            {
              return  item.enabled ? (<ActionSetter key={item.id} option={item} handleOptionsEdit={handleOptionsEdit} cards={cards} selectedCardId={selectedCardId}/>) :  null
            
            }
          ):null}
          
        </div>
        <div className='my-2'>
        <Button title='Done' backgroundColor='bg-black' textColor='text-white' width='w-[350px]'  onClick={()=>{
          if(!done) setDone(true);
          else{
            SaveCards(cards,user,props.folder,props.projectId,db,setDoc, doc);
          }
}}/>
        </div>
    
    </div>  

    <div className='w-[50vw] max-w-[100vw] h-fit'  >

     {/* <Canvas cards={cards} setCards={setCards}
      user={user} projectName={props.projectId}
      selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} 
        setNewVideoId={setNewVideoId} newVideoId={newVideoId} setNextCardSelector={setNextCardSelector}
      /> */}

      <Canvas cards={cards} setCards={setCards} selectedCardId={selectedCardId}
       setSelectedCardId={setSelectedCardId} 
        setNewVideoId={setNewVideoId} newVideoId={newVideoId} setNextCardSelector={setNextCardSelector}

       
       
       />

    </div>


    <Modal isOpen={nextCardSelector} className='w-[385px] h-[366px] px-4 py-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-6 inline-flex'
    overlayClassName='flex items-center justify-center fixed inset-0 bg-black/80' onRequestClose={()=>{setNextCardSelector(false)}}
    >
      <div>
    <div className="text-zinc-950 text-2xl font-semibold ">Choose the option/s</div>
    <div className="text-zinc-950 text-base font-medium ">that will jump to this step...</div>
    </div>
    <div className='flex flex-col gap-2 w-full'>
     {cards[selectedCardId]? cards[selectedCardId].options.map((item)=>{
        return item.enabled ? (
        <OneIconCheckbox sizeCss='w-full h-12 text-black' title={item.title} setNextId={setNextId}
        nextId={nextId} id={item.id}/>
        ) : null
     }):null}

    </div>
    <Button RightIcon={arrow} backgroundColor='bg-black' width='w-full' title='Continue' textColor='text-white' onClick={
      ()=>{
        setNextCardSelector(false);
        initNextCard();
      }
    } />

    </Modal>










</div>)
}

export default ConviEditor