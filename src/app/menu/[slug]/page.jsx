import Link from "next/link";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdExpandLess } from "react-icons/md";
import { hero } from "../../../../public/assets";
import Image from "next/image";
import { BsFire } from "react-icons/bs";
import { FaRegClock, FaStar } from "react-icons/fa";
import IncDec from "@/components/menu/IncDec";
import CartItem from "@/components/menu/CartAddButton";
import ItemInfo from "@/components/menu/ItemInfo";
import MenuItem from "@/components/menu/MenuItem";
import getItem from "@/app/lib/getItem";
import getMenu from "@/app/lib/getMenu";
const page = async ({params}) => {
  const { slug } = params;

  const data=await getItem(slug)
  const newData=await getMenu(4,data.category)
  return (
    <>
      <div className="h-[430px] md:hidden"></div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div
          id="add-to-cart"
          className="absolute md:relative top-14 left-0  md:top-0 bg-gradient-to-r from-blue-300 to-pink-100  dark:from-black dark:to-black z-20 transition-all duration-500  ease-linear "
        >
          {/* nav icons */}
          <div className="flex justify-between items-center py-2 px-4 text-3xl">
            <Link href={"/menu"}>
              <MdExpandLess className="-rotate-90 " />
            </Link>
            <BiDotsVerticalRounded className="" />
          </div>
          {/* Top section */}
          <div className="flex flex-col md:flex-row ">
            {/* middle Image and increment decrement */}
            <div>
              {/* image section */}
              <div className="flex justify-center items-center">
                <Image src={data.img} width={350} height={350} alt="img" priority />
              </div>
              {/* Increment Decrement */}
              <div className="flex flex-col items-center gap-3 z-20 relative mt-2 ">
                <p className="flex gap-2 items-center justify-center my-2 ">
                  <span className="h-2 w-2 bg-black rounded-full opacity-50  dark:bg-white"></span>
                  <span className="h-2 w-8 bg-black rounded-full opacity-75 dark:opacity-80 dark:bg-white"></span>
                  <span className="h-2 w-2 bg-black rounded-full opacity-50 dark:bg-white"></span>
                </p>
                <IncDec data={data} />
              </div>
            </div>
            {/* Detail :Right section */}
            <div className="flex-1 flex flex-col justify-between items-center">
              <div className=" flex-1 flex flex-col gap-2   justify-start items-center">
                {/* Title */}
                <div className="flex justify-between w-full items-center py-2 px-4 text-3xl dark:text-white">
                  <h1 className="md:text-2xl capitalize">
                    <b>{data.name}</b>
                  </h1>
                  <p className="flex gap-2 items-center justify-center text-2xl">
                    <i className="text-orange-500">
                      <FaStar />
                    </i>
                    <span className="text-xl">
                      <b>4.5</b>
                    </span>
                  </p>
                </div>
                {/* description */}
                <div className="relative py-2 ">
                  <ItemInfo />
                </div>
                <div className="flex w-full justify-between px-6 items-center my-2">
                  <p className="flex gap-4 justify-start items-center">
                    <i className="text-orange-500">
                      <BsFire />
                    </i>
                    <span className="font-bold">{data.calorie} Cal</span>
                  </p>
                  <p className="flex gap-4 justify-start items-center">
                    <i className="text-orange-500">
                      <FaRegClock />
                    </i>
                    <span className="font-bold">8-10 Min</span>
                  </p>
                </div>
              </div>
              {/* Bottom Add To Cart section */}

              <div className="flex w-full justify-end px-4 items-center">
                <CartItem slug={slug} />
              </div>
            </div>
          </div>
        </div>
        <div className="basis-2/3 lg:border-l grid grid-cols-2  md:grid-cols-3 lg:flex lg:flex-col gap-3 ">
        <MenuItem  category={newData} />
        
        </div>
      </div>
    </>
  );
};

export default page;
