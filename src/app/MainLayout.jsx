"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { selectCurrentMode } from "@/redux/features/darkmodeSlice";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const MainLayout = ({ children }) => {
  let mode = useSelector(selectCurrentMode);
  let m=Cookies.get('mode')
  return (
    <>
      <ToastContainer></ToastContainer>

      <main
        className={`${
          mode ? "dark " : "bg-gradient-to-r from-blue-300 to-pink-100"
        } relative`}
      >
        <div className="min-h-screen  text-white/90  dark:bg-black  transition-all ease-in-out duration-300 relative">
          <Navbar />

          <div className="min-h-screen z-0 w-[90%] sm:w-[86%] lg:w-4/5 mx-auto text-black dark:text-white">
            {children}
          </div>
          <footer className="relative bottom-0 left-0 mt-10 z-20 text-black dark:text-white">
            <Footer />
          </footer>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
