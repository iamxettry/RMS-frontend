"use client";
import Btn from "@/utils/Btn";
import Image from "next/image";
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import { hero } from "../../public/assets";
import Cookies from "js-cookie";
import { useGetLoggedUserQuery } from "@/redux/services/users/userApi";
const ProfileBar = () => {
  const [toggleProfile, setToggleProfile] = useState(false);
  useEffect(() => {
    let countdownTimeout;
    if (toggleProfile) {
      clearTimeout(countdownTimeout);
      countdownTimeout = setTimeout(() => {
        setToggleProfile(false);
      }, 5000);
    }
    return () => {
      clearTimeout(countdownTimeout);
    };
  }, [toggleProfile]);
  const accessToken = Cookies.get('access_token'); 
    const {data}=useGetLoggedUserQuery(accessToken);
  return (
    <div className="relative ">
      {data?( <>
          <button
            className={`rounded-full bg-pink-500 w-10 h-10 flex justify-center items-center cursor-pointer `}
            onClick={() => setToggleProfile(!toggleProfile)}
          >
            <Image
              src={hero}
              alt={` profile`}
              className="w-auto h-auto"
              priority
            />
          </button>
          <div
            className={` absolute top-20  -right-10 lg:-right-20 transition-all ease-in duration-500  rounded-xl   ${
              toggleProfile ? " w-60 flex shadow-md shadow-gray-500 p-2  bg-gradient-to-r dark:from-black dark:to-black from-blue-300 to-pink-100 box-decoration-slice " : " w-0 overflow-hidden border-none"
            }`}
          >
            <UserInfo />
          </div>
        </>):(
          <div className={`border-2  dark:border-white/60 border-black/60 dark:hover:border-white/90 hover:border-black hover:shadow-md  hover:shadow-[0_10px_10px_rgb(255 255 255,0.5)] px-2 md:px-3 md:py-1 rounded-xl font-bold hover:text-orange-500 transition duration-500 ease-in-out text-sm text-black/80 dark:text-white/80 font-serif ${data?"hidden":"flex"}`}>
          <Btn
            title="Signup/Login"
            style={"hidden md:flex"}
            path={"/auth/signup"}
          />
          <Btn
            title="Login"
            path={"/auth/signup"}
            style={"md:hidden text-[12px]"}
          />
        </div>
        )}
     
        
        
    
    </div>
  );
};

export default ProfileBar;
