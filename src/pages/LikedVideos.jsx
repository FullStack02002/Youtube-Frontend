import React, { useEffect } from "react";
import { Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikedVideos,
  makeLikedVideosEmpty,
} from "../store/Slices/likeSlice";

 const LikedVideos = () => {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.like?.likedVideos) || [];
  const bgImage = likedVideos[0]?.likedVideo?.thumbnail;
  const fullName=useSelector((state)=>state.auth?.userData?.fullName);

  useEffect(() => {
    dispatch(getLikedVideos());

    return () => {
      dispatch(makeLikedVideosEmpty());
    };
  }, []);
  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* page container */}
      <div className="flex flex-row mt-5 p-5">
        {/* banner */}
        <div
          className=" h-[580px] fixed w-[20%] rounded-xl"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
            backgroundSize: "400% 250%",
            backgroundPosition: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div></div>
        </div>

        {/* banner inner container */}
        <div className=" relative top-0 border p-5 w-[20.5%] h-[580px] rounded-xl flex flex-col gap-5">
        {/* image */}
        <div className="h-[175px] rounded-xl">
        <img src={bgImage} className="h-full rounded-xl"/>

        </div>
        {/* heading */}
        <h1 className="text-white font-bold text-[28px]">Liked videos</h1>

        {/* fullname and videos count */}

        <div className="flex flex-col gap-2">
        <p className="text-white text-[14px] uppercase font-bold">{fullName}</p>

        </div>
        </div>
      </div>
    </>
  );
};

export default LikedVideos