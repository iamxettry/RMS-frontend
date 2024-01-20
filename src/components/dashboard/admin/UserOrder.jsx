"use client";

import { useEffect, useState } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";
const UserOrder = ({ userid }) => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/order/not-completed-orders/${parseInt(
            userid
          )}/`
        );
        if (!res.ok) {
          toast.error(res.statusText);
        } else {
          const data = await res.json();
          setOrder(data.result);
        }
      } catch (e) {
        toast.error("Network Error!");
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = async (itemId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/order/orders/${itemId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }), // Set completed to true
        }
      );
      if (!res.ok) {
        toast.error(res.statusText);
      } else {
        const data = await res.json();
        toast.success(data.message);
        const updateOrder = order.filter((item) =>
          item.id !== itemId
        );
        setOrder(updateOrder);
      }
    } catch (e) {
      toast.error("Network Error!");
    }
  };

  const handleSetAllTrue = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/order/orders/user/${userid}/`,{
            method:"PUT"
        }
      );

      if (!res.ok) {
        toast.error(res.statusText);
      } else {
        const data = await res.json();
        toast.success(data.message);
        setOrder([])
      }
    } catch (e) {
      toast.error("Network Error!");
    }
  };
  return (
    <>
      {order.length === 0 ? (
        <div>Empty! no active order</div>
      ) : (
        <div className="relative shadow-md sm:rounded-lg dark:shadow-white/30 p-2">
          <table className="w-full class rounded-md">
            <thead className="bg-gray-700/20 ">
              <tr className="uppercase text-[10px] md:text-sm border-b border-gray-700 ">
                <th scope="col" className="py-3">
                  Items
                </th>
                <th scope="col" className="py-3">
                  Quantity
                </th>
                <th scope="col" className="py-3">
                  Completed
                </th>
                <th scope="col" className="py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.map((item) => {
                const { id, completed, quantity } = item;
                const { name } = item.menu_item;
                return (
                  <tr
                    key={id}
                    className="text-center text-sm border-b border-gray-600 hover:bg-gray-500/20 "
                  >
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td className="text-xs py-2">
                      <span className="w-full h-full flex justify-center items-center">
                        {completed ? (
                          <ImCheckmark className="text-green-500" />
                        ) : (
                          <ImCross className="text-red-600" />
                        )}
                      </span>
                    </td>
                    <td>
                      {completed ? null : (
                        <>
                          <input
                            type="checkbox"
                            name={`completed`}
                            id={`completed-${id}`}
                            checked={completed}
                            onChange={() => handleCheckboxChange(id)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="my-2 w-full flex justify-end items-center pr-5">
            <button className="py-3 underline" onClick={handleSetAllTrue}>
              Checked All
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrder;
