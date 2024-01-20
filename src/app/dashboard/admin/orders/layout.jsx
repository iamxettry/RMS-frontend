import React from "react";

export const metadata = {
  title: "Order | Admin Dashboard",
  description: "Welcome to the admin dashboard",
};
const layout = ({ children }) => {
  return (
    <>
      <header className=" p-4 w-full  border-b border-gray-700 drop-shadow-md">
          <h1 className="text-2xl">Order List</h1>
        
        <p className="text-sm">Manages and view the ordered Item</p>
      </header>
      <div className="py-2">{children}</div>
    </>
  );
};

export default layout;
