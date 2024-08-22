import React, {useEffect, useState} from 'react'
import { menustyle } from '../constants'
import Source from './Source'
import Image from 'next/image'
import { folderstack_black, folderstack_blue } from '../assets'
import { usePathname } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getSubcollections, listFolders,db } from '../firebase'
import { auth } from '../firebase'
import { getDocs,collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { ref,listAll,getStorage } from 'firebase/storage'
const storage = getStorage();
const Secondmenu = (props) => {
    const [selected, setSelected] = useState('');
    const [user]= useAuthState(auth);
    const [folders, setFolders] = useState([]);
    const [filecount, setFilecount] = useState(0);
    const path=usePathname();
    const router = useRouter();
    useEffect(() => {
        console.log('setting path',path);
      setSelected(decodeURIComponent(path));
    
    }, [path])

    useEffect(() => {
      
        if(user){
            console.log('selected',selected);
            if(selected.includes('/dashboard/scenario')){
                    listFolders({user:user}).then(async (folderNames)=>{
                        let totalCount = 0;
                        const folderData = await Promise.all(
                            folderNames.map(async (folderName) => {
                              const countSnapshot = await getDocs(collection(db, `scenarios/${user.uid}/${folderName}`));
                              const count = countSnapshot.size;
                              totalCount+=count;
                              return { name: folderName, count };
                            })
                          );
                    
                          setFolders(folderData);
                          setFilecount(totalCount)
                          console.log('folder data?',folderData);
                    })}else{
                        try{
                            const listRef = ref(storage, `${user.uid}/videos/`);
                            listAll(listRef)
                              .then(async (res) => {
                                setFilecount(res.items.length);
                              });
                          }catch(err){
                            console.log(err);
                          }
                    }
                
            
        }
      return () => {
        
      }
    }, [user,selected])
    const _menuButton = (folder,index)=>{

    return folder.name =='folderless'? <div key={index}></div> :  <div key={index} className="self-stretch  flex-col justify-start items-center gap-1.5 flex">
    <div className={` ${selected == `/dashboard/scenario/uploads/${folder.name}` ? 'bg-[#f4f4f4] ' : ''} w-[217px] px-4 py-2.5  rounded justify-between items-center gap-2 inline-flex`} onClick={()=>{
        router.replace(`/dashboard/scenario/uploads/${folder.name}`)
        setSelected(`/dashboard/scenario/uploads/${folder.name}`);
        
    }}>
        <div className="justify-start items-center gap-2 flex">
            <Image src={selected == `/dashboard/scenario/uploads/${folder.name}` ? folderstack_blue : folderstack_black} alt="folderstack"/>
            <div className={`text-zinc-950 text-sm  leading-[18px] ${selected == `/dashboard/scenario/uploads/${folder.name}` ? 'font-semibold' : 'font-medium'} `}>{folder.name}</div>
        </div>
        <div className={`text-right ${selected == `/dashboard/scenario/uploads/${folder.name}` ? 'text-[#3D4FE0]' : 'text-zinc-950' } text-xs font-medium leading-[18px]`}>{folder.count}</div>
    </div>

</div>
    }
    
    
    
  return (
    <div className={menustyle}>
        <Source bg={props.bg}/>
    <div className="self-stretch flex-col justify-start items-start gap-2 flex">
        <div className="text-black text-base font-semibold leading-tight">Folders</div>
        <div className="self-stretch  flex-col justify-start items-center gap-1.5 flex">
            <div className={` ${selected == props.allDirectory ? 'bg-[#f4f4f4] ' : ''} w-[217px] px-4 py-2.5  rounded justify-between items-center gap-2 inline-flex`} onClick={()=>{
                props.allClick();
                console.log(selected);
                setSelected(props.allDirectory);
                
            }}>
                <div className="justify-start items-center gap-2 flex">
                    <Image src={selected == props.allDirectory ? folderstack_blue :folderstack_black} alt="folderstack"/>
                    <div className={`text-zinc-950 text-sm  leading-[18px] ${selected==props.allDirectory ? 'font-semibold' : 'font-medium'} `}>All</div>
                </div>
                <div className={`text-right  text-xs font-medium leading-[18px] ${selected == props.allDirectory ? 'text-[#3D4FE0]':'text-zinc-950'} `}>{filecount}</div>
            </div>

        </div>
        { folders.length && selected.includes('/dashboard/scenario')? folders.map((folder, index) => {
            return _menuButton(folder,index)
        }) : null}
    </div>
</div>
  )


  


}

export default Secondmenu