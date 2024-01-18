'use client'

import { setProductCount } from "@/redux/features/productCount"
import Cookies from "js-cookie"
// import { setProductCount } from "@/redux/features/orderSlice"
import { useEffect, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useDispatch } from "react-redux"

const IncDec = ({data}) => {
    const [count, setCount] = useState(1)
     // Function to increment  the count
    const dispatch=useDispatch()

     const incrementCount = () => {
    
      setCount(count + 0.5);
      // Cookies.set('count',count)

    };
  
    // Function to decrement the count
    const decrementCount = () => {
      if (count >= 1) {
          setCount(count - 0.5);
        }
    };
     useEffect(()=>{
  
      Cookies.set('count',count)
      dispatch(setProductCount(count))

     },[count, dispatch])
  
  const totalPrice=count*data.price
  return (
    <>
        <div className="flex gap-5 bg-orange-500 py-3 px-5 items-center rounded-full text-white text-2xl">
              <i >
                <FaMinus onClick={decrementCount}/>
              </i>
              <h4>{count}</h4>
              <i>
                <FaPlus onClick={incrementCount} />
              </i>
            </div>
            <h1 className="flex flex-row border-b  border-t dark:bg-opacity-10  dark:text-white p-2  justify-between">
              <span className="font-bold text-sm xs:text-xl w-32 text-black text-opacity-60 dark:text-white ">
                Total Price
              </span>
              <span className="font-bold text-sm xs:text-xl text-center">
                Rs {totalPrice}
              </span>
            </h1>
    </>
  )
}

export default IncDec