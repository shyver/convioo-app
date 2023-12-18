'use client'

import React, {useState, useEffect} from 'react'
import Button from '../components/buttons/Button'
import { arrow, close, dashIconBlue, down, folder, libraryicon, recordIconBlue, screenBlue, upload, uploadBlue } from '../assets'
import Image from 'next/image';
import firebase_app from '../config';
import Modal from 'react-modal';
import { getStorage,listAll,ref } from 'firebase/storage';
import { AnimatePresence, motion } from 'framer-motion';
import SourceButton from '../components/buttons/SourceButton';
import Uploads from '../dashboard/library/uploads/page';
import Secondmenu from '../components/secondmenu';
import InputBox from '../components/InputBox';
import UploadModal from '../components/UploadModal';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../firebase';

function handleClick(user, projectName, url, router) {
  setDoc(doc(db, `scenarios/${user.uid}/${projectName}`, '0'), {
    videosrc:url,
    prev:null,
    title:'',
    overlay: '',
    options:[]
  }).then(() => {
    console.log('upload done!');
  });
  router.replace(`conviEditor/${projectName}`);
}

const Page = () => {
  
    const storage =getStorage();
    const [chooseFolder, setChooseFolder] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState('Choose folder');
    const listRef = ref(storage, 'scenarios');
    const [folders, setFolders] = useState([]);
    const [firstScreen, setFirstScreen] = useState(true);
    const [projectName, setProjectName] = useState('');
    const [libraryState, setLibraryState] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState([]);
    const [uploadIsOpen, setUploadIsOpen] = useState(false);

  useEffect(() => {
    async function listFolders() {
      try {
        const { prefixes } = await listAll(listRef);

        setFolders(prefixes.map(prefixItem => prefixItem.name));
      } catch (error) {
        console.error('Error listing folders:', error);
      }
    }

    listFolders();
  },[]);



  return (
    <div className='bg-[#f4f4f5]'> 
    <AnimatePresence>
  {firstScreen && (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1 , y:0}}
      exit={{ opacity: 0, y: -30 }}
    >

        {nameAndFolderSetting(setChooseFolder, selectedFolder, chooseFolder, setSelectedFolder, folders, setFirstScreen, setProjectName)}
        </motion.div>)}
        </AnimatePresence>
    <AnimatePresence>
  {!firstScreen && (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1 , y:0}}
      exit={{ opacity: 0, y: -30 }}
    >
        
                {sourceChoosing(libraryState,setLibraryState , setSelectedVideo, selectedVideo, projectName, uploadIsOpen, setUploadIsOpen)}
    </motion.div>
        )

        }
    </AnimatePresence>

    </div>
  )
}

export default Page














function nameAndFolderSetting(setChooseFolder, selectedFolder, chooseFolder, setSelectedFolder, folders, setFirstScreen, setProjectName) {
  return <div className="w-full h-screen pt-[236px] pb-[584px] bg-zinc-100 justify-center items-center inline-flex ">
    <div className="w-[416px] self-stretch flex-col justify-start items-start gap-8 inline-flex ">
      <div className="text-zinc-950 text-2xl font-medium">Ok, let&apos;s get started 🤟</div>
      <div className="self-stretch h-[236px] flex-col justify-start items-start gap-4 flex">
        <InputBox title='Project name' setvalue={setProjectName} placeholder='Scenario name'/>
        <div className="self-stretch h-[78px] flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-950 text-xl font-medium">Folder</div>
          <button className='self-stretch h-[50px] px-2 py-4 bg-white rounded-lg border border-neutral-200 items-center inline-flex justify-between'
            onClick={() => {
              setChooseFolder(true);
            } }
          >
            <div className={`${selectedFolder == 'Choose folder' ? 'text-gray-400' : 'text-black'}`}>{selectedFolder}</div>
            <Image src={down} alt='down arrow' />
          </button>
        </div>
        <Button title='Create Scenario' backgroundColor='bg-black' textColor='text-white' width='w-[416px]' LeftIcon={arrow} 
         onClick={()=>{
          setFirstScreen(false);
        }}/>
        <Modal className='w-[449px] h-[190px] px-4 pb-4 bg-white rounded-2xl shadow flex-col justify-center items-center gap-4 inline-flex mt-8'
          isOpen={chooseFolder}
          overlayClassName={`
            fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-70 z-50 
          `}>
          <div className="self-stretch mt-4 bg-white justify-between items-center gap-[37px] inline-flex h-fit">
            <div className="text-zinc-950 text-base font-semibold leading-snug">Choose Folder</div>
            <Button title='New folder' RightIcon={folder} border={true} borderColor='border-neutral-400'/>
          </div>
          <div className="self-stretch h-[58px] flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-950 text-[10px] font-medium leading-[14px]">Folder name</div>
            <select className="self-stretch h-14 px-2 py-4 bg-white rounded-lg border border-neutral-200 justify-between items-center inline-flex"
              onChange={(event) => {
                setSelectedFolder(event.target.value);
              } }
            >
              <option value="Choose folder">--Choose a folder</option>
              {folders.map((folder, index) => (
                <option value={folder} key={index}> {folder}</option>
              ))}
            </select>
          </div>
          <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
            <div className="justify-end items-center gap-2 flex">
              <Button title='Cancel' border={true} borderColor='border-neutral-400'
                onClick={() => {
                  setSelectedFolder('Choose folder');
                  setChooseFolder(false);
                } } />
              <Button backgroundColor='bg-black' title='Save' textColor='text-white' width='w-[80px]' border
                onClick={() => {
                  setChooseFolder(false);
                } } />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>;
}

function sourceChoosing(libraryState,setLibraryState, setSelectedVideo, selectedVideo , projectName , uploadIsOpen, setUploadIsOpen){
  return (
    <div className="w-screen h-screen pt-[155px] pb-[514px] bg-zinc-100 justify-center items-center inline-flex">
    <div className=" self-stretch flex-col justify-start items-start gap-8 inline-flex h-full">
        <div className="text-zinc-950 text-xl font-medium">How would you like to create this step?</div>
        <div className="self-stretch h-[392px] flex-col justify-start items-start gap-4 flex ">
            <SourceButton title='Choose from library' icon={dashIconBlue} onClick={()=>{setLibraryState(true)}}/>
            <Modal isOpen={libraryState} className='h-[600px] w-[80%] bg-white rounded-lg overflow-hidden ' overlayClassName={`fixed inset-0 flex items-center justify-center
              bg-black bg-opacity-70 z-50 `} 
              ariaHideApp={false}>
              <div className='flex flex-row justify-between h-[54px] items-center px-4 border-b border-neutral-200 bg-white'>

                  <div className='text-zinc-950 text-base font-semibold leading-snug'>Video files</div>
                    <button onClick={()=>{
                      setLibraryState(false);
                    }}>
                      <Image src={close} alt={close} />
                    </button>
                  </div>
              <div className='flex flex-row h-[90%]'>
              <Uploads setSelectedVideo={setSelectedVideo} setModalState={setLibraryState} projectName={projectName.trim()} handleClick={handleClick}/>
              </div>
            </Modal>
            <SourceButton title='Upload Video' icon={uploadBlue} onClick={()=>setUploadIsOpen(true)}/>

            <SourceButton title='Record Video' icon={recordIconBlue}/>
            <SourceButton title='Record Screen' icon={screenBlue} />
            <Button title='Add video later' RightIcon={arrow} width='w-[432px]' textColor='text-black'/>
            <UploadModal uploadIsOpen={uploadIsOpen} 
            setUploadIsOpen={setUploadIsOpen} 
            navigateTo={`/conviEditor/${projectName.trim()}`}
             handleClick={handleClick} projectName={projectName}
             />
        </div>
    </div>
</div>
  )
}