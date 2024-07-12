import React from 'react'

export const Button = ({
    type="submit",
    children,
    className="",
    bgColor="blue",
    textColor="text-white",
    ...props


}) => {
  return (
    <button type={type} className={`${className} ${bgColor} ${textColor} font-medium p-3 text-xl`}>
        {children}
    </button>
    
  )
}
