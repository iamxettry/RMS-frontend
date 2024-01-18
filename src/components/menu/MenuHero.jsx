import React from "react";
import DahsedLine from "../DahsedLine";
import Backlight from "../Backlight";

const MenuHero = () => {
  return (
    <div className="md:h-96 z-10 py-10 relative after:absolute after:z-0  after:contents-[*]  md:after:w-[600px] after:h-96 md:after:bg-hero-11 after:bg-contain after:bg-no-repeat md:after:blur-sm md:after:opacity-50 lg:after:blur-none after:top-0 after:right-0">
      <div className="flex  justify-center items-center flex-col h-48 gap-10 z-40 relative ">
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-opacity-80">
          Main Menu
        </h1>
        <p className="text-lg text-gray-800 dark:text-slate-300 font-bold">
          Experience the Magic of Bubbles at BubbleDubble.
        </p>
      </div>
      <DahsedLine style={'absolute right-[50%] z-0 top-52 w-40 border-b border-dashed border-black after:contents-[*] after:h-40  after:border-r after:border-dashed after:right-20 after:-top-20 after:absolute after:border-black dark:border-white dark:after:border-white'} />
      <DahsedLine style={'absolute right-0 md:-right-10 bottom-0 w-32 border-b border-dashed border-black after:contents-[*] after:h-32 after:border-r after:border-dashed after:right-8 after:-bottom-8 after:absolute after:border-black dark:border-orange-500 dark:after:border-orange-500'} />
      <Backlight
          style={
            "w-32 md:w-40 h-32 md:h-40 bg-gradient-to-r lg:from-orange-200 lg:to-pink-200 left-32 top-20 blur-[60px] md:blur-[100px]  from-orange-500 to-green-700 "
          }/>
        
    </div>
  );
};

export default MenuHero;
