import React from 'react'
import Link from 'next/link'
import { ImArrowLeft2 } from 'react-icons/im'
const Ordernav = () => {
  return (
    <section className='flex justify-between items-center '>
        <Link
            href={"/dashboard/user/"}
            className="flex gap-2 items-center py-2 my-2 cursor-pointer"
          >
            <ImArrowLeft2 />
            <h1 className="font-bold ">Back</h1>
          </Link>
          <Link
            href={`/dashboard/user/myorder/history`}
            className="flex gap-2 items-center py-2 my-2 cursor-pointer mr-4 md:mr-10"
          >
            <h1 className="font-bold ">View History</h1>
          </Link>
    </section>
  )
}

export default Ordernav