
import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";
import getVegNonVeg from "@/app/lib/getMenuList";
import MenuItem from "@/components/menu/MenuItem";
const MenuList = async () => {
  const data = await getVegNonVeg('veg');

  return (
    <>
   
      {/* menu list */}

     

      <div className="my-3">
        <div className="md:px-4 w-full py-1 bg-inherit dark:bg-black/70 border border-gray-500 rounded-md flex md:justify-between  md:items-center my-3 flex-col md:flex-row items-start">
          <Link
            href={"/menu"}
            className="flex gap-2 items-center py-2 my-2 cursor-pointer"
          >
            <ImArrowLeft2 />
            <h1 className="font-bold ">Back</h1>
          </Link>
         <div className="flex xs:text-lg flex-1 flex-row text-xs gap-3 justify-around items-center pl-2">
         <h1 className="font-bold text-orange-500">Veg Menu </h1>
          <Link
            href={"/menu/non-veg"}
            className="hover:text-orange-500 font-bold"
          >
            Non-Veg Menu 
          </Link>
          <Link
            href={"/menu/all-items"}
            className="hover:text-orange-500 font-bold"
          >
            View All Menu
          </Link>
         </div>
        </div>
        <div className="grid grid-cols-2 rounded-lg md:grid-cols-3 lg:grid-cols-4">
          {/* map the items */}
          {
        data?<>
        <MenuItem category={data.result} />
        </>:"no data"
      }
         
        </div>
      </div>
    </>
  );
};

export default MenuList;
