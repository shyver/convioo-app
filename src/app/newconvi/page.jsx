'use client'

import React, {useState, useEffect} from 'react'
import Button from '../components/buttons/Button'
import { arrow, close, dashIconBlue, down, folder, libraryicon, recordIconBlue, screenBlue, upload, uploadBlue } from '../assets'
import Image from 'next/image';
import Modal from 'react-modal';
import { getStorage,listAll,ref } from 'firebase/storage';
import { AnimatePresence, motion } from 'framer-motion';
import SourceButton from '../components/buttons/SourceButton';
import Uploads from '../dashboard/library/uploads/page';
import InputBox from '../components/InputBox';
import UploadModal from '../components/UploadModal';
import { setDoc,doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, listFolders } from '../firebase';
import { arrayUnion } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
function handleClick(user, projectName, url, router, folder) {
  setDoc(doc(db, `scenarios/${user.uid}/${folder}/${projectName}`),{
    id:projectName
  })
  updateDoc(doc(db, `scenarios/${user.uid}`),{
    folders: arrayUnion(folder)
  });
  setDoc(doc(db, `scenarios/${user.uid}/${folder}/${projectName}/cards`, '0'), {
    videosrc:url,
    prev:null,
    title:'',
    overlay: '',
    options:[],
    position: {x:300,y:0}
  }).then(() => {
    console.log('upload done!');
  });
  router.replace(`conviEditor/${folder}/${projectName}`);
}

const Page = () => {
    const [currentFolder, setCurrentFolder] = useState('folderless');
  
    const storage =getStorage();
    const [chooseFolder, setChooseFolder] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState('Choose folder');
    const listRef = ref(storage, 'scenarios');
    const [folders, setFolders] = useState([]);
    const [firstScreen, setFirstScreen] = useState(true);
    const [projectName, setProjectName] = useState(0);
    const [libraryState, setLibraryState] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState([]);
    const [uploadIsOpen, setUploadIsOpen] = useState(false);
    const [newFolder, setNewFolder] = useState(false);
    const [user] = useAuthState(auth);

  useEffect(() => {
    if(user!=null) listFolders({user:user}).then((res) => {
      if (res) {
        setFolders(res);
      }
    });
  },[user]);



  return (
    <div className='bg-[#f4f4f5] overflow-hidden'> 
    <AnimatePresence>
  {firstScreen && (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1 , y:0}}
      exit={{ opacity: 0, y: -30 }}
    >

        {nameAndFolderSetting(setChooseFolder, selectedFolder, chooseFolder, setSelectedFolder, folders, setFirstScreen, setProjectName,projectName, setNewFolder, newFolder,currentFolder, setCurrentFolder,setFolders)}
        </motion.div>)}
        </AnimatePresence>
    <AnimatePresence>
  {!firstScreen && (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1 , y:0}}
      exit={{ opacity: 0, y: -30 }}
    >
        
                {sourceChoosing(libraryState,setLibraryState , setSelectedVideo, selectedVideo, projectName, uploadIsOpen, setUploadIsOpen,currentFolder)}
    </motion.div>
        )

        }
    </AnimatePresence>

    </div>
  )
}

export default Page














function nameAndFolderSetting(setChooseFolder, selectedFolder, chooseFolder, setSelectedFolder, folders, setFirstScreen, setProjectName, projectName, setNewFolder, newFolder, currentFolder ,setCurrentFolder,setFolders) {
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
            }}
          >
            <div className={`${selectedFolder == 'Choose folder' ? 'text-gray-400' : 'text-black'}`}>{selectedFolder}</div>
            <Image src={down} alt='down arrow' />
          </button>
        </div>
        <Button title='Create Scenario' backgroundColor='bg-black' textColor='text-white' width='w-[416px]' LeftIcon={arrow} 
         onClick={()=>{
          if(!projectName) 
          alert('Please enter project name');
          else
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
            <Button title='New folder' RightIcon={folder} border={true} borderColor='border-neutral-400' textColor='text-black'
            onClick={()=>{
              setNewFolder(true);
              setChooseFolder(false);
            }}
            
            />
          </div>
          <div className="self-stretch h-[58px] flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-950 text-[10px] font-medium leading-[14px]">Folder name</div>
            <select className=" text-black self-stretch h-14 px-2 py-4 bg-white rounded-lg border border-neutral-200 justify-between items-center inline-flex"
              onChange={(event) => {
                console.log(event.target.value);
                setSelectedFolder(event.target.value);
                setCurrentFolder(event.target.value);
              } }
            >
              <option value="Choose folder" className='text-black'>--Choose a folder</option>
              {folders.map((folder, index) => (
                <option value={folder} key={index}> {folder}</option>
              ))}
            </select>
          </div>
          <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
            <div className="justify-end items-center gap-2 flex">
              <Button title='Cancel' border={true} borderColor='border-neutral-400' textColor='text-black'
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
        <Modal className='w-[449px] h-[190px] px-4 pb-4 bg-white rounded-2xl shadow flex-col justify-center items-center gap-4 inline-flex mt-8'
          isOpen={newFolder}
          overlayClassName={`
            fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-70 z-50 
          `}>
          <div className="self-stretch mt-4 bg-white justify-between items-center gap-[37px] inline-flex h-fit">
            <div className="text-zinc-950 text-base font-semibold leading-snug">Create new folder</div>
          </div>
          <div className="self-stretch h-[58px] flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-950 text-[10px] font-medium leading-[14px]">Folder name</div>
            <input type="text" className=" text-black self-stretch h-14 px-2 py-4 bg-white rounded-lg border border-neutral-200 justify-between items-center inline-flex"
              onChange={(event) => {
                setCurrentFolder(event.target.value);
              } }/>
          </div>
          <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
            <div className="justify-end items-center gap-2 flex">
              <Button title='Cancel' border={true} borderColor='border-neutral-400' textColor='text-black'
                onClick={() => {
                  setSelectedFolder('Choose folder');
                  setNewFolder(false);
                  setChooseFolder(true);
                } } />
              <Button backgroundColor='bg-black' title='Save' textColor='text-white' width='w-[80px]' border
                onClick={() => {

                  setSelectedFolder(currentFolder);
                  console.log(currentFolder);
                  setFolders([...folders,currentFolder]);
                  console.log(folders);
                  setNewFolder(false);
                  setChooseFolder(true);
                } } />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>;
}

function sourceChoosing(libraryState,setLibraryState, setSelectedVideo, selectedVideo , projectName , uploadIsOpen, setUploadIsOpen, currentFolder){
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
              <Uploads setSelectedVideo={setSelectedVideo} setModalState={setLibraryState} projectName={projectName.trim()} currentFolder={currentFolder} handleClick={handleClick} onClick={()=>{
                
              }}/>
              </div>
            </Modal>
            <SourceButton title='Upload Video' icon={uploadBlue} onClick={()=>setUploadIsOpen(true)}/>

            <SourceButton title='Record Video' icon={recordIconBlue}/>
            <SourceButton title='Record Screen' icon={screenBlue} />
            <Button title='Add video later' RightIcon={arrow} width='w-[432px]' textColor='text-black'/>
            <UploadModal uploadIsOpen={uploadIsOpen} 
            setUploadIsOpen={setUploadIsOpen} 
            navigateTo={`/conviEditor/${currentFolder}/${projectName.trim()}`}
             handleClick={handleClick} projectName={projectName}
             currentFolder={currentFolder}
             />
        </div>
    </div>
</div>
  )
}