"use client";
import CreateMenu from "@/components/dashboard/admin/CreateMenu";
import Btn from "@/utils/Btn";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaX } from "react-icons/fa6";
import Link from 'next/link'
import {toast} from 'react-toastify'
const AdminMenu = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/menu/menu-list/");
        if (res.ok) {
          const data = await res.json();
          setData(data);
        }
      } catch (e) {
        toast.error("Data not found!")
      }
    };
    fetchData();
  }, [deleted]);
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/menu/menu-item/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Data Deleted Successfully!");
        setDeleted(!deleted)
        setData((prevOrderData) =>
          prevOrderData.result.filter((item) => item.id !== id)
        );
      } else {
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
          toast.error(data.meassge)
        }
      }
    } catch (error) {
      toast.error("An error occurred while making the request.");
    }};
  return (
    <div className="min-h-screen">
      {data?.length === 0 ? (
        <CreateMenu />
      ) : (
        <div>
          <div className="flex justify-end">
            <div className="flex gap-2 bg-gradient-to-r from-blue-300 to-pink-200 p-1 md:p-3 justify-between items-center rounded-md text-black">
              <FaPlus />
              <Btn
                path={"/dashboard/admin/menu/add-item"}
                title={"Add Item"}
                style={"font-serif font-semibold "}
              />
            </div>
          </div>
          <div
            className="transition-all duration-500 ease-linear relative rounded-xl border border-slate-500 p-2 my-4"
            id="order"
          >
            <table className=" w-full ">
              <thead className="text-xs text-gray-700 uppercase border-b border-b-slate-500 dark:text-gray-400 w-fit">
                <tr className="">
                  <th
                    scope="col"
                    className="text-[10px] xs:text-[12px] px-1 md:px-6 py-3"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-[10px] xs:text-[12px] px-1 md:px-6 py-3"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-[10px] xs:text-[12px] px-1 md:px-6 py-3"
                  >
                     Price
                  </th>

                  <th scope="col" className="">
                    <span className="sr-only md:relative">Edit</span>
                  </th>
                  <th scope="col" className=" ">
                    <span className="sr-only md:relative">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-fit">
                {data?.result?.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center capitalize">
                      {item.name}
                    </td>
                    <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center capitalize">
                      {item.category}
                    </td>
                    <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center">
                      {item.price}
                    </td>

                    <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center ">
                      <Link
                        href={`/dashboard/admin/menu/edit-item/${item.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <FaEdit
                          // title="Edit"
                          // className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                          // onClick={() => handleEdit(item.id)}
                        />
                      </Link>
                    </td>
                    <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 md:text-center text-right ">
                      <FaX
                        title="Delete"
                        className="font-medium text-red-600 dark:text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
