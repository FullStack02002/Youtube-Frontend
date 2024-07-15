import React from "react";
import { Link } from "react-router-dom";
import { IoLogoYoutube } from "./icons";

export const Logo = ({ size = "30" }) => {
  return (
    <Link to={"/"} className="flex gap-2 items-center">
      <IoLogoYoutube size={size} color="#A855F7" />
      <span className="text-white font-bold ">YOUTUBE</span>
    </Link>
  );
};
