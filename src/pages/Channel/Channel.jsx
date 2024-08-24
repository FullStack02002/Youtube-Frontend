import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserChannelProfile,
  makeProfileDataNull,
} from "../../store/Slices/userSlice";
import { useParams,Outlet,useLocation } from "react-router-dom";
import ChannelHeader from "../../components/Channel/ChannelHeader";
import ChannelNavigate from "../../components/Channel/ChannelNavigate";

const Channel = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const channel = useSelector((state) => state.user?.profileData);
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserChannelProfile({ username }));

    return () => {
      dispatch(makeProfileDataNull());
    };
  }, [location.pathname]);

  return (
    <>
      <ChannelHeader
        coverImage={channel?.coverImage}
        avatar={channel?.avatar}
        username={username}
        fullName={channel?.fullName}
        subscribersCount={channel?.subscribersCount}
        totalVideos={channel?.totalVideos}
        isSubscribed={channel?.isSubscribed}
        channelId={channel?._id}
      />
      <ChannelNavigate username={username}/>
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet />
            </div>
    </>
  );
};

export default Channel;
