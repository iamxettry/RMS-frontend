
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div className=''>
        <div className='flex gap-10 my-5'>
          <Link href={"dashboard/user"} className='bg-orange-500 p-3 rounded-full font-bold'>User Dashboard</Link>
          <Link href={"dashboard/admin"} className='bg-orange-500 p-3 rounded-full font-bold'>Admin Dashboard</Link>
        </div>
    </div>
  )
}

export default Dashboard