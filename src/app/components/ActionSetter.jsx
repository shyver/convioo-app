import React, {useState} from 'react'
import Image from 'next/image'
import { down, scenarioicon,link } from '../assets'
import OptionSourceButton from './buttons/OptionSourceButton';
const ActionSetter = (props) => {
  const [dropOptions, setDropOptions] = useState(false);
  const [switched, setSwitched] = useState(props.option.external)
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
        <button className='h-[45px] w-full border  bg-white rounded-xl flex items-center p-2 justify-between'
                onClick={()=>{
                  setDropOptions(!dropOptions);
                }}>
          <div className='text-slate-400'>Choose destination</div>
          <Image src={down} alt='downArrow' />
        </button>
              
        <div className={`w-full flex flex-col bg-white rounded-lg ${dropOptions ? '' : 'hidden'} overflow-hidden`}>
        <OptionSourceButton icon={scenarioicon} title='Choose video'/>
        <div className='w-full h-px bg-slate-200'/>
        <OptionSourceButton icon={link} title='To URL' switched={switched} setSwitched={setSwitched}
        onClick={()=>{
          setSwitched(true);
        }}
        onBlur={(event)=>{
          props.handleEdit(props.option.id,props.option.title,event.target.value,event.target.value!='');
          if(event.target.value=='')
          setSwitched(false);
        }}
          defaultValue={props.option.destination}
          />
        

        </div>
        
    </div>
  )
}

export default ActionSetter