"use client";
import { data } from "./adminConstants";
import { usePathname } from "next/navigation";
import NavCard from "./NavCard";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";

const DashNav = () => {
    const [toggle, setToggle] = useState(false)
  const pathname = usePathname();

  return (
    <div className={`flex justify-between items-center flex-col   shadow-md shadow-gray-800 dark:shadow-blue-300    h-full ${toggle?"w-36 absolute h-screen bg-blue-200 dark:bg-black z-10 md:relative":"w-16 md:w-36 "}`}>
      <div className="flex justify-center items-center py-2 my-2 text-xl  border-b border-gray-700 w-full">
        <HiMenu className="cursor-pointer" onClick={()=>setToggle(!toggle)} />
      </div>
      <div className="flex-1">
        {data.map((item) => (
          <div key={item.id} className="border-b border-gray-600 pb-5">
            {item.link.map((i) => {
              let isActive = pathname === `${i.path}`;
              return (
                <li
                  key={i.id}
                  className={`${
                    isActive ? " font-bold bg-gradient-to-r from-blue-300 to-pink-200 rounded-md text-black  " : ""
                  } list-none p-2 font-semibold`}
                >
                  <NavCard item={i} toggle={toggle} />
                </li>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashNav;
