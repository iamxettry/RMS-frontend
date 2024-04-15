"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { khalti } from "../../public/assets";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

const PaymentWithKhalti = ({price, uuid}) => {
  const router= useRouter()
  const [orderData, setOrderData] = useState([]);
  const userId = Cookies.get("userId");
    const amountInPaisa = Number(price) * 100;



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
    const handleSubmit = async () => {

      try {
        const simplifiedData = orderData.map((item) => ({
          quantity: item.quantity,
          account: item.u_id.id,
          menu_item: item.f_id.id,
          order_id: uuid,
        }));
        const res = await fetch(`http://127.0.0.1:8000/api/order/orders/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(simplifiedData),
        });
        if (!res.ok) {
          toast.error(res.statusText);
        }
        if (res.ok) {
          const data = await res.json();
          // toast.success(data.msg);
          // Clear the cart after successfully placing the order
          await fetch(`http://127.0.0.1:8000/api/order/carts/${userId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          const data = await res.json();
          console.log(data);
        }
      } catch (e) {
        toast.error("connection Failed!!");
      }
      const result = await fetch(
        `http://127.0.0.1:8000/api/order/carts/${userId}/`
      );
      if (result.ok) {
        const data = await result.json();
        dispatch(setCartCount(data.result.length));
      }
    };
  const handlePayment = async (e) => {
    e.preventDefault()
    const simplifiedData = {
      purchase_order_id: uuid,
      amount: amountInPaisa,
      return_url: "http://127.0.0.1:8000/api/payment/verify/",
    };
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/payment/initiate/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(simplifiedData),
          });
          if(res.ok){
              const data = await res.json();
              handleSubmit()
              router.push(data.payment_url)

          }
       

    } catch (e) {
        toast.error("connection Failed!!");
    }
  };
  return (
    <div>
      <form className="flex justify-center items-center gap-4 border-2 border-black p-2 rounded-md cursor-pointer" onSubmit={handlePayment}>
        <button type="submit" className="flex justify-center items-center gap-2">
        <Image src={khalti} height={52} width={52} alt="khalti logo" />
          <span className="font-serif text-gray-800">Pay with Khalti</span>
        </button>
      </form>
    </div>
  );
};

export default PaymentWithKhalti;
