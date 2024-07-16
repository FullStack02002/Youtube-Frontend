import React from 'react'
import { formatDuration } from "../helpers/formatDuration";
import { timeAgo } from "../helpers/timeAgo";


export const VideoCard = ({title,thumbnail,videoId,avatar,duration,channel,views,createdAt}) => {

  return (
    <>
    
      <div className="  h-[328px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[45%] lg:basis-[30%] " >
          <div id="thumbnail-container" className=" relative ">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="w-full h-[224px] rounded-xl "
            />
            <span className="text-sm rounded-lg text-white py-1 px-2 bg-black absolute bottom-2 right-2">
              {formatDuration(duration)}
            </span>
          </div>
          <div id="content-container" className=" mt-3 flex flex-row  gap-5 items-center">
            <div id="avatar" >
              <img
                src={avatar}
                className="w-[50px] h-[50px] rounded-full mb-7  sm:mb-0"
              />
            </div>
            <div id="content" className="w-[70%] h-[92px]">
              <h2 className="text-white font-bold text-[15px] lg:text-[16px]">{title}</h2>
              <div className="text-[#AAAAAA]">
                <h2 className="text-[15px]  lg-text[16px]" >{channel}</h2>
                <span className="text-[13px] lg:text-[16px]">{`${views} views. ${timeAgo(createdAt)}`}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    

  )
}
