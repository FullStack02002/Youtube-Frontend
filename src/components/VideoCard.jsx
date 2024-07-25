import React from "react";
import { formatDuration } from "../helpers/formatDuration";
import { timeAgo } from "../helpers/timeAgo";
import { useNavigate } from "react-router-dom";

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
  const navigate=useNavigate();
  return (
    <>
      <div onClick={(e)=>{
        e.stopPropagation();
        navigate(`/watch/${videoId}/${ownerId}`)

      }} className=" h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%]">
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
          className="mt-3 flex flex-row gap-5 items-center"
        >
          <div id="avatar">
            <img
              src={avatar}
              className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0"
            />
          </div>
          <div id="content" className="w-[83%]">
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
      </div>
    </>
  );
};
