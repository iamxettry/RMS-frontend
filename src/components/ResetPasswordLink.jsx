"use client"
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import Link from "next/link";

const ResetPasswordLink = () => {

    const reset_link=Cookies.get('reset_link')
    useEffect(()=>{
        if (reset_link) {
            setTimeout(() => {
                Cookies.remove('reset_link')
            }, 1000);
        }
    },[reset_link])
    
  return (
    <div className={reset_link?"flex flex-col px-4 my-2 py-2 border rounded-md border-red-400":"hidden"}>
        <h1>Flollow the link:</h1>

    <Link href={reset_link?reset_link:"/auth/forgot-password"}  className={'text-red-400'}  >{reset_link}</Link>
    </div>
  )
}

export default ResetPasswordLink