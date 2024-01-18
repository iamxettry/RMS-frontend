"use client"

import getCategoryList from "@/app/lib/getCategory"
import { selectSearchValue } from "@/redux/features/searchTerm"
import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
const MenuCategoryNav = () => {
    const [category, setCategory] = useState([])
    const searchTerm= useSelector(selectSearchValue)
    useEffect(()=>{
        const fetchData=async ()=>{
            const data= await getCategoryList()

            setCategory(data.result)

        }

        fetchData()
    },[searchTerm])
  return (
    <div className="flex bg-transparent  px-4 py-3 justify-start items-center gap-5 border-b-2 border-gray-500 dark:drop-shadow-md flex-wrap text-gray-700 dark:text-white/80">

        {
            category.map((item)=>(
                <li key={item.category} className="list-none">
                <a
                  href={`#${item.category}`}
                  className=" ease-linear transition-transform text-2xl capitalize font-bold hover:text-orange-500"
                >
                  {item.category} <span className="text-sm text-orange-500">|</span>
                </a>
              </li>
            ))
        }
       
       
      </div>
  )
}

export default MenuCategoryNav