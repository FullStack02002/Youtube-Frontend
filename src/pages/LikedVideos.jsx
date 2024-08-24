import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikedVideos,
  makeLikedVideosEmpty,
} from "../store/Slices/likeSlice";
import PlaylistSkeleton from "../skeletons/PlaylistSkeleton";
import PlaylistandLikedVideo from "../components/PlaylistandLikedVideo";
import NoVideosFound from "../components/NoVideosFound";

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

  if(likedVideos && likedVideos.length===0){
    return (<NoVideosFound text="There are no videos available here."/>)
  }
  return (
    <>
      <PlaylistandLikedVideo
        bgImage={bgImage}
        fullName={fullName}
        videolength={likedVideosLength}
        Videos={likedVideos}
        likedVideos="true"
        Text="Liked Videos"
      />
    </>
  );
};

export default LikedVideos;
