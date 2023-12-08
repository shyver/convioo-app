import React from 'react'

const OneIconCheckbox = (props) => {
  return (
    <div className={`${props.sizeCss} bg-blue-100 flex flex-row border border-neutral-200 rounded-lg items-center justify-between px-3`}>
        <div className='flex flex-row gap-2'>
        <div className='h-6 w-6 rounded-full bg-indigo-600 flex justify-center items-center text-white'>A</div>
        <div > {props.title}</div>
        </div>
        <input type='checkbox' className='h-[20px] w-[20px] border-4 border-indigo-600' />
        


    </div>
  )
}

export default OneIconCheckbox