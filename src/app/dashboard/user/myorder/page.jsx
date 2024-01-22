import OrderItem from '@/components/dashboard/user/OrderItem'
import Ordernav from '@/components/dashboard/user/Ordernav'
import React from 'react'

const page = () => {
  return (
    <div>
        <Ordernav/>
        <section className=''>
            <table className=' w-full text-sm text-left text-gray-700 dark:text-gray-400 rounded-lg shadow-sm shadow-gray-600'>
                <thead className=''>
                    <tr className='font-bold bg-blue-200 dark:bg-gray-700 ' >
                        <th className='p-2'>Food Name</th>
                        <th className='p-2'>Quantity</th>
                        <th className='p-2'>Price</th>
                        <th className='p-2'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <OrderItem/>
                </tbody>
            </table>
        </section>
    </div>
  )
}

export default page