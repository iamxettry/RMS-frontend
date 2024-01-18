import React from "react";
import Image from "next/image";
import { hero } from "../../public/assets";
import DahsedLine from "./DahsedLine";
import Button from "./Button";
import Backlight from "./Backlight";
const Hero = () => {
  return (
    <div className="relative w-full md:mt-10">
      <div className="my-4 flex flex-col-reverse items-center  md:flex-row ">
        {/* Hero Left */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 relative">
          <h1 className="text-4xl md:text-6xl font-bold my-4 md:my-5 text-black/80 dark:text-white/80">
            it&apos;s not just Food,It&apos;s an Experience.
          </h1>
          <div className="w-full flex justify-start items-center">
            <Button path={"/menu"} title={"View Menu"} hideplus={"hidden"} />
          </div>
          <DahsedLine  style="w-40 border-black  border-dashed border-b dark:border-white absolute top-0 -left-10" />
          <DahsedLine  style="h-40 border-black  border-dashed border-l dark:border-white absolute -left-2 -top-10" />
          <DahsedLine  style="w-40 border-black  border-dashed border-b dark:border-white absolute bottom-12 right-10" />
          <DahsedLine  style="w-40 border-black  border-dashed border-b dark:border-white absolute right-1 bottom-16 rotate-90" />
        </div>
        {/* Hero Right Image section */}
        <div className="flex-1  flex justify-center items-center relative">
          <Image
            src={hero}
            alt="Hero Image"
            priority
            className="rounded-full"
          />
           <DahsedLine  style="w-40 border-black  border-dashed border-b dark:border-white absolute bottom-0 -right-6" />
          <DahsedLine  style="h-40 border-black  border-dashed border-r dark:border-white absolute right-4 -bottom-10 " />
        <Backlight  style={"w-44 lg:w-60 h-44 lg:h-60 bg-gradient-to-r from-white to-pink-400 -z-10 md:blur-[100px] blur-[400px] rounded-full "}/>

        </div>
      </div>
    </div>
  );
};

export default Hero;
