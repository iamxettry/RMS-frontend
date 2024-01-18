"use client";

import { useResetPasswordMutation } from "@/redux/services/users/userApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiCheck, HiInformationCircle, HiX } from "react-icons/hi";
import {toast} from 'react-toastify'
// password regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ResetPassword = ({ params }) => {
  const passRef = useRef();

  // password usestate
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  // confirmpassword usestate
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [showConfirmInfo, setShowConfirmInfo] = useState(false);

  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const { id, token } = params;
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);

    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    passRef.current.focus();
  }, []);

  const handleSubmit =async (e) => {
    e.preventDefault();
    // if button is somehow enable
    const v1 = PWD_REGEX.test(password);
    if (!v1) {
      toast.error("Invalid Entry!");
      return;
    }
     //function to reset password
     const res = await resetPassword({ password,confirmPassword, id, token });
     if (res.data) {
        router.push("/auth/login");
       toast.success(res.data.msg);
     }
 
     if (res.error) {
         if (res.error.error) {
             
             toast.error(res.error.error);
         }else{
              router.push("/auth/forgot-password")
             toast.error(res.error.data.non_field_errors[0]);
         }
 
     }
  };
  return (
    <>
      <div className="relative z-0 dark:border dark:border-white/80 border-black/80 rounded-2xl  shadow-md dark:shadow-white/50 shadow-gray-700 p-2  lg:w-4/5 mx-auto">
        <div className="min-h-80 py-5 lg:px-4">
          <h1 className="text-2xl md:text-3xl font-serif -tracking-tighter mb-6">
            New Password
          </h1>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {/* new password */}
            <div className="flex flex-col gap-4 relative">
              <label
                htmlFor="password"
                className="flex justify-left gap-2  items-center relative"
              >
                New Password :
                <HiCheck
                  className={
                    validPassword ? "text-green-500 text-2xl" : "hidden"
                  }
                />
                <HiX
                  className={
                    validPassword || !password
                      ? "hidden"
                      : "text-red-500 text-2xl"
                  }
                />
                <span
                  className={`cursor-pointer flex items-center justify-center absolute right-3 text-3xl  ${
                    !validPassword && password
                      ? "w-6 h-6 border-2 border-black dark:border-white rounded-full animate-pulse  "
                      : "hidden"
                  }`}
                >
                  <HiInformationCircle
                    title="Valid Info"
                    className={``}
                    onClick={() => {
                      setShowPasswordInfo(!showPasswordInfo),
                        setFocusPassword(true);
                    }}
                  />
                </span>
              </label>
              <input
                ref={passRef}
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
              <p
                id="pidnote"
                className={`text-xs font-extrabold absolute -right-56 bg-white/80 p-3 rounded-md shadow-md text-black top-0 ${
                  showPasswordInfo &&
                  focusPassword &&
                  password &&
                  !validPassword
                    ? "inline-block"
                    : "hidden"
                }  `}
              >
                8 to 24 characters. <br />
                Must include uppercase and <br />
                lowercase letters, a number <br /> and a special caharacter.{" "}
                <br />
                Allowed special characters:
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hastag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </div>
            {/* confirm password */}
            <div className="flex flex-col gap-4 relative">
              <label
                htmlFor="confirm-password"
                className="flex justify-left gap-2  items-center relative"
              >
                Confirm Password :
                <HiCheck
                  className={
                    validConfirmPassword && confirmPassword && validPassword
                      ? "text-green-500 text-2xl"
                      : "hidden"
                  }
                />
                <HiX
                  className={
                    validConfirmPassword || !confirmPassword || validPassword
                      ? "hidden"
                      : "text-red-500 text-2xl"
                  }
                />
                <span
                  className={`cursor-pointer flex items-center justify-center absolute right-3 text-3xl  ${
                    !validConfirmPassword && confirmPassword
                      ? "w-6 h-6 border-2 border-black dark:border-white rounded-full animate-pulse  "
                      : "hidden"
                  }`}
                >
                  <HiInformationCircle
                    title="Valid Info"
                    className={``}
                    onClick={() => {
                      setShowConfirmInfo(!showConfirmInfo),
                        setFocusConfirmPassword(true);
                    }}
                  />
                </span>
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                required
                aria-invalid={validConfirmPassword ? "true" : "false"}
                aria-description="confirmidnote"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusConfirmPassword(true)}
                onBlur={() => setFocusConfirmPassword(false)}
                placeholder="••••••••"
                className=" border border-black/50 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 bg-transparent dark:border-white/40  dark:placeholder:text-white/60 dark:text-white  dark:focus:outline-white/85 focus:outline-black/85 focus:outline placeholder:text-black/75"
              />
              <p
                id="confirmidnote"
                className={`text-xs font-extrabold absolute -right-56 bg-white/80 p-3 rounded-md shadow-md text-black top-0 ${
                  showConfirmInfo &&
                  focusConfirmPassword &&
                  confirmPassword &&
                  !validConfirmPassword
                    ? "inline-block"
                    : "hidden"
                }  `}
              >
                Must match the first password field
              </p>
            </div>
            <input
              type="submit"
              disabled={false}
              value="Save"
              className=" disabled:bg-gray-500 disabled:text-black/45   p-2 rounded-full w-full md:w-auto md:px-4 bg-orange-500 hover:bg-orange-700 font-bold font-serif  "
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
