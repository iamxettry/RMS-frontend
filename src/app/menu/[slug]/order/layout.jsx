import Button from '@/components/Button'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>

        <nav className='flex justify-between flex-col gap-3 md:flex-row   items-start md:items-center py-4 border-b-2 border-b-slate-500 md:flex-1'>
            <h1 className='text-3xl font-semibold block text-opacity-70 dark:text-white text-black'>
                Order Your Food
            </h1>
            <div className='w-full md:w-auto flex justify-end'>

            <Button path={"/menu"} title={"Add another"} style={"hidden md:flex"} />
            <Button path={"/menu"} title={"More"} style={" md:hidden"} />
            </div>
        </nav>
        {children}
        
    </div>
  )
}

export default layout