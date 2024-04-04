"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { ImCheckmark, ImCross } from "react-icons/im";
import Cookies from "js-cookie";
const Orders = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/order/orders/`);
        if (!res.ok) {
          toast.error(res.statusText);
        }
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (e) {
        toast.error(e);
      }
    };
    fetchData();
  }, []);
  // Group orders by user
  const ordersByUser = {};
  if (order.length !== 0) {
    order?.forEach((order) => {
      const userId = order.account.id;
      if (!ordersByUser[userId]) {
        ordersByUser[userId] = [];
      }
      ordersByUser[userId].push(order);
    });
  }

  // Function to split date and time
  const splitDateAndTime = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split("T");
    return { datePart, timePart };
  };
  const extractHourMinute = (timePart) => {
    const [hour, minute] = timePart.split(":").slice(0, 2); // Take only hour and minute
    return `${hour}:${minute}`;
  };

  return (
    <>
      <main>
        {order?.length !== 0 ? (
          <>
            <div className="relative shadow-md sm:rounded-lg dark:shadow-white/30 p-2">
              <table className="w-full class rounded-md">
                <thead className="bg-gray-700/20 ">
                  <tr className="uppercase text-[10px] md:text-sm border-b border-gray-700 ">
                    <th scope="col" className="py-3">
                      User
                    </th>
                    <th scope="col" className="py-3">
                      Order_date
                    </th>
                    <th scope="col" className="py-3">
                      Completed
                    </th>
                    <th scope="col" className="py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(ordersByUser).map((userId) =>
                    ordersByUser[userId].map((order, index) => {
                      return (
                        <tr
                          key={order.id}
                          className="text-center border-b border-gray-600 hover:bg-gray-500/20"
                        >
                          {index === 0 ? (
                            <>
                              <td className="py-3 ">
                                <Link
                                  href={`/dashboard/admin/orders/${order.account.id}`}
                                  className="underline hover:text-blue-800 font-bold "
                                >
                                  {order.account.username}
                                </Link>
                              </td>
                              <td className="text-xs ">
                                {" "}
                                <p className="md:flex gap-2 justify-center items-center">
                                  <span>
                                    {" "}
                                    {
                                      splitDateAndTime(order.order_date)
                                        .datePart
                                    }
                                  </span>
                                  <span className="hidden md:flex">
                                    {extractHourMinute(
                                      splitDateAndTime(order.order_date)
                                        .timePart
                                    )}
                                  </span>
                                </p>
                              </td>
                              <td className="">
                                <span className="w-full h-full flex justify-center items-center text-sm">
                                  {ordersByUser[userId].every(
                                    (order) => order.complete
                                  ) ? (
                                    <ImCheckmark className="text-green-500" />
                                  ) : (
                                    <ImCross className="text-red-600" />
                                  )}
                                </span>
                              </td>
                              <td>
                                <Link
                                  href={`/dashboard/admin/orders/${order.account.id}`}
                                  className="underline hover:text-blue-800 font-bold"
                                  onClick={() =>
                                    Cookies.set(
                                      "username",
                                      order.account.username
                                    )
                                  }
                                >
                                  view
                                </Link>
                              </td>
                            </>
                          ) : null}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <p>No order list</p>
          </>
        )}
      </main>
    </>
  );
};

export default Orders;
