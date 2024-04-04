"use Client"
import React, { useEffect, useState } from 'react'
import { ImSun } from 'react-icons/im'
import {HiMoon} from 'react-icons/hi';
import {useSelector,useDispatch} from 'react-redux';
import { selectCurrentMode,setDarkMode } from '@/redux/features/darkmodeSlice';
import Cookies from 'js-cookie';
const ToggleMode = () => {

  let mode=useSelector(selectCurrentMode)
  const dispatch=useDispatch()
  Cookies.set('mode',mode, {expires:10})

  return (
    <div className=' relative md:mr-4'>
        <button className=" bg-transparent rounded-full m-1 flex justify-center gap-2 md:gap-3 text-sm md:text-2xl items-center border-2 px-2  py-1  dark:border-white/50 border-black/60" onClick={()=>dispatch(setDarkMode(!mode))} >
            <ImSun title='Light' className='text-[12px] md:text-[16px] text-white hover:animate-spin hover:text-yellow-200'/>
            <HiMoon title='Dark' className='text-[12px] md:text-[16px] text-black hover:animate-pulse'/>

            <span className={`h-3 w-4  md:w-5 md:h-4 absolute bg-black dark:bg-white/80 hover:bg-orange-400/90    rounded-full ${mode?"right-3":"left-3"} transition ease-linear duration-300`}/>

        
        </button>
    </div>
  )
}

export default ToggleMode