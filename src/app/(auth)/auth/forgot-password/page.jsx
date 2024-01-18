"use client";

import { useSendPasswordResetEmailMutation } from "@/redux/services/users/userApi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {toast} from 'react-toastify'
import ResetPasswordLink from "@/components/ResetPasswordLink";

// Email Regex

const EMAIL_REGEX = /^[^\s@]{4,}@[^\s@]+\.[^\s@]+$/;
const ForgetPassword = () => {
  const emailref = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false)
  const [enable, setEnable] = useState(false)

  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation()
  useEffect(()=>{
    emailref.current.focus()
  },[])
  useEffect(()=>{
    if (validEmail) {
      setEnable(false)
    }else{
      setEnable(true)
    }
  },[validEmail])
  useEffect(()=>{
    const result=EMAIL_REGEX.test(email)
    setValidEmail(result);
  },[email])

  // submit function
  const handleSubmit=async (e)=>{
    e.preventDefault()

      const res= await sendPasswordResetEmail({email})
      if (res.data) {
        toast.success(res.data.message)
        Cookies.set("reset_link",res.data.reset_link, {expires:1})
      }
      if (res?.error?.data?.non_field_errors) {
        toast.error(res.error.data.non_field_errors[0])
      }else{
        toast.error(res.error);
      }
    
  }
  return (
    <>
      <ResetPasswordLink/>
      <div className="relative z-0 dark:border dark:border-white/80 border-black/80 rounded-2xl  shadow-md drop-shadow-xl dark:shadow-white/50 shadow-gray-700 p-2  lg:w-4/5 mx-auto">
        <div className="min-h-60 py-5 lg:px-4">
          <h1 className="text-2xl md:text-3xl font-serif -tracking-tighter mb-6">
            Enter Your email
          </h1>
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 relative">
              <label htmlFor="email">Your Email :</label>
              <input
                ref={emailref}
                type="email"
                id="email"
                name="email"
                value={email}
                required
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="  border border-black/50  text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 bg-transparent dark:border-white/40 placeholder:text-black/45 dark:placeholder:text-white/60 dark:text-white   dark:focus:outline-white/85 focus:outline-black/85  focus:outline    "
              />
            </div>
            <input
              type="submit"
              disabled={enable}
              value="Sign in"
              className=" disabled:bg-gray-500 disabled:text-black/45   p-2 rounded-full w-full md:w-auto md:px-4 bg-orange-500 hover:bg-orange-700 font-bold font-serif  "
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
