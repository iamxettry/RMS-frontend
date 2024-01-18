import React from "react";
import AuthNav from "@/utils/AuthNav";
import Image from "next/image";
import { auth,circle, wings,checklist,dear } from "../../../../public/assets";

const layout = ({ children }) => {

   
  return (
    <>
      <div className="my-5 relative z-0">
        <AuthNav/>
        <div className="flex gap-3 mt-3 p-1 ">
          <section className="flex-1">{children} </section>
          <section className="flex-1 hidden md:flex">
          <Image
              src={wings}
              alt="Picture of the author"
              priority
              className="rounded-3xl dark:opacity-80"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default layout;
