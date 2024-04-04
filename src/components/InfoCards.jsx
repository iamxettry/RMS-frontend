import { CardInfo } from "@/constants";
import React from "react";
import Button from "./Button";
import Backlight from "./Backlight";

const InfoCards = () => {
  return (
    <div className="z-10 md:grid grid-cols-2 lg:grid-cols-3 relative after:absolute after:z-0  after:contents-[*] after:w-[600px] after:h-96 md:after:bg-hero-8   after:bg-contain after:bg-no-repeat after:bottom-0 after:right-0 md:after:blur-sm lg:after:blur-none shadow-xl">
      {CardInfo.map(({ title, id, desc, btn, logo, path }) => (
        <div key={id} className="p-4 z-10 relative ">
          <div className="md:w-auto md:max-w-xs px-4 py-4 bg-gradient-to-br from-blue-300 to-pink-100 dark:from-black dark:to-black border hover:border-orange-400 border-pink-200 rounded-lg shadow-xl  shadow-gray-700 hover:scale-105 transition-all ease-in-out duration-500  dark:bg-opacity-50 dark:border-gray-600 dark:hover:border-green-400 dark:shadow dark:shadow-white  drop-shadow-md flex flex-col gap-5 justify-center items-center md:h-80">
            <h1 className="w-full flex justify-center items-center text-3xl">
              {logo}
            </h1>

            <h5 className="mb-2 text-2xl md:text-md  font-semibold tracking-tight lg:tracking-normal lg:text-sm lg:font-bold text-gray-900 dark:text-white">
              {title}
            </h5>

            <p className="mb-3 text-center md:text-left  text-gray-800 font-semibold dark:text-gray-400">
              {desc.d1}
              {desc.d2}
              {desc.d3}
            </p>
            <div>
                <Button title={btn} path={path} hideplus={"hidden"} />
            </div>
          </div>
        </div>
      ))}
       <Backlight style={"w-32 h-32 bg-gradient-to-r from-orange-500 to-white right-32 bottom-64 blur-[100px]"}/>
    </div>
  );
};

export default InfoCards;
