"use client";

import { useState } from "react";

const ItemInfo = () => {
  const [readmore, setReadmore] = useState(false);
  return (
    <>
      <p
        className={`px-6 text-black text-opacity-60 transition-all duration-500 ease-in-out  dark:text-white ${
          readmore ? "line-clamp-6 md:line-clamp-none" : "line-clamp-2 md:line-clamp-4"
        } `}
      >
        Fresh seafood salad with lettuce green mix,chhery tomatoes,herbs and
        alive oil,lemon dressing food Fresh seafood salad with lettuce green
        mix,chhery tomatoes,herbs and alive oil,lemon dressing food
        alive oil,lemon dressing food Fresh seafood salad with lettuce green
        mix,chhery tomatoes,herbs and alive oil,lemon dressing food
      </p>
      <div className="w-4/5 mx-auto flex justify-end items-center ">
        <button
          onClick={() => setReadmore(!readmore)}
          className="text-orange-500 font-bold"
        >
          {readmore ? "Read less" : "Read more"}
        </button>
      </div>
    </>
  );
};

export default ItemInfo;
