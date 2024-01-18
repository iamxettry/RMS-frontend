"use client";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import EditOrder from "./EditOrder";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setCartCount } from "@/redux/features/CartCountSlice";
import {useDispatch} from 'react-redux'
import { setGrandTotal } from "@/redux/features/grandTotal";
const ItemRow = () => {
  const [editItem, setEditItem] = useState(false);
  const [foodId, setFoodId] = useState(0);
  const [orderData, setOrderData] = useState([]);


  const userId = Cookies.get("userId");
  const dispatch=useDispatch()
  // fetch order Data
  useEffect(() => {
    let fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/order/cart/");

      if (res.ok) {
        const data = await res.json();

        const filteredData = data.result.filter(
          (item) => item.u_id.id === parseInt(userId)
        );
        setOrderData(filteredData);

        const grandTotal = filteredData.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
        dispatch(setGrandTotal(grandTotal))
      }
      if (!res.ok) {
        toast.error(res.statusText);
      }
    };
    fetchData();
  }, [userId, editItem]);

  // Edit order function
  const handleEdit = (id) => {
    setFoodId(id);
    setEditItem(!editItem);
  };
  // Delete order function
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/order/cart/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Item remove from cart!!");
        
        // Remove the deleted item from the orderData state
        setOrderData((prevOrderData) =>
          prevOrderData.filter((item) => item.id !== id)
        );
      
      }
    } catch (error) {
      toast.error("Connection Failed!")
    }
    const result = await fetch(`http://127.0.0.1:8000/api/order/carts/${userId}/`);
      if (result.ok) {
        const data = await result.json();
        const filteredData = data.result.filter(
          (item) => item.u_id.id === parseInt(userId)
        );

        const grandTotal = filteredData.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
        dispatch(setGrandTotal(grandTotal))
        dispatch(setCartCount(data.result.length));
        
      }
  };
  return (
    <>
      {orderData.length === 0 ? (
        <tr>
          <td colSpan={3} className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center capitalize">No Data in the cart. Select item to order</td>
        </tr>
      ) : (
        orderData.map((item) => (
          <tr className="border-b border-b-slate-500" key={item.id}>
            <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center capitalize">
              {item.f_id.name}
            </td>
            {!editItem || foodId !== item.id ? (
              <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center">
                {item.quantity}
              </td>
            ) : (
              <EditOrder
                itemId={item.id}
                slug={item.f_id.id}
                quantity={item.quantity}
                setEditItem={setEditItem}
              />
            )}
            <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center">
              {item.totalPrice}
            </td>
            <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 text-center">
              <FaEdit
                title="Edit"
                className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                onClick={() => handleEdit(item.id)}
              />
            </td>
            <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 md:text-center text-right ">
              <FaX
                title="Delete"
                className="font-medium text-red-600 dark:text-red-500 cursor-pointer"
                onClick={() => handleDelete(item.id)}
              />
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default ItemRow;
