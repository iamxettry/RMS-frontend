"use client";

import { selectSearchValue } from "@/redux/features/searchTerm";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getCategoryList from "@/app/lib/getCategory";

const MenuList = () => {
  const [category, setCategory] = useState([]);

  const searchTerm = useSelector(selectSearchValue);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoryList();
      if (searchTerm) {
        const filterData= data.result.map((categoryItem)=>({
          ...categoryItem,
          data:categoryItem.data.filter((item)=>item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }))
        setCategory(filterData)
      }else{

        setCategory(data.result);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="">
      {/* map */}
      {category?.map((items) => (
        <div id={items.category} key={items.category}>
          {/* check searchTerm is yes display none */}
          {searchTerm ? (
            <></>
          ) : (
            <div className="px-4 w-full py-1 border-b border-gray-700">
              <h1 className="font-bold capitalize text-2xl text-black/70 dark:text-white/80">
                {items.category}
              </h1>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 rounded-lg md:grid-cols-3 lg:grid-cols-4 my-3">
            {/* items maps --  */}

                <MenuItem  category={items.data}  />
           
          
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
