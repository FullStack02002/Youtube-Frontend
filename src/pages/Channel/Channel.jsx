import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserChannelProfile,
  makeProfileDataNull,
} from "../../store/Slices/userSlice";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/Channel/ChannelHeader";

const Channel = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const channel = useSelector((state) => state.user?.profileData);

  useEffect(() => {
    dispatch(getUserChannelProfile({ username }));

    return () => {
      dispatch(makeProfileDataNull());
    };
  }, []);

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
    </>
  );
};

export default Channel;
