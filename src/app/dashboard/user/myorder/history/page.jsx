'use client'

import Cookies from "js-cookie"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ImArrowLeft2, ImCheckmark, ImCross } from "react-icons/im"
import { toast } from "react-toastify"

const History = () => {
    const [data, setdata] = useState([])
  const user = Cookies.get("user");
  const userId = Cookies.get('userId');

    useEffect(()=>{
        const fetchData = async ()=>{

            try {
                const res = await fetch(
                  `http://127.0.0.1:8000/api/order/completed-orders/${userId}/`,
                  { next: { revalidate: 0 } },
                  {
                    method: "GET",
                  }
                );
            
                if (res.ok) {
                  const completedData= await res.json()
                  setdata(completedData.result)
                }else{
                  const completedData= await res.json()
                    toast.error('Fetch error')

                }
              } catch (error) {
                toast.error("Network Error") ;
              }
        }
        fetchData()
    },[userId])
  return (
    <main>
        <div className="flex justify-between items-center text-gray-700 dark:text-white">
        <Link href={`/dashboard/user/myorder/`} className="flex gap-2 items-center py-2 my-2 cursor-pointer">
            <ImArrowLeft2 />
            <h1 className="font-bold ">Back</h1>
        </Link>
            <h2 className="font-bold py-2  mr-4 md:mr-10">My  Order History</h2>
        </div>
         <div className="relative  shadow-md sm:rounded-lg z-10 w-[96%] md:w-[90%] lg:w-4/5 mx-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 text-center ">
                  Items
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Completed
                </th>

                <th scope="col" className="px-4 py-3 text-center ">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => {
                const { id, completed, quantity } = item;
                const { name } = item.menu_item;
                return (
                  <tr key={id}>
                    <td className="px-4 py-3 text-center capitalize ">{name}</td>
                    <td className="px-4 py-3 text-center ">{quantity}</td>
                    <td className="px-4 py-3  flex justify-center items-center ">
                      {completed ? (
                        <ImCheckmark className="text-green-500" />
                      ) : (
                        <ImCross className="text-red-600" />
                      )}
                    </td>
               
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>
    </main>
  )
}

export default History