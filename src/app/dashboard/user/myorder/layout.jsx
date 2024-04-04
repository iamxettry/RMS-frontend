import React from 'react'

const layout = ({children}) => {
  return (
    <div className=''>
        <section className='p-4 border-b-2 border-gray-700/50 drop-shadow-md'>
            <h1 className='text-3xl font-bold text-opacity-70 text-black dark:text-white'>My Order</h1>
        </section>
        <section className='p-2'>{children}</section>
    </div>
  )
}

export default layout