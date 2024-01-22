import Sidebar from "@/components/dashboard/user/Sidebar";

const layout = ({ children }) => {
  return (
    <>
        <div className="absolute left-0 z-10 bg-blue-300 dark:bg-black">
            <Sidebar/>
            
        </div>
      <div className="lg:pl-6 pl-10 md:pl-4">{children}</div>
    </>
  );
};

export default layout;
