import React from "react";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch, SlMenu } from "../icons"


export const Navbar = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth?.status);
  const userAvatar = useSelector((state) => state.auth?.userData?.avatar);
  return (
    <>
      <nav
        id="nav-container"
        className="border-b-2 border-gray-500 flex justify-between h-20 items-center pl-3 pr-3 mx-auto max-w-screen-2xl sticky"
      >
        <div id="nav-logo">
          <Logo />
        </div>

        {/* search for small screen  */}
        <div id="search-bar" className="w-[35%] border border-slate-600 hidden sm:block">
          {/* <input type='text' placeholder='Search' className='w-full px-2 py-2 bg-[#0E0F0F] outline-none focus:bg-[#222222] text-white' /> */}
          <Search />
        </div>


        {/* login and signup butons for larger screens */}
        {authStatus?(
          <div className="rounded-full sm:block hidden">
          <img
            src={userAvatar}
            alt="Avatar"
            className="rounded-full h-10 w-10 object-cover"
          />
        </div>
        ):(
          <div
          id="button-containers"
          className="text-white  hidden sm:block "
        >
          <div className="w-full flex flex-row gap-2 ">
          <Link to="/login">
            <Button
              className="h-[50px] border border-slate-500 w-[100px]  p-2 hover:scale-110 duration-100 ease-in hover:bg-[#0F0F0F]"
              bgColor="bg-[#222222]"
            >
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className="h-[50px] border border-slate-500 w-[100px]  p-2 hover:scale-110 duration-100 ease-in hover:bg-[#222222]"
              bgColor="bg-[#0F0F0F]"
            >
              Sign Up
            </Button>
          </Link>
          </div>
        </div>
        )}

{/* hamburger and search icon for small screen */}
        <div className="block sm:hidden">
          <div className="text-white font-bold cursor-pointer flex gap-4 items-center">
          <CiSearch size={30}
            fontWeight={"bold"}
          />
          <SlMenu size={24}
            fontWeight={"bold"}
          />

          </div>
        </div>
        
  
      </nav>
    </>
  );
};
