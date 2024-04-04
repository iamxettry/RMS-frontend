"use client"
import { data } from "@/constants/sidebar";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
const List = ({toggle}) => {
    const pathname = usePathname();
  return (
    <>
    <ul className="">
        {data.map((item)=>{
            let isActive= pathname===`/dashboard${item.path}`

            return(
                <li key={item.id} className={`${isActive?" bg-gradient-to-r from-inherit to-inherit dark:from-pink-300 dark:to-white    text-black/90 ":"dark:text-white"} rounded-md flex justify-start items-center my-2  group text-black  hover:bg-green-200 dark:hover:bg-slate-800 relative `}>
                    <Link href={`/dashboard/${item.path} `}className="flex gap-2 items-center justify-start p-2">
                        <i>
                            <item.icon/>
                        </i>
                        <span className={toggle?"":"hidden lg:flex"}>
                            {item.title}
                        </span>
                    </Link>
                    <span className={ ` ${toggle?"hidden ":" md:group-hover:flex lg:group-hover:hidden"} absolute  left-[48px] top-0 rounded-xl text-black dark:text-white px-7 py-2 ml-1 drop-shadow-lg  shadow-lg hidden dark:bg-slate-300 dark:bg-opacity-10 dark:shadow-md  `}>
                        {item.hover}
                    </span>
                </li>
            )
        }
        )}
    </ul>
    </>
  )
}

export default List