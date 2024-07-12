import React from "react";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

export const Logo = ({ size = "30" }) => {
  return (
    <Link to={"/"} className="flex gap-2 items-center">
      <IoLogoYoutube size={size} color="#A855F7" />
      <span className="text-white font-bold ">YOUTUBE</span>
    </Link>
  );
};
