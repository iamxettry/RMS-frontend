"use client";
import { FaPlus, FaX } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { circle } from "../../../../../../../public/assets";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditItem = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    itemtype: "",
    img: "",
    available: "",
    calorie: "",
  });
  useEffect(() => {
    // Fetch data using a GET request with the provided itemId
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/menu/menuitems/${id}/`,
          { next: { revalidate: 0 } }
        );
        if (response.ok) {
          const data = await response.json();
          // Set the retrieved data as the initial form values
          setData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleFileInputChange = (event) => {
    const { name, files } = event.target;
    setData({
      ...data,
      [name]: files[0], // Store the selected file in the state
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // Append all form data including the file to FormData
      for (const key in data) {
        if (key !== "img") {
          formData.append(key, data[key]);
        }
      }
      const res = await fetch(
        `http://127.0.0.1:8000/api/menu/menu-list/${id}/`,
        {
          method: "PUT",

          body: formData,
        }
      );
      if (res.ok) {
        const newData = await res.json();
        // Handle successful response here
        toast.success(newData.message);
        router.push("/dashboard/admin/menu");
      } else {
        // Handle non-200 responses here
        const newData = await res.json();
        toast.error(res.statusText);
      }
    } catch (error) {
      toast.error("Network Error", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center py-3 px-10 border-b border-gray-700 my-2">
        <div>Edit Item</div>
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
                value={data.name}
                onChange={handleInputChange}
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
                value={data.category}
                onChange={handleInputChange}
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
                value={data.price}
                onChange={handleInputChange}
                className="rounded-md focus:outline-none px-3 bg-transparent  w-full"
                placeholder="Enter product price (unit)"
              />
            </div>
            <div className="flex gap-4 flex-col md:flex-row justify-start items-start md:items-center py-2  border-b border-gray-700">
              <label htmlFor="itemtype">Item type</label>
              <div className="flex gap-2 ">
                <div className="flex gap-2 justify-center items-center">
                  <input
                    type="radio"
                    name="itemtype"
                    value={"VEG"}
                    checked={data.itemtype === "VEG"}
                    onChange={handleInputChange}
                  />{" "}
                  <span>veg</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input type="radio" name="itemtype" value={"NON_VEG"} checked={data.itemtype === "NON_VEG"}
                  onChange={handleInputChange} />{" "}
                  <span>non veg</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input type="radio" name="itemtype" value={"NONE"}  checked={data.itemtype === "NONE"}
                  onChange={handleInputChange} />{" "}
                  <span>none</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row md:justify-start items-start md:items-center py-2 border-b border-gray-700">
              <label htmlFor="img">Upload Image</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                className="file:text-xs text-xs"
                onChange={handleFileInputChange}

              />
            </div>
            <div className="flex gap-4 justify-start items-center  py-2 border-b border-gray-700">
              <label htmlFor="available">Available</label>
              <div className="flex gap-2 justify-center items-center">
                <input type="radio" name="name" value={data.available}
                  checked={data.available}
                  onChange={handleInputChange} />
                <span>yes</span>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <input type="radio" name="name" value={data.available}
                  checked={!data.available}
                  onChange={handleInputChange} />
                <span>no</span>
              </div>
            </div>
            <div className="flex gap-2 justify-between items-center py-2 border-b border-gray-700">
              <label htmlFor="calorie">Calorie</label>
              <input
                type="number"
                name="calorie"
                id="calorie"
                value={data.calorie}
                onChange={handleInputChange}
                className="rounded-md focus:outline-none px-3 bg-transparent  w-full"
                placeholder="Enter Item calorie"
              />
            </div>
            <div className="flex justify-end items-center">
              <div className="mr-20 flex  items-center justify-center gap-3 border-2 rounded-md py-2 px-3 border-orange-500 cursor-pointer">
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

export default EditItem;
