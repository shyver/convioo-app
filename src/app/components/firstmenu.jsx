'use client'
import React, { useState } from 'react'
import { menustyle } from '../constants'
import { libraryicon,scenarioicon } from '../assets'
import OneIconMenuButton from './buttons/OneIconMenuButton'
const Firstmenu = (props) => {

  return (
    <div className={menustyle}>
    <div className="self-stretch h-[138px] flex-col justify-start items-start gap-8 flex">
        <div className="text-black text-base font-semibold leading-tight">Dashboard</div>
        <div className="self-stretch h-[86px] flex-col justify-start items-center gap-1.5 flex">
            <OneIconMenuButton image={libraryicon} title="Library" bg={props.bg? "bg-zinc-100" :"bg-white"} onClick={props.firstbuttonclick} />
            <OneIconMenuButton image={scenarioicon} title="Scenario" bg={props.bg? "bg-white":"bg-zinc-100" } 
            onClick={props.secondbuttonclick}
            />
        </div>
    </div>
</div>
  )
}

export default Firstmenu