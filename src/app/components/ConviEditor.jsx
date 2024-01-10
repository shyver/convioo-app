'use client'

import Switch from '@/app/components/buttons/Switch'
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react'
import VideoDisplay from '@/app/components/VideoDisplay'
import InputBox from '@/app/components/InputBox'
import DropList from '@/app/components/buttons/DropList'
import Button from '@/app/components/buttons/Button'
import { addIconWhite, arrow} from '@/app/assets'
import ScenarioPiece from '@/app/components/ScenarioPiece'
import Optionsetter from '@/app/components/Optionsetter'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { db } from '@/app/firebase';
import { getDoc,updateDoc,doc, getDocs, collection } from 'firebase/firestore';
import ActionSetter from '@/app/components/ActionSetter'
import Modal from 'react-modal'
import OneIconCheckbox from '@/app/components/buttons/OneIconCheckbox'
import Canvas from './Canvas';
import Tester from './Tester';
import { useXarrow } from 'react-xarrows';


const ConviEditor = (props) => {
    const [user]= useAuthState(auth);
    const [videoName, setVideoName] = useState('');
    const [overlayText, setOverlayText] = useState('');
    const [done, setDone] = useState(false);
    const [options, setOptions] = useState([]);
    const [videoURL, setVideoURL] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(0);
    const [nextCardSelector, setNextCardSelector] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [cards, setCards] = useState([]);
    const [newVideoId, setNewVideoId] = useState(-1);

    const handleEdit = (idToUpdate,newText,newDestination,external) => {
      const updatedOptions = options.map((option) => {
        if (option.id == idToUpdate) {
          console.log(newText!=option.title);
          if(newText!=option.title)
          {
          if(newText=='')
          {
            return { ...option, title: newText,enabled:false };
          }
          else{
            return { ...option, title: newText, enabled:true };
          }
        }
        
        if(newDestination!=option.destination)
        {
          if(newDestination=='')
          {
            return { ...option, destination: newDestination,external:false };
          }
          else{
            return { ...option, destination: newDestination, external: external}

        }
        }
        }
        return option; // Return the original item for other items
      });
    
      // Update the state with the new array
      setOptions(updatedOptions);
    };
    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id.toString());
      };
    
      const handleDragOver = (id) => {
        // Implement hover effect or any other visual feedback here if needed
      };
      const handleDrop = (targetId,e) => {
        const draggedItemId = parseInt(e.dataTransfer.getData('text/plain'));
        const updatedItems = [...items];
        const draggedItem = updatedItems.find((item) => item.id === draggedItemId);
    
        if (draggedItem) {
          const targetIndex = updatedItems.findIndex((item) => item.id === targetId);
          updatedItems.splice(targetIndex, 0, draggedItem);
          setItems(updatedItems);
        }
      };
      const removeOption = (optionId) => {
        // Use the filter method to create a new array without the object to remove
        var newArray = options.map((item)=>{
          if(item.id>optionId)
          {
            item.id--;
            return item
          }
          if(item.id<optionId) return item;
        });
        
        newArray=newArray.filter(item => item!=undefined)
        // Update the state with the new array
        setOptions(newArray);
      };
      const initNextCard=()=>
      {
        setVideoURL(options[0].destination);
      setOptions([]);
      setVideoName('');
      setPrev(selectedCardId);
      setSelectedCardId(selectedCardId+1);
      setOverlayText('');
      setDone(false);

      }
      

      useEffect(() => {
        const getCard= async ()=>{
          const fetchedData=await getDoc(doc(db,`scenarios/${user.uid}/folderless/${props.projectId}/cards`,`${selectedCardId}`))
            
              if(fetchedData.data().options.length!=0)
              {
                setOptions(fetchedData.data().options);
              }
              setVideoName(fetchedData.data().title);
              setOverlayText(fetchedData.data().overlay);
              setVideoURL(fetchedData.data().videosrc);
            }

        const getCardList= async ()=>{
          const fetchedData= await getDocs(collection(db,`scenarios/${user.uid}/folderless/${props.projectId}/cards`));
          setCardList(fetchedData.docs);
          const cardPromises = fetchedData.docs.map((document) => {
            console.log('document : ' + document.id);
            return getDoc(doc(db, `scenarios/${user.uid}/folderless/${props.projectId}/cards`, `${document.id}`));
          });
          const cardDataList = await Promise.all(cardPromises);
          const allCards = cardDataList.map(cardData => cardData.data());
          console.log('allcards : ', allCards);

          setCards(allCards);
        }
        
      
        if(user)
        {
        getCard();
        getCardList();
        }

      }, [user])
      
      
      
    return (
<div className='flex flex-row h-screen bg-gray-300 max-h-full'>
    <div className={`w-[404px] bg-white h-[95%] px-[32px] py-[14px] flex flex-col `}>

        <Switch LeftTitle='videos' RightTitle='Actions' rightSelected={done} setRightSelected={setDone}/>
        <div className={`mt-4 flex flex-col gap-4 overflow-auto w-fit ${done ? 'hidden' : ''} `}>
            <div className='text-black'> File
            <VideoDisplay src={videoURL} setVideoURL={setVideoURL} newVideoId={newVideoId} setNewVideoId={setNewVideoId} selectedCardId={selectedCardId} />
            </div>
            <InputBox title='Video name' placeholder='Choose a name for your video' setvalue={setVideoName} titleStyle='text-sm text-black' height='h-[40px]' defaultValue={videoName}/>
            <div className='h-0 w-full border border-neutral-200' ></div>
            <InputBox title='Overlay text' placeholder='Placeholder here' titleStyle='text-sm' height='h-[40px]' setvalue={setOverlayText} defaultValue={overlayText}/>
            <div className='h-0 w-full border border-neutral-200'></div>
            <div className='text-zinc-950 text-sm font-semibold'>
                Select answer type
            </div>
            <DropList/>
            <div>
            <div>
            {options.map((item) =>{
              return (
              
            <Optionsetter
          key={item.id}
          id={item.id}
          text={item.title}
          onChange={(event)=>{
            handleEdit(item.id,event.target.value,item.destination,item.external);
            
          }}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          minusOnClick={()=>{
            removeOption(item.id);
          }}
        />
      )})}
            </div>
                <Button title='Add' backgroundColor='bg-[#10B981]' textColor='text-white' RightIcon={addIconWhite} padding='py-2 px-2' height='h-8' 
                onClick={()=>{
                  if(options.length<3)
                  {
                    const newOption={id:options.length,title:'',destination:'',enabled:false,external:false}
                    setOptions([...options,newOption])
                  }
                }}
                />
            </div>
            <div className='h-0 w-full border border-neutral-200 my-2'></div>
            
            
            
        </div>
        <div className={` ${done?'':'hidden'} overflow-y-auto`}>
          {options.map((item)=>
            {
              return  item.enabled ? (<ActionSetter key={item.id} option={item} handleEdit={handleEdit}/>) :  null
            
            }
          )}
          
        </div>
        <div className='my-2'>
        <Button title='Done' backgroundColor='bg-black' textColor='text-white' width='w-full'  onClick={()=>{
          if(!done) setDone(true);
          else{
            updateDoc(doc(db, `scenarios/${user.uid}/folderless/${props.projectId}/cards`, `${selectedCardId}`), {
              videosrc:videoURL,
              title:videoName,
              overlay: overlayText,
              options:options
            }).then(() => {
              alert('data saved!');
            });
          }
}}/>
        </div>
    
    </div>  

    <div className='w-full h-[93%] flex overflow-auto' onLoad={useXarrow()}>
    {/* <ScenarioPiece title={videoName} overlay={overlayText} videosrc={videoURL} options={options} prev={prev} 
    nextClick={()=>{
      setNextCardSelector(true)
    }}
    />
     */}

     <Canvas options={options} title={videoName} overlay={overlayText}
      videosrc={videoURL} user={user} projectName={props.projectId}
      selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} 
      setOptions={setOptions} setVideoURL={setVideoURL} setVideoName={setVideoName}
       setOverlayText={setOverlayText}  videoURL={videoURL} 
        videoName={videoName} overlayText={overlayText} 
        setNewVideoId={setNewVideoId} newVideoId={newVideoId}
      />

      {/* <Tester/> */}

    </div>
    <Modal isOpen={nextCardSelector} className='w-[385px] h-[366px] px-4 py-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-6 inline-flex'
    overlayClassName='flex items-center justify-center fixed inset-0 bg-black/80'
    >
      <div>
    <div className="text-zinc-950 text-2xl font-semibold ">Choose the option/s</div>
    <div className="text-zinc-950 text-base font-medium ">that will jump to this step...</div>
    </div>
    <div className='flex flex-col gap-2 w-full'>
    <OneIconCheckbox sizeCss='w-full h-12' title='Text Question'/>
    <OneIconCheckbox sizeCss='w-full h-12' title='Text Question'/>
    <OneIconCheckbox sizeCss='w-full h-12' title='Text Question'/>
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