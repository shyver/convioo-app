import React from 'react'

const SquarePlus = (props) => {
  return (
    <button className='h-6 w-6 bg-black rounded-md text-white flex justify-center items-center pb-[2px]'
    onClick={props.onClick}
    >+</button>
  )
}

export default SquarePlus