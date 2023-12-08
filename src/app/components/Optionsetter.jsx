import React from 'react';
import { minusCircle } from '../assets';
import Image from 'next/image';

const Optionsetter = ({ id, text, onDragStart, onDragOver, onDrop, onChange, minusOnClick }) => {
  const handleDragStart = (e) => {
    onDragStart(e, id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver(id);
  };

  const handleDrop = (e) => {
    onDrop(id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className='h-12 w-[90%] mb-4 flex items-center gap-2'
    >
      <div className='bg-[#eaf5ff] flex flex-row h-full justify-between items-center rounded-xl p-2 gap-2'>
      <div className='h-6 w-6 bg-blue-700 rounded-full flex justify-center items-center text-bold text-white'> {String.fromCharCode(65+id)}</div>
      <input type="text" className='bg-transparent ' onChange={onChange} value={text}/>
      <button onClick={minusOnClick}>
      <Image src={minusCircle} alt='minus circle' />
      </button>
      </div>

    </div>
  );
};

export default Optionsetter;
