"use client";

import Btn from "@/utils/Btn";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiCheck, HiInformationCircle, HiX } from "react-icons/hi";

import { toast } from "react-toastify";
import { useRegisterUserMutation } from "@/redux/services/users/userApi";
// user regex
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// password regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Email Regex

const EMAIL_REGEX = /^[^\s@]{4,}@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const userRef = useRef();
  const router = useRouter();
  // username state
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [focusUsername, setFocusUsername] = useState(false);
  const [showValidInfo, setShowValidInfo] = useState(false);

  //   Email state
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  //   Password state
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  //   confirmPassword state
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [showConfirmInfo, setShowConfirmInfo] = useState(false);

  //submit button enable state
  const [disable, setDisable] = useState(true);

  // register usermutation
  const [registerUser] = useRegisterUserMutation();

  useEffect(() => {
    userRef.current.focus();
  },[]);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);

    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (validUsername && validPassword && validEmail && validConfirmPassword) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [validConfirmPassword,validPassword, validEmail, validUsername, validUsername]);

  //   Form Submit Function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button is some how enable
    const u = USER_REGEX.test(username);
    const p = PWD_REGEX.test(password);
    if (!u || !p) {
      toast.error("Invalid credentials!");
      return;
    }

    // fucntion to register user
    try {
      const res = await registerUser({ username, email, password });
      if (res.data) {
        setUsername("");
        setEmail("");
        setPassword("");

        router.push("/auth/login");
        toast.success(res.data.message);
      }
      if (res.error) {
        if (res?.error?.data?.username) {
          toast.error(res.error.data.username[0]);
        }
        if (res?.error?.data?.email) {
          toast.error(res.error.data.email[0]);
        }
        if(res.error.status==="FETCH_ERROR"){
          toast.error(res.error.error)
        }
      }
    } catch (error) {
      toast.error("Connection Falied!")
    }
  };
  return (
    <>
      <div className="relative z-0 dark:border dark:border-white/80 rounded-2xl  shadow-lg dark:shadow-md dark:shadow-white/50 shadow-gray-700 p-2 lg:w-11/12 mx-auto">
        <div className="lg:p-5 md:p-2">
          <div className="">
            <h1 className="text-2xl md:text-3xl font-serif -tracking-tighter mb-2">
              Create an account
            </h1>

            <form
              action=""
              className="flex flex-col gap-2"
              onSubmit={handleSubmit}
            >
              {/* Username Field */}
              <div className="flex flex-col gap-4 ">
                <label
                  htmlFor="username"
                  className="flex justify-left gap-2  items-center relative"
                >
                  Username :
                  <HiCheck
                    className={
                      validUsername ? "text-green-500 text-2xl" : "hidden"
                    }
                  />
                  <HiX
                    className={
                      validUsername || !username
                        ? "hidden"
                        : "text-red-500 text-2xl"
                    }
                  />
                  <span
                    className={`cursor-pointer flex items-center justify-center absolute right-3 text-3xl  ${
                      !validUsername && username
                        ? "w-6 h-6 border-2 border-black dark:border-white rounded-full animate-pulse  "
                        : "hidden"
                    }`}
                  >
                    <HiInformationCircle
                      title="Valid Info"
                      className={``}
                      onClick={() => {
                        setShowValidInfo(!showValidInfo),
                          setFocusUsername(true);
                      }}
                    />
                  </span>
                </label>
                <input
                  ref={userRef}
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="off"
                  required
                  aria-invalid={validUsername ? "true" : "false"}
                  aria-description="uidnote"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusUsername(true)}
                  onBlur={() => setFocusUsername(false)}
                  placeholder="Enter username"
                  className=" border border-black/50  text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 bg-transparent dark:border-white/40  dark:placeholder:text-white/60 dark:text-white   dark:focus:outline-white/85 focus:outline-black/85  focus:outline  placeholder:text-black/75 "
                />

                <p
                  id="uidnote"
                  className={`text-xs font-extrabold absolute right-10 md:-right-40 bg-white/80 p-3 rounded-md shadow-md text-black  top-0 ${
                    showValidInfo && focusUsername && username && !validUsername
                      ? "flex"
                      : "hidden"
                  }  `}
                >
                  4 to 24 characters. <br />
                  Must begin with a letter <br />
                  letter, numbers, underscores,
                  <br />
                  hyphens allowed
                </p>
              </div>
              {/* Email field  */}
              <div className="flex flex-col gap-4 relative">
                <label
                  htmlFor="email"
                  className="flex justify-left gap-2  items-center relative"
                >
                  Email :{" "}
                  <HiCheck
                    className={
                      validEmail ? "text-green-500 text-2xl" : "hidden"
                    }
                  />
                  <HiX
                    className={
                      validEmail || !email ? "hidden" : "text-red-500 text-2xl"
                    }
                  />
                  <span
                    className={`cursor-pointer flex items-center justify-center absolute right-3 text-3xl  ${
                      !validEmail && email
                        ? "w-6 h-6 border-2 border-black dark:border-white rounded-full animate-pulse  "
                        : "hidden"
                    }`}
                  >
                    <HiInformationCircle
                      title="Valid Info"
                      className={``}
                      onClick={() => {
                        setShowEmailInfo(!showEmailInfo), setFocusEmail(true);
                      }}
                    />
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  aria-invalid={validEmail ? "true" : "false"}
                  aria-description="eidnote"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                  placeholder="Your Email @gmail.com"
                  className=" border border-black/50 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 bg-transparent dark:border-white/40  dark:placeholder:text-white/60 dark:text-white  dark:focus:outline-white/85 focus:outline-black/85 focus:outline placeholder:text-black/75"
                />
                <p
                  id="eidnote"
                  className={`text-xs font-extrabold absolute right-10 md:-right-40 bg-white/80 p-3 rounded-md shadow-md text-black -top-10 md:top-0 ${
                    showEmailInfo && focusEmail && email && !validEmail
                      ? "flex"
                      : "hidden"
                  }  `}
                >
                  Invalid Email! <br />
                  at least minimum 4 <br /> characters before @.
                </p>
              </div>
              {/* Password Field */}
              <div className="flex flex-col gap-4 relative">
                <label
                  htmlFor="password"
                  className="flex justify-left gap-2  items-center relative"
                >
                  Password :
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
                  type="password"
                  name="password"
                  id="password"
                  required
                  aria-invalid={validPassword ? "true" : "false"}
                  aria-description="pidnote"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPassword(true)}
                  onBlur={() => setFocusPassword(false)}
                  placeholder="••••••••"
                  className=" border border-black/50 text-gray-900 sm:text-sm rounded-lg   block w-full p-1.5 bg-transparent dark:border-white/40  dark:placeholder:text-white/60 dark:text-white  dark:focus:outline-white/85 focus:outline-black/85 focus:outline placeholder:text-black/75 "
                />
                <p
                  id="pidnote"
                  className={`text-xs font-extrabold absolute right-10 md:-right-56 bg-white/80 p-3 rounded-md shadow-md text-black -top-16 md:top-0 ${
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
              {/* Confirm Password Field */}
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
                  className={`text-xs font-extrabold absolute right-10 md:-right-56 bg-white/80 p-3 rounded-md shadow-md text-black top-0 ${
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

              {/* Signup button */}
              <div className="flex flex-col lg:flex-row   gap-3 my-2">
                <input
                  type="submit"
                  disabled={disable}
                  value="Create An Account"
                  className=" disabled:bg-gray-500 disabled:text-black/45   p-2 rounded-full w-full md:w-auto md:px-4 bg-orange-500 hover:bg-orange-700 font-bold font-serif "
                />
                <p className="lg:flex flex-col">
                  <span className="inline-flex text-gray-700 dark:text-gray-400 text-sm  ">
                    Already have an account?
                  </span>
                  <Btn
                    title="Login Here"
                    style={"underline pl-1 text-blue-400 text-sm font-semibold"}
                    path="login"
                  />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
