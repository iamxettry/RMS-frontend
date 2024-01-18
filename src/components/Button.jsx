import Btn from "@/utils/Btn";
import React from "react";
import { FaPlus } from "react-icons/fa";

const Button = ({path,title,hideplus, style}) => {
  return (
    <div className={`${style} relative inline-flex rounded-lg bg-gradient-to-br from-orange-500 to-pink-500  p-0.5`}>
      <span className="bg-pink-100 dark:bg-black rounded-md relative px-4 py-2 hover:bg-opacity-0 hover:text-white flex gap-2 justify-center items-center">
        <FaPlus className={hideplus}  />
        <Btn
          path={path}
          title={title}
          style={"font-serif font-semibold "}
        />
      </span>
    </div>
  );
};

export default Button;
