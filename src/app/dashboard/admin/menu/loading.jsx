import React from 'react'
import { FaSpinner } from "react-icons/fa6";


const Loading = () => {
  return (
    <div className='w-full flex items-center justify-center h-96'>
    <FaSpinner className='text-4xl animate-spin' />
    </div>
  )
}

export default Loading