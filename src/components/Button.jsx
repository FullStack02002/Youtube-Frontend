import React from 'react'

export const Button = ({
    type="button",
    children,
    className="",
    bgColor="blue",
    textColor="text-white",
    ...props


}) => {
  return (
    <button type={type} className={`${className} ${bgColor} ${textColor} {...props}`}>
        {children}
    </button>
    
  )
}
