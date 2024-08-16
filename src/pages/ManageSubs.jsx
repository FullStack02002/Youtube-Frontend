import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ManageSubscriberCard from "../components/ManageSubscriberCard";
import ManageSubsSkeleton from "../skeletons/ManageSubsSkeleton";
const ManageSubs = () => {
  const subscription =
    useSelector((state) => state.subscription.mySubscriptions) || [];

  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);
  if (loading) {
    return <ManageSubsSkeleton />;
  }

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
