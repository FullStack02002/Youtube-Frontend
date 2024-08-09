import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikedVideos,
  makeLikedVideosEmpty,
} from "../store/Slices/likeSlice";
import PlaylistSkeleton from "../skeletons/PlaylistSkeleton";
import PlaylistandLikedVideo from "../components/PlaylistandLikedVideo";

const LikedVideos = () => {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.like?.likedVideos) || [];
  const loading = useSelector((state) => state.like?.loading);
  const bgImage = likedVideos[0]?.likedVideo?.thumbnail;
  const fullName = useSelector((state) => state.auth?.userData?.fullName);
  const likedVideosLength=likedVideos.length

  useEffect(() => {
    dispatch(getLikedVideos());

    return () => {
      dispatch(makeLikedVideosEmpty());
    };
  }, []);

  if (loading) {
    return <PlaylistSkeleton></PlaylistSkeleton>;
  }
  return (
    <>
      <PlaylistandLikedVideo
        bgImage={bgImage}
        fullName={fullName}
        videolength={likedVideosLength}
        Videos={likedVideos}
        likedVideos={true}
      />
    </>
  );
};

export default LikedVideos;
