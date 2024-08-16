import React from "react";
import { useSelector } from "react-redux";
import ManageSubscriberCard from "../components/ManageSubscriberCard";
const ManageSubs = () => {
  const subscription =
    useSelector((state) => state.subscription.mySubscriptions) || [];

  return (
    <>
      <div className=" pt-5 flex flex-col gap-10  ">
        {subscription.map((item) => {
          return (
            <ManageSubscriberCard
              key={item?.subscribedChannel?._id}
              avatar={item?.subscribedChannel?.avatar}
              fullName={item.subscribedChannel?.fullName}
              username={item?.subscribedChannel.username}
              SubscriptionCount={
                item?.subscribedChannel?.LatestVideo?.subscriptionsCount
              }
              channelId={item?.subscribedChannel?._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ManageSubs;
