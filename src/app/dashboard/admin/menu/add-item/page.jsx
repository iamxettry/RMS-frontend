"use client";
import { FaPlus, FaX } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { circle } from "../../../../../../public/assets";
const AddItem = () => {
    const router = useRouter();
  const handleSumbit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/menu/menu-list/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        // Handle successful response here
        toast.success(data.message);
        router.push("/dashboard/admin/menu");
      } else {
        // Handle non-200 responses here
        toast.error(res.statusText);
        toast.error("Check the fields!");
      }
    } catch (error) {
      toast.error("Network Error", error);
    }
  };
  return (
    <div>
      <div className="flex justify-end py-3 pr-10">
        <Link href={"/dashboard/admin/menu"}>
          <FaX className="w-8 h-8 rounded-full  dark:bg-gray-800 shadow cursor-pointer shadow-slate-400 p-2" />
        </Link>
      </div>
      <div className="flex-1 flex">
        <div className=" md:w-11/12 mx-auto  shadow-md shadow-slate-600 dark:shadow-slate-200 rounded-md py-4">
          <form
            action=""
            className="w-11/12 mx-auto flex flex-col gap-4"
            encType="multipart/form-data"
            onSubmit={handleSumbit}

          >
            <div className="flex gap-4 flex-col md:flex-row items-start md:items-center py-2 border-b border-gray-700">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="rounded-md focus:outline-none px-3 bg-transparent  w-full"
                placeholder="Enter Item Name"
              />
            </div>
            <div className="flex gap-4 flex-col md:flex-row items-start md:items-center py-2 border-b border-gray-700">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                className="rounded-md focus:outline-none px-3 bg-transparent  w-full"
                placeholder="Enter Item Category"
              />
            </div>
            <div className="flex gap-4 flex-col md:flex-row items-start md:items-center py-2 border-b border-gray-700">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                className="rounded-md focus:outline-none px-3 bg-transparent  w-full"
                placeholder="Enter product price (unit)"
              />
            </div>
            <div className="flex gap-4 flex-col md:flex-row justify-start items-start md:items-center py-2  border-b border-gray-700">
              <label htmlFor="itemtype">Item type</label>
              <div className="flex gap-2 ">
                <div className="flex gap-2 justify-center items-center">
                  <input type="radio" name="itemtype" value={"VEG"} />{" "}
                  <span>veg</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input type="radio" name="itemtype" value={"NON_VEG"} />{" "}
                  <span>non veg</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input type="radio" name="itemtype" value={"NONE"} />{" "}
                  <span>none</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row md:justify-start items-start md:items-center py-2 border-b border-gray-700">
              <label htmlFor="img">Upload Image</label>
              <input type="file" name="img" accept="image/*" className="file:text-xs text-xs" />
            </div>
            <div className="flex gap-4 justify-start items-center  py-2 border-b border-gray-700">
              <label htmlFor="available">Available</label>
                <div className="flex gap-2 justify-center items-center">
                  <input type="radio" name="available" value={true} />
                  <span>yes</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input type="radio" name="avilable" value={false} />
                  <span>no</span>
                </div>
            </div>
            <div className="flex gap-2 justify-between items-center py-2 border-b border-gray-700">
              <label htmlFor="calorie">Calorie</label>
              <input
                type="number"
                name="calorie"
                id="calorie"
                className="rounded-md focus:outline-none px-3 bg-transparent  w-full"
                placeholder="Enter Item calorie"
              />
            </div>
            <div className="flex justify-end items-center">
              <div className="mr-20 flex  items-center justify-center gap-3 border-2 rounded-md py-2 px-3 border-orange-500">
                <FaPlus />
                <input type="submit" value={"Add item"} />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden lg:flex">
        <Image src={circle} priority className="w-auto h-auto" alt="circle" />
      </div>
    </div>
  );
};

export default AddItem;
