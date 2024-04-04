import React from "react";

export const metadata = {
    title: "Menu | Admin Dashboard",
    description: "Welcome to the admin dashboard",
  };

const layout = ({children}) => {
  return (
    <div>
      <header className="text-3xl p-4 w-full  shadow-md shadow-gray-500">
        <h1>Menu</h1>
        <p className="text-sm">Manages and view the created menu easily</p>
      </header>
      <div className="p-4 ">{children}</div>
    </div>
  );
};

export default layout;
