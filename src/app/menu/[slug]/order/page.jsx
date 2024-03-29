"use client";
import Button from "@/components/Button";
import ItemRow from "@/components/order/ItemRow";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { selectGrandTotal } from "@/redux/features/grandTotal";
import { setCartCount } from "@/redux/features/CartCountSlice";
const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const dispatch = useDispatch();

  const userId=Cookies.get("userId")
  const GrandTotal = useSelector(selectGrandTotal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/order/cart/`);
        if (res.ok) {
          const data = await res.json();
          const filteredData = data.result.filter(
            (item) => item.u_id.id === parseInt(userId)
          );
          setOrderData(filteredData);
          
        }
      } catch (error) {
        toast.error("connection Failed!!");
      }
    };
    fetchData();
  }, []);
  const handleSubmit= async ()=>{
    try {
      const simplifiedData = orderData.map((item) => ({
        quantity: item.quantity,
        account: item.u_id.id,
        menu_item: item.f_id.id,
      }));
      const res = await fetch(`http://127.0.0.1:8000/api/order/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(simplifiedData),
      });
      if (!res.ok) {
        toast.error(res.statusText)
      }
      if (res.ok) {
        const data = await res.json();
        toast.success(data.msg);
        // Clear the cart after successfully placing the order
        await fetch(
          `http://127.0.0.1:8000/api/order/carts/${userId}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        
      } else {
        const data = await res.json();
        console.log(data);
      }
     
    } catch (e) {
      toast.error("connection Failed!!");
    }
    const result = await fetch(`http://127.0.0.1:8000/api/order/carts/${userId}/`);
    if (result.ok) {
      const data=await result.json()
      dispatch(setCartCount(data.result.length));
    }
  }
  return (
    <>
      <div
        className="transition-all duration-500 ease-linear relative rounded-xl border border-slate-500 p-2 my-4"
        id="order"
      >
        <table className=" w-full ">
          <thead className="text-xs text-gray-700 uppercase border-b border-b-slate-500 dark:text-gray-400 w-fit">
            <tr>
              <th
                scope="col"
                className="text-[10px] xs:text-[12px] px-1 md:px-6 py-3"
              >
                Food Name
              </th>
              <th
                scope="col"
                className="text-[10px] xs:text-[12px] px-1 md:px-6 py-3"
              >
                quantity
              </th>
              <th
                scope="col"
                className="text-[10px] xs:text-[12px] px-1 md:px-6 py-3"
              >
                Total price
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
            <ItemRow />
          </tbody>
        </table>
      </div>
      <div className="flex justify-between flex-col gap-3 md:flex-row   items-start md:items-center py-4  md:flex-1">
        <h1 className="py-2 border-b border-b-slate-500 font-bold text-xl">
          Grand Total : Rs <span>{GrandTotal}</span>
        </h1>
        <div className="w-full md:w-auto flex justify-end ">
          {GrandTotal === 0 ? (
            <p>Select the item to order</p>
          ) : (
            <button onClick={handleSubmit}>
              <Button
                path={`/dashboard/user/myorder`}
                title={"Order Now"}
                style={"flex"}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
