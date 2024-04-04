"use client";
import Logo from "@/utils/Logo";

import React, { useEffect, useState } from "react";
import ToggleMode from "./ToggleMode";
import ProfileBar from "./ProfileBar";
import { Navlinks } from "@/constants/Navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import CartBox from "./CartBox";
import { selectCartCount, selectPrevCount } from "@/redux/features/CartCountSlice";
import {useSelector} from "react-redux"

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const cartCount=useSelector(selectCartCount)
  const previousCount=useSelector(selectPrevCount)
  useEffect(() => {
    // Check if cartCount has changed and is greater than the previous count
    if (cartCount >= previousCount) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [cartCount, previousCount]);
  useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = scrollY.getPrevious();
      if (latest > previous && latest > 150) {
        setHidden(true);
  
      } 
       else {
        setHidden(false);
      }
  
  });
  return (
    <>
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 left-0 z-50 border-b dark:border-white/25 border-black/15 shadow-md  dark:shadow-white/25  md:py-2    bg-gradient-to-r from-blue-300 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:to-black transition duration-500 ease-linear "
    >
      <div className="w-[90%] md:w-[90%] lg:w-4/5 mx-auto flex  justify-between items-center relative sm:justify-evenly lg:justify-between ">
        <Logo />
        <div className="flex items-center justify-between ">
          <ToggleMode />

          {/* NavItems */}
          <ul
            className={`flex gap-4 justify-center items-center transition-all duration-500  border-gray-100 dark:border-gray-700 ease-in-out   md:flex-row  ${
              navToggle
                ? " flex-col absolute  dark:bg-black bg-slate-200 md:bg-transparent w-full border top-14 left-0 rounded-md py-5 "
                : "hidden md:flex "
            } md:relative md:border-none md:top-0  `}
          >
            {Navlinks.map((item, index) => {
              let isActive = pathname === item.url;
              return (
                <Link
                  href={item.url}
                  key={index}
                  className={`cursor-pointer ${
                    isActive
                      ? " md:text-orange-500 dark:md:text-orange-500 dark:md:bg-transparent md:bg-transparent  font-bold  bg-green-500 transition ease-linear duration-500 dark:bg-green-700  rounded-md text-white border-none "
                      : "hover:text-orange-400 transition-all duration-500 ease-linear font-semibold text-black/80 "
                  } border-b border-gray-700  w-11/12 text-left pl-4 md:pl-0 py-1  md:border-none  dark:text-white/80 font-bold  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </ul>
        </div>
        <CartBox/>
        <ProfileBar />
        <HiMenu
          className="text-2xl dark:text-white/80 text-black  transition ease-linear duration-500 md:hidden"
          onClick={() => setNavToggle(!navToggle)}
          title="Menu"
        />
      </div>
    </motion.nav>
    </>

  );
};

export default Navbar;
