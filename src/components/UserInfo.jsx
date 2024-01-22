import { useGetLoggedUserQuery } from "@/redux/services/users/userApi";
import Cookies from "js-cookie";
import Link from "next/link"
import {toast} from 'react-toastify'
const UserInfo = () => {
  const accessToken = Cookies.get("access_token");
  const { data } = useGetLoggedUserQuery(accessToken);
  const handleLogout =async () => {

    Cookies.remove("loggedin")
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    Cookies.remove("userId")
    // Cookies.remove("count")
    Cookies.remove("user")
    Cookies.remove("superuser")
    await fetch(
      `http://127.0.0.1:8000/api/order/cart/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      router.push('/')
      toast.success("Logout successful!")
    
  };
  return (
    <div className="">
      <div className="px-4 py-3 border-b border-gray-700 dark:border-white">
        <span className="block text-sm text-gray-900 dark:text-white">
          {data?.username}
        </span>
        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
          {data?.email}
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
              
              {
                data?.is_superuser ?<li>
                <Link
                  href="/dashboard/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 dark:hover:bg-white rounded-md  dark:text-gray-200 dark:hover:text-black"
                >
                  Admin
                </Link>
              </li>:
                <li>
                <Link
                  href={`/dashboard/user`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 dark:hover:bg-white rounded-md  dark:text-gray-200 dark:hover:text-black"
                >
                  Profile
                </Link>
              </li>
              }
            
              {
                data?.is_superuser ?<li>
                <Link
                  href="/dashboard/admin/setting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 dark:hover:bg-white rounded-md  dark:text-gray-200 dark:hover:text-black"
                >
                  Settings
                </Link>
              </li>: <Link
                  href="/dashboard/user/setting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 dark:hover:bg-white rounded-md  dark:text-gray-200 dark:hover:text-black"
                >
                  Settings
                </Link>
              }
              

              <li onClick={handleLogout}>

                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 dark:hover:bg-white rounded-md  dark:text-gray-200 dark:hover:text-black"
                >
                  Sign out
                </a>
              </li>
            </ul>
    </div>
  );
};

export default UserInfo;
