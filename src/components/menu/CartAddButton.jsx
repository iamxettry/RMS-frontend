"use client";
import { setCartCount } from "@/redux/features/CartCountSlice";
import { selectCount } from "@/redux/features/productCount";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiShoppingBag } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CartItem = ({ slug }) => {
  let count = useSelector(selectCount);
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const router = useRouter();
  const hadlesubmit = async () => {
    let verify = Cookies.get("loggedin");
    if (!verify) {
      router.push("/auth/login");
    } else {
      try {
        const result = await fetch(`http://127.0.0.1:8000/api/order/cart/`);
        if (result.ok) {
          const data = await result.json();
          const filterDataById=data.result.filter((item)=>item.u_id.id===parseInt(userId))
      
        const filteredData = filterDataById.filter(
          (item) => item.f_id.id === parseInt(slug)
          );

          if (filteredData.length === 0) {
            const res = await fetch(`http://127.0.0.1:8000/api/order/cart/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                quantity: count,
                u_id: userId,
                f_id: slug,
              }),
            });
            if (!res.ok) {
              toast.error(res.statusText);
            }
            if (res.ok) {
              toast.success("Order added to cart 😊");
            }
          } else {
            const result = await fetch(
              `http://127.0.0.1:8000/api/order/cart/${filteredData[0].id}/`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  quantity: count,
                  u_id: userId,
                  f_id: slug,
                }),
              }
            );
            if (result.ok) {
              const data = await result.json();
              toast.success(data.message);
            }
            if (!result.ok) {
              toast.error(result.statusText);
            }
          }
        }
        if (!result.ok) {
          console.log(result.statusText);
        }
      } catch (e) {
        toast.error("connection Failed!");
      }

      const res = await fetch(`http://127.0.0.1:8000/api/order/carts/${userId}/`);
      if (res.ok) {
        const data=await res.json()
        dispatch(setCartCount(data.result.length));
      }
    }
  };
  return (
    <>
      <div className="flex justify-end items-center  " onClick={hadlesubmit}>
        <Link
          href={`/menu/user-item-${slug}/order`}
          className="bg-orange-500 py-2 px-2 gap-2 h-full rounded-2xl flex justify-around items-center text-white font-bold"
        >
          <i className="text-xl sm:text-4xl">
            <BiShoppingBag />
          </i>
          <button className="texbase md:text-xl">Add To Cart</button>
        </Link>
      </div>
    </>
  );
};

export default CartItem;
