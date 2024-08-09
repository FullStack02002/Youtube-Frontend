import React from 'react'
import { timeAgo } from "../helpers/timeAgo";
import { formatDuration } from "../helpers/formatDuration";
import { useNavigate } from 'react-router-dom';

const PlayAndLikeVideoList = ({thumbnail,username,views,createdAt,navigates,duration,title,index}) => {
    const navigate=useNavigate();
  return (
    <div >
    {/* video container */}
    <div
      className="flex flex-row items-center  sm:p-2 gap-4 cursor-pointer rounded-xl hover:bg-[#212121]"
      onClick={(e) => {
        e.stopPropagation();
        navigate(
          `${navigates}`
        );
      }}
    >
      {/* index */}
      <div className="text-white hidden sm:block">{index}</div>
      {/* video */}
      <div className="relative">
        <img
          src={thumbnail}
          className="w-[200px] sm:w-[160px] h-[100px] sm:h-[90px] rounded-sm"
        />
        <span className="absolute text-[12px] p-1 bottom-1 right-1 text-white rounded-sm bg-black">
          {formatDuration(duration)}
        </span>
      </div>

      {/* information */}

      <div className="flex flex-col gap-2  basis-[80%]  ">
        <p className="text-white line-clamp-1 font-semi-bold">
          {title}
        </p>

        <div className="text-[#AAAAAA] text-[16px] sm:flex sm:flex-row sm:gap-3">
          <p>
            {`${username} ${views} views`}
          </p>
          <p> {timeAgo(createdAt)}</p>
        </div>
      </div>
    </div>
  </div>  )
}

export default PlayAndLikeVideoList