import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
  return (
    <div className='w-full flex items-center justify-center h-24'>
    <FaSpinner className='text-4xl animate-spin' />
    </div>
  )
}

export default Loading