import DashNav from "@/components/dashboard/admin/DashNav";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <div className="">
        <div className=" absolute left-0 z-10 bg-blue-300 dark:bg-black transition-all duration-500 ease-in-out">
          <DashNav />
        </div>
        <div className="lg:pl-12 pl-10 md:pl-4 ">{children}</div>
      </div>
    </>
  );
};

export default layout;
