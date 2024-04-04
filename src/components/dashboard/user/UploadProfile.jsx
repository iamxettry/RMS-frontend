"use client";
import { setProfile } from "@/redux/features/profileImageSlice";
import {
  useUploadProfileMutation,
} from "@/redux/services/users/userApi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UploadProfile = () => {
  const [file, setFile] = useState('');
  const [uploadProfile] = useUploadProfileMutation();
  const dispatch=useDispatch()
  const accessToken = Cookies.get("access_token");
  const userId = Cookies.get("userId");


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("select the profile");
      return;
    }
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const res = await uploadProfile({ file, accessToken });
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.errors.detail);
      } else {
        toast.success(res.data.message);
        setFile('')
        const result=await fetch(`http://127.0.0.1:8000/api/users/profile-picture/${userId}/`)
        if (!result.ok) {
          toast.error(result.statusText)
          return;
        }
        const data=await result.json()
        dispatch(setProfile(data?.profile_picture))
      }
    } catch (error) {
      toast.error("Connection Falied!");
    }
  };

  // function to delete profile_picture
  const handleClick= async ()=>{

    try {
      const res= await fetch(`http://127.0.0.1:8000/api/users/profile-picture/${userId}/`,{
        method:"DELETE"
      })
      if (res.ok) {
        toast.success('Profile deleted successfully');
        dispatch(setProfile(''))

      }
      // toast.success(result.message)
      
    } catch (error) {
      console.log(error);
      toast.error('Network Error!')
      
    }    
  }

  return (
    <div className="flex flex-col gap-4 p-2 dark:from-gray-600/20 bg-gradient-to-r  from-pink-200 shadow-lg to-blue-300 rounded-md">
      <h2 className="border-b border-gray-700 p-2">Edit your profile</h2>
      <form
        action=""
        className="flex items-center space-x-6"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="profilepic">
          <input
            type="file"
            id="profilepic"
            name="profileoic"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                    file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
          />
        </label>

        <input
          type="submit"
          value="Upload"
          className=" px-3 py-1 rounded-md bg-gradient-to-r from-orange-200 to-pink-50 dark:from-blue-300 dark:to-pink-100  font-semibold text-sm cursor-pointer dark:text-black"
        />
      </form>
      <div className="flex justify-end items-center">
        <button className="underline text-sm text-purple-600" onClick={handleClick} >Remove profile picture</button>
      </div>
    </div>
  );
};

export default UploadProfile;
