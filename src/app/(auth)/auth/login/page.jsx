"use client";
import { useLoginUserMutation } from "@/redux/services/users/userApi";
import Btn from "@/utils/Btn";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const userRef = useRef();
  const router = useRouter();

  // email usestate
  const [email, setEmail] = useState("");

  // password state

  const [password, setPassword] = useState("");

  const [login] = useLoginUserMutation();
  useEffect(() => {
    userRef.current.focus();
  },[]);

  //   function to submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ email, password });
      if (result.data) {
        Cookies.set("loggedin", true, { expires: 10 });
        const { refresh, access } = result.data.token;
        Cookies.set("access_token", access, { expires: 10 });
        Cookies.set("refresh_token", refresh, { expires: 30 });
        Cookies.set("userId",result.data.user_id,{ expires: 10 })
        setEmail("");
        setPassword("");
        if (result.data.superUser) {
          // set cookies to superuser true
          Cookies.set("superuser", true, { expires: 10 });

          router.push("/dashboard/admin");
        } else {
          Cookies.set("user",true,{expires:10})
          router.push("/");
        }
        toast.success("Login successfully!");
      }
      if (result.error) {
        if (result.error.status === 400) {
          toast.error(
            "400! Bad Request :" + result.error.data.non_field_errors[0]
          );
        } else if (result.error.status === 401) {
          toast.error("401! Unauthorized :" + result.error.data.detail);
        } else {
          toast.error(result.error.status);
        }
      }
    } catch (e) {
      toast.error("Bad Request!!!");
    }
  };
  return (
    <>
      <div className="relative z-0 dark:border dark:border-white/80 border-black/80 rounded-2xl  shadow-md dark:shadow-white/50 shadow-gray-700 p-2  lg:w-4/5 mx-auto">
        <div className="min-h-80 py-5 lg:px-4">
          <h1 className="text-xl md:text-3xl font-serif -tracking-tighter mb-6">
            Sign in to your account
          </h1>
          <form
            action=""
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            {/* Username field */}
            <div className="flex flex-col gap-4">
              <label htmlFor="email">Your Email :</label>
              <input
                ref={userRef}
                type="email"
                id="email"
                name="email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="  border border-black/50  text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 bg-transparent dark:border-white/40 placeholder:text-black/45 dark:placeholder:text-white/60 dark:text-white   dark:focus:outline-white/85 focus:outline-black/85  focus:outline    "
              />
            </div>
            {/* Password Field */}
            <div className="flex flex-col gap-4">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                className="  border border-black/50  text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 bg-transparent dark:border-white/40 placeholder:text-black/45 dark:placeholder:text-white/60 dark:text-white   dark:focus:outline-white/85 focus:outline-black/85  focus:outline  "
              />
            </div>
            <div className="flex items-center justify-end">
              <Btn
                title="Forgot password?"
                path="forgot-password"
                style={"hover:underline opacity-50"}
              />
            </div>

            {/* Sign In Button */}

            <div className="flex flex-col lg:flex-row   gap-3 my-2">
              <input
                type="submit"
                disabled={false}
                value="Sign in"
                className=" disabled:bg-gray-500 disabled:text-black/45 lg:w-32   p-2 rounded-full w-full md:w-auto md:px-4 bg-orange-500 hover:bg-orange-700 font-bold font-serif "
              />
              <p className="lg:flex flex-row items-center">
                <span className="inline-flex text-gray-700 dark:text-gray-400 text-sm  ">
                  Don&apos;t have an account yet?
                </span>
                <Btn
                  title="Register"
                  style={"underline pl-1 text-blue-400 text-sm font-semibold"}
                  path="signup"
                />
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
