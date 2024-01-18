import React from 'react'

const Backlight = ({style}) => {
  return (
    <div className={`hidden dark:block absolute   ${style}`} />
  )
}

export default Backlight