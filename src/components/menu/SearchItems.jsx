"use client";
import { setSearchTerm } from "@/redux/features/searchTerm";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiAdjustments } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
const SearchItems = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex bg-black bg-opacity-10 items-center rounded-full px-4 gap-2 dark:bg-black dark:bg-opacity-50 border dark:border-2 border-slate-500 w-auto">
      <FaSearch className=" text-xl text-gray-700 dark:text-white dark:text-opacity-70" />
      <input
        type="text"
        id="search"
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search your favourite food"
        className="w-full outline-none  placeholder:text-slate-500 focus:outline-none bg-transparent py-2   dark:border-none "
      />
      <HiAdjustments className="text-xl dark:text-white dark:text-opacity-70" />
    </div>
  );
};

export default SearchItems;
