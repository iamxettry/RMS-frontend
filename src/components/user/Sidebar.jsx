"use client";

import Link from "next/link";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { ImLeaf } from "react-icons/im";
import List from "./List";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className={`shadow-md shadow-gray-700 h-screen p-2 transition-all duration-500 ease-in-out ${
        toggle ? " " : ""
      }   `}
    >
      <div className="flex gap-2 items-center justify-around">
        <div className={`  ${toggle ? "" : "hidden lg:flex"}`}>
          <Link
            href={"/"}
            className="flex items-center py-4 text-sm font-semibold text-gray-900 dark:text-white "
          >
            <span className="self-center text-sm lg:text-2xl font-semibold whitespace-nowrap dark:text-white">
              B<span className="text-orange-500">D.</span>
            </span>
            <ImLeaf className="text-green-500" />
          </Link>
        </div>
        <div className={toggle?"":"" }>
          <HiBars3
            onClick={() => setToggle((prev) => !prev)}
            className={toggle?"text-xl lg:text-3xl cursor-pointer":"text-2xl lg:text-3xl cursor-pointer"}
          />
        </div>
      </div>
      <div>
        <List  toggle={toggle} />
      </div>
    </div>
  );
};

export default Sidebar;
