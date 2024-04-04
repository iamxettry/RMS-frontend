"use client"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {toast} from 'react-toastify'
const EditOrder = ({itemId,slug,quantity,setEditItem}) => {


    const [value, setValue] = useState(quantity)

    const router=useRouter()
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const userId= Cookies.get("userId")
        try {
          const res= await fetch(`http://127.0.0.1:8000/api/order/cart/${itemId}/`,{
            method:"PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: value,
              u_id: userId,
              f_id: slug,
            }),
          })
          if (res.ok) {
            const data=await res.json()
            toast.success(data.message)
            router.push(`/menu/${userId}/order#order`)
            setEditItem(false)
          }
          if (!res.ok) {
            toast.error(res.statusText)
          }
        } catch (e) {
          toast.error('Connection Error!')
        }

    }
  return (
    <td>
      <form className="flex justify-center items-center gap-2" onSubmit={handleSubmit}>
        <input  type="number" name="quantity" id="quantity" className="w-12 from-current text-black bg-white rounded-md  shadow outline-none focus:outline-none px-2 py-1 text-xs " value={value} onChange={(e)=>setValue(e.target.value)}  />

        <input type="submit" value={"Save"} className="bg-green-500 px-2 py-1 rounded-md text-sm "/>
         
      </form>
    </td>
  );
};

export default EditOrder;
