import React, { useState, useEffect } from "react";
import { Button, Likes } from "../components";
import { useDispatch } from "react-redux";
import { toggleSubscriptions } from "../store/Slices/subscriptionsSlice";
import { timeAgo } from "../helpers/timeAgo";

export const Description = ({
  avatar,
  username,
  subscribersCount,
  isSubscribed,
  channelId,
  isLiked,
  likesCount,
  videoId,
  views,
  createdAt,
  Description
}) => {
  const [localisSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] =
    useState(subscribersCount);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalIsSubscribed(isSubscribed);
    setLocalSubscribersCount(subscribersCount);
  }, [isSubscribed, subscribersCount]);

  const handleSubscription = (e) => {
    e.stopPropagation();
    dispatch(toggleSubscriptions({ channelId }));
    if (localisSubscribed) {
      setLocalSubscribersCount((prev) => prev - 1);
    } else {
      setLocalSubscribersCount((prev) => prev + 1);
    }
    setLocalIsSubscribed(!localisSubscribed);
  };
  


  return (
    <>
    <div className="w-full flex flex-row justify-between pt-[10px] pb-[10px] ">
      <div className="flex flex-row gap-4 ">
        <div>
          <img
            src={avatar}
            className="w-[40px] h-[40px] rounded-full"
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-white font-bold">{username}</h2>
          <p className="text-[#AAAAAA] text-[14px]">{`${localSubscribersCount} subscribers`}</p>
        </div>
        <div className="mt-[6px]" onClick={handleSubscription}>
          <Button className="text-white font-bold text-[14px] bg-purple-500 border-none outline-none h-[36px] w-[95px] rounded-full">
            {localisSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </div>
      <div className="rounded-full w-[110px] flex justify-between bg-[#222222] px-2 py-1 items-center mr-[20px]">
        <Likes size={25} isLiked={isLiked} likesCount={likesCount} videoId={videoId} />
      </div>
    </div>
    <div className="w-full mt-2 bg-[#272727] text-white p-3 rounded-xl">
    <span className="text-[14px] font-semibold">{views}views</span>
    <span className="ml-2 text-[14px] font-semibold">{timeAgo(createdAt)}</span>
    <p>{Description}</p>

    </div>
    </>
    
  );
};