import DashNav from "@/components/dashboard/admin/DashNav";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <div className="relative flex -left-5 xs:-left-9 md:-left-14 lg:-left-28 min-h-screen  w-[100vw] lg:w-[97vw]">
        <div className="  h-screen  transition-all duration-500 ease-in-out">
          <DashNav />
        </div>
        <div className="flex-1 ">{children}</div>
      </div>
    </>
  );
};

export default layout;
