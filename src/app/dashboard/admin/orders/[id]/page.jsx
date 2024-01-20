import React from "react";
import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";
import UserOrder from "@/components/dashboard/admin/UserOrder";
const page = ({params}) => {
  const {id} =params;
  return (
    <>
      <header className="flex justify-between items-center my-2 border-b border-gray-700 pb-2">
        <Link
          href={"/dashboard/admin/orders"}
          className="flex items-center justify-center gap-2 text-sm underline"
        >
          <ImArrowLeft2 /> <span>Back</span>
        </Link>
        <Link href={`/dashboard/admin/orders/${id}/history`} className="font-bold underline">View History</Link>
      </header>
      <main>
        <UserOrder userid={id}/>
    
      </main>
    </>
  );
};

export default page;
