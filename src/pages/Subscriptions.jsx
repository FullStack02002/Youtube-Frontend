import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getSubscribedChannels,
} from "../store/Slices/subscriptionsSlice";
import { VideoCard } from "../components";
import SubscriptionsSkeleton from "../skeletons/SubscriptionsSkeleton";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const subscriptions =
    useSelector((state) => state.subscription.mySubscriptions) || [];

    const loading=useSelector((state)=>state.subscription?.loading);

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, []);


  if(loading){
    return <SubscriptionsSkeleton></SubscriptionsSkeleton>
  }






  return (
    <>
      <div className="mt-5 mb-5 flex flex-row justify-between items-center   w-[95%]">
        <h1 className="text-white text-xl cursor-pointer">Latest</h1>
        <NavLink to={"/subscriptions/manage"}>
          <span className="text-purple-500 text-xl cursor-pointer ">Manage</span>
        </NavLink>
      </div>
      <div className="   flex flex-col gap-2  sm:flex sm:flex-row  flex-wrap  sm:gap-5  lg:gap-4 xl:gap-4 ">
        {subscriptions.map((item) => {
          return (
            <VideoCard
              key={item.subscribedChannel?._id}
              title={item.subscribedChannel?.LatestVideo?.title}
              avatar={item.subscribedChannel?.avatar}
              thumbnail={item.subscribedChannel?.LatestVideo?.thumbnail}
              duration={item.subscribedChannel?.LatestVideo?.duration}
              createdAt={item.subscribedChannel?.LatestVideo?.createdAt}
              views={item.subscribedChannel?.LatestVideo?.views}
              channel={item.subscribedChannel?.username}
              videoId={item.subscribedChannel?.LatestVideo?._id}
              ownerId={item.subscribedChannel?._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Subscriptions;
