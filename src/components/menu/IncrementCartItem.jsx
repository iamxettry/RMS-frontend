"use client";
import { setCartCount } from "@/redux/features/CartCountSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const IncrementCartItem = ({ slug }) => {

  const dispatch = useDispatch();
  const router = useRouter();
  const userId = Cookies.get("userId");
  const handleClick = async () => {
    //later add froom cookie
    let verify = Cookies.get("loggedin");
    if (!verify) {
      toast.error("You are not logged in!");
      router.push("/auth/login");
      return;
    }
    try {
      const result = await fetch(`http://127.0.0.1:8000/api/order/cart/`);
      if (result.ok) {
        const data = await result.json();
        const filterDataById=data.result.filter((item)=>item.u_id.id===parseInt(userId))
      
        const filteredData = filterDataById.filter(
          (item) => item.f_id.id === parseInt(slug)
          );

        if (filteredData.length===0 ) {
          const res = await fetch(`http://127.0.0.1:8000/api/order/cart/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: 1, u_id: userId, f_id: slug }),
          });
          if (!res.ok) {
            toast.error(res.statusText);
          }
          if (res.ok) {
            toast.success("Order added to cart-quantity-1");
          }
        }else{
          
          toast.success("Item already added to cart. VIEW on Cart")
        }
      }
     
    } catch (e) {
      toast.error("connection Failed!!");
    }
    const res = await fetch(`http://127.0.0.1:8000/api/order/carts/${userId}/`);
    if (res.ok) {
      const data=await res.json()
      dispatch(setCartCount(data.result.length));
    }

  };
  return (
    <div
      className="flex justify-center md:justify-start  items-center w-8  bg-orange-500 lg:w-10 lg:group-hover:w-[100px] transition-all duration-200 ease-linear  rounded-full    h-8 gap-1 lg:gap-2 lg:bg-transparent absolute right-4 lg:right-1 bottom-7   lg:group-hover:bg-orange-500 overflow-hidden cursor-pointer my-1"

      onClick={handleClick}
    >
      <p className="p-1 xs:p-2 rounded-full group-hover:text-xs  transition-all ease-in-out duration-500  text-white bg-orange-500  text-xs cursor-pointer flex justify-center items-center">
        {" "}
        <FaPlus />
      </p>
      <h1 className="hidden lg:group-hover:flex  pr-1 transition-all text-opacity-0 lg:group-hover:text-opacity-100 duration-700 relative lg:-right-20 lg:group-hover:right-0 ease-in-out text-[10px] cursor-pointer">
        Add to Cart
      </h1>
    </div>
  );
};

export default IncrementCartItem;
