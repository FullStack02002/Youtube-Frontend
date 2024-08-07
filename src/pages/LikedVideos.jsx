import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikedVideos,
  makeLikedVideosEmpty,
} from "../store/Slices/likeSlice";
import { timeAgo } from "../helpers/timeAgo";
import { formatDuration } from "../helpers/formatDuration";
import { useNavigate } from "react-router-dom";


 const LikedVideos = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
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

      {/* page container */}
      <div className="flex flex-row  p-5  ">
        {/* banner */}
        <div>
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
        <div className=" fixed  top-[119px] left-[254px] p-5 w-[20%] h-[580px] rounded-xl flex flex-col gap-5">
        {/* image */}
        <div className="h-[175px] rounded-xl">
        <img src={bgImage} className="h-full rounded-xl"/>

        </div>
        {/* heading */}
        <h1 className="text-white font-bold text-[28px]">Liked videos</h1>

        {/* fullname and videos count */}

        <div className="flex flex-col gap-1">
        <p className="text-white text-[14px] uppercase font-bold">{fullName}</p>
        <span className="text-white text-[14px]">{likedVideos.length} videos</span>

        </div>
        </div>
        </div>

        {/* video list */}
        <div className=" ml-[330px] w-[80%]  flex flex-col  gap-4 p-2">
        {likedVideos.map((video,index)=>{
         return(
          <>
          {/* video container */}
          <div className="flex flex-row items-center  p-2 gap-4 cursor-pointer rounded-xl hover:bg-[#212121]" key={video.likedVideo?._id} onClick={(e)=>{
            e.stopPropagation();
            navigate(`/watch/${video?.likedVideo?._id}/${video?.likedVideo?.ownerDetails?._id}`)
          }}>
          {/* index */}
          <div className="text-white">
            {index}
          </div>
          {/* video */}
          <div className="relative" >
          <img src={video?.likedVideo?.thumbnail} className="w-[160px] h-[90px] rounded-sm"/>
          <span className="absolute text-[12px] p-1 bottom-1 right-1 text-white rounded-sm bg-black">{formatDuration(video?.likedVideo?.duration)}</span>
            
          </div>

          {/* information */}

          <div className="flex flex-col gap-2 basis-[80%]  ">
          <p className="text-white line-clamp-1 font-semi-bold">{video?.likedVideo?.title}</p>
          
          <p className="text-[#AAAAAA] text-[16px]">{`${video?.likedVideo?.ownerDetails?.username} ${video?.likedVideo?.views} views`} {timeAgo(video?.likedVideo?.createdAt)}</p>

          </div>

          </div>
          </>
         )
        })}
      

        </div>
      </div>
    </>
  );
};

export default LikedVideos