import Image from "next/image";
import Link from "next/link";
import IncrementCartItem from "./IncrementCartItem";

const MenuItem = ({ category }) => {
  return (
    <>
      {category?.map((item) => (
        <div
          className="relative group cursor-pointer   bg-transparent  md:m-2 px-2 md:px-4 py-1 lg:p-1 gap-2 rounded-lg  dark:bg-black   dark:text-white/80  shadow-xl dark:shadow-md shadow-slate-500 dark:shadow-pink-100  border border-slate-300 dark:border-gray-600 dark:hover:border-orange-500  hover:border-orange-500 hover:scale-105 transition-all ease-in-out duration-500 "
          key={item.id}
        >
          {/* Click on item view item in cart */}
          <Link
            href={`/menu/${item?.id}/#add-to-cart`}
            className=" w-full flex flex-col justify-around items-center  "
          >
            <Image
              src={item?.img}
              priority
              height={200}
              width={300}
              className=" rounded-lg  "
              alt={item?.name || "profile image"}
            />
            <h1 className="capitalize text-start w-full text-black text-opacity-80 text-sm sm:text-sm  md:text-lg my-2 lg:px-3 dark:text-white">
              <b>{item?.name}</b>
            </h1>
            <div className="flex justify-between items-center w-full relative mb-3">
              <p className="text-black text-opacity-80 lg:px-3 dark:text-white text-sm ">
                <b>Rs-{item?.price}</b>
              </p>
              {/* click on + add item in cart */}
            </div>
          </Link>
          <IncrementCartItem slug={item.id} />
        </div>
      ))}
    </>
  );
};

export default MenuItem;
