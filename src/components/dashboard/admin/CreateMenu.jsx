import React from "react";
import Image from "next/image";
import { checklist } from "../../../../public/assets";
import { FaPlus } from "react-icons/fa6";
import Btn from "@/utils/Btn";
const CreateMenu = () => {
  return (
    <div className="flex flex-col gap-4 justify-center w-4/5 mx-auto  p-4 rounded-md shadow-md dark:shadow-pink-200  shadow-gray-600">
      <div className=" w-full">
        <Image src={checklist} width={'auto'} height={'auto'} priority className="rounded-md  aspect-auto" alt="Checklist " />
      </div>
      <div className="flex justify-end">
        <div className="flex gap-2 bg-gradient-to-r from-blue-300 to-pink-200 p-1 md:p-3 justify-between items-center rounded-md text-black">
          <FaPlus/>
          <Btn path={"/dashboard/admin/menu/add-item"} title={"Create Menu"} style={"font-serif font-semibold "} />
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
