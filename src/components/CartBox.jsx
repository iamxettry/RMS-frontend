"use client";
import { selectCartCount, setCartCount } from "@/redux/features/CartCountSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CartBox = () => {
  const cartCount = useSelector(selectCartCount);
  const router = useRouter();
  const dispatch = useDispatch();
  const userId= Cookies.get("userId")
  let verify = Cookies.get("loggedin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://127.0.0.1:8000/api/order/carts/${userId}/`);
        if (result.ok) {
          const data = await result.json();
          dispatch(setCartCount(data.result.length));
        }
      } catch (e) {
        toast.error("Fetch error!");
      }
    };
    fetchData()
  },[verify]);
  const handleClick = () => {
    let userId=Cookies.get("userId")
    if (!verify) {
      router.push("/auth/login");
      return;
    }
    if(cartCount===0){
      router.push(`/menu`)
    }else{

      router.push(`/menu/${userId}/order#order`)
    }
  };
  return (
    <div className="relative p-2 cursor-pointer" onClick={handleClick}>
      <BsCart4 className="text-xl text-black/80 dark:text-white" />
      <span
        className={`rounded-full bg-red-500 absolute right-0 top-0 w-4 h-4 text-white   justify-center items-center font-semibold ${
          cartCount == 0 ? "hidden" : "flex"
        } `}
      >
        {cartCount <= 9 ? (
          cartCount
        ) : (
          <p className="text-sm">
            9<sup className="font-bold">+</sup>
          </p>
        )}
      </span>
    </div>
  );
};

export default CartBox;
