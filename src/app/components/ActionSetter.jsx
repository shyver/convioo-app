import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { down, scenarioicon,link } from '../assets'
import OptionSourceButton from './buttons/OptionSourceButton';
import OptionVideoDestinationList from './buttons/OptionVideoDestinationList';
import OptionVideoDestination from './buttons/OptionVideoDestination';
import OptionLinkDestination from './buttons/OptionLinkDestination';
const ActionSetter = (props) => {
  const [dropOptions, setDropOptions] = useState(false);
  const [videoSelection, setVideoSelection] = useState(props.option.destination !=''&&props.option.external?'link selected' : props.option.destination !=''?'selected':'idle');

  useEffect(() => {
    
    setVideoSelection( props.option.destination !=''&&props.option.external?'link selected' : props.option.destination !=''?'selected':'idle')


  }, [props.selectedCardId])
  


  return (
    <div className='w-[320px] bg-[#eaf5ff] rounded-xl my-2 flex flex-col p-2 justify-between gap-2'>
        <div className='h-[50px] w-full border border-indigo-600 rounded-xl flex flex-row items-center justify-start gap-2 px-2'>
          <div className='h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center text-white '>
            {String.fromCharCode(65+props.option.id)}
          </div>
          
          <div className='text-black'>{props.option.title}</div>
        </div>
        <div className='text-zinc-950 text-sm font-semibold'>
            Go To
        </div>
        <button className={` ${videoSelection=='selected' || videoSelection=='link' ? 'hidden' : null} h-[45px] w-full border  bg-white rounded-xl flex items-center p-2 justify-between`}
                onClick={()=>{
                  setDropOptions(!dropOptions);
                }}>
          <div className='text-slate-400'>Choose destination</div>
          <Image src={down} alt='downArrow' />
        </button>
        <OptionVideoDestination videoSelection={videoSelection}  
        setVideoSelection={setVideoSelection}
         cards={props.cards} 
        selectedCardId={props.selectedCardId}
         option={props.option} handleOptionsEdit={props.handleOptionsEdit}/>

         <OptionLinkDestination  videoSelection={videoSelection}  
        setVideoSelection={setVideoSelection}
         cards={props.cards} 
        selectedCardId={props.selectedCardId}
         option={props.option} handleOptionsEdit={props.handleOptionsEdit}/>



        <div className={`w-full flex flex-col ${videoSelection=='link' ? 'hidden' : ''} rounded-lg ${dropOptions ? '' : 'hidden'} overflow-hidden`}>
        <OptionSourceButton icon={scenarioicon} title='Choose video' videoSelection={videoSelection}
         onClick={()=>{
          setVideoSelection('selecting');
          
         }}/>
        <OptionVideoDestinationList
         videoSelection={videoSelection} cards={props.cards}
          selectedCardId={props.selectedCardId}
          handleOptionsEdit={props.handleOptionsEdit}
          option={props.option} setVideoSelection={setVideoSelection}
          
        />

        <div className='w-full h-px bg-slate-200'/>
        <OptionSourceButton icon={link} title='To URL' videoSelection={videoSelection}
        onClick={()=>{
          setVideoSelection('link');
          props.handleOptionsEdit(props.option.id,props.option.title, props.option.destination,true,props.option.enabled);
        }}
          />
        

        </div>
        
    </div>
  )
}

export default ActionSetter