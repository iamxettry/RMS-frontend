"use client";
import { data } from "./adminConstants";
import { usePathname } from "next/navigation";
import NavCard from "./NavCard";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import { ImLeaf } from "react-icons/im";

const DashNav = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`h-screen flex justify-between items-center flex-col   shadow-md shadow-gray-800 dark:shadow-blue-300 p-2`}
    >
      <div className="w-full py-2  border-gray-700 flex gap-2 items-center justify-around border-b">
        <div className={`  ${toggle ? "" : "hidden lg:flex"}`}>
          <Link
            href={"/"}
            className="flex items-center  text-sm font-semibold text-gray-900 dark:text-white "
          >
            <span className="self-center text-sm lg:text-2xl font-semibold whitespace-nowrap dark:text-white">
              B<span className="text-orange-500">D.</span>
            </span>
            <ImLeaf className="text-green-500 animate" />
          </Link>
        </div>
        <div className="">
          <HiMenu
            className="cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>
      <div className="flex-1 my-2">
        {data.map((item) => (
          <div key={item.id} className="border-b border-gray-600 pb-5">
            {item.link.map((i) => {
              let isActive = pathname === `${i.path}`;
              return (
                <li
                  key={i.id}
                  className={`${
                    isActive
                      ? " font-bold bg-gradient-to-r from-blue-300 to-pink-200 rounded-md text-black  "
                      : ""
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
