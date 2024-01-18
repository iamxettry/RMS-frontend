import React from "react";
import Link from "next/link";
const NavCard = ({ item ,toggle}) => {
  return (
    <Link href={item.path} className={`flex justify-start items-center  gap-3  `}>
      <i>
        <item.icon />
      </i>
      <h1 className={`  md:inline-flex ${toggle?"inline-flex":"hidden"}`}>{item.title}</h1>
    </Link>
  );
};

export default NavCard;
