"use client"

import getNotCompletedOrder from "@/app/lib/getNotcompletedOrder";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const OrderItem = () => {
    const [order, setOrder] = useState([]);
    const userId = Cookies.get('userId');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const orderData = await getNotCompletedOrder(parseInt(userId));
          setOrder(orderData.result);
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      };
  
      fetchData();
    }, [userId]);
  
  return (
    <>
    {order?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                
                  <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3 capitalize">{item.menu_item.name}</td>
                  <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3">{item.quantity}</td>
                  <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3">{item.totalPrice}</td>
                  <td className="text-[10px] px-2 xs:text-[14px] md:px-6 py-3">
                    {
                      item?.completed?"yes":"no"
                    }
                  </td>
                  {/* <td className="px-6 py-4">{item.grand_total}</td> */}
                  
                </tr>
              ))}
    </>
  )
}

export default OrderItem