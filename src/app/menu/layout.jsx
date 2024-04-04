import MenuHero from '@/components/menu/MenuHero'
import SearchItems from '@/components/menu/SearchItems'
import React from 'react'

const layout = ({children}) => {
  return (
    <main className='' >
        {/* menu Hero section */}
        <MenuHero/>

        {/* serch bar  */}

        <div className='my-10'>
            <SearchItems/>
        </div>
        <div>
            {children}
        </div>


    </main>
  )
}

export default layout