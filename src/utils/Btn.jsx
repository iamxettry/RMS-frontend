import React from 'react'

import Link from "next/link";

const Btn = ({title,style,path}) => {
  return (

    <>
    <Link href={path}>
    <span className={`${style} font-serif opacity-80`}>{title}</span>
    </Link>
    </>
  )
}

export default Btn