import React, { useEffect, useState } from "react";
import { formatDuration } from "../helpers/formatDuration";
import { timeAgo } from "../helpers/timeAgo";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical,MdSaveAlt } from "../components/icons";
import { useDispatch, useSelector } from "react-redux";
export const VideoCard = ({
  title,
  thumbnail,
  videoId,
  avatar,
  duration,
  channel,
  views,
  createdAt,
  ownerId,
}) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [playlistPopOpen,setplaylistPopOpen]=useState(false);

  const playlists=useSelector((state)=>state.playlist?.playlists);
  const isAuth=useSelector((state)=>state.auth?.status);



 
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/watch/${videoId}/${ownerId}`);
        }}
        className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] "
      >
        <div id="thumbnail-container" className="relative">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-[224px] sm:rounded-xl"
          />
          <span className="text-sm rounded-lg text-white py-1 px-2 bg-black absolute bottom-2 right-2">
            {formatDuration(duration)}
          </span>
        </div>
        <div
          id="content-container"
          className="mt-3 flex flex-row gap-4 items-center"
        >
          <div id="avatar">
            <img
              src={avatar}
              className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0"
            />
          </div>
          <div id="content" className="w-[80%] ">
            <h2 className="text-white font-bold text-[15px] lg:text-[16px] line-clamp-2">
              {title}
            </h2>
            <div className="text-[#AAAAAA]">
              <h2 className="text-[15px] lg-text[12px] truncate">{channel}</h2>
              <span className="text-[13px] lg:text-[16px]">{`${views} views. ${timeAgo(
                createdAt
              )}`}</span>
            </div>
          </div>
        </div>
        {/* three dots for opening save to playlist */}
        <BsThreeDotsVertical className={ ` ${isAuth?"block":"hidden"} text-white absolute bottom-[80px] right-0 cursor-pointer `} onClick={(e)=>{
          e.stopPropagation();
          setplaylistPopOpen((prev)=>!prev);
        }} />
        
        {/* div opens when three dots gets clicked */}
        <div className={` ${playlistPopOpen?"block":"hidden"} absolute w-[253px]  z-10 bg-[#272727] rounded-xl bottom-[18px] right-[10px] pt-3 pb-3`}>
        <div className=" flex flex-row justify-center gap-5 hover:text-purple-500 text-white pt-2 pb-2">
          <div><MdSaveAlt  size={24}/></div>
          <p>Save to playlist</p>
        </div>

        </div>

        {/* div opens when save to playlist gets clicked */}
        {/* <div className={`border w-[200px] h-[253px] absolute right-[10px] bottom-[18px] z-10 bg-[#272727] rounded-xl  p-5 `}>
        <h1 className="text-white font-bold">Save video to...</h1>
        {playlists.map((item)=>{
          return(
            <div className="text-white">{item?.name}</div>
          )
        })}

        </div> */}



      </div>
    </>
  );
};
