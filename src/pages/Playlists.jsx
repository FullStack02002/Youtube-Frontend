import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserPlaylist } from "../store/Slices/playlistSlice";
import PlaylistPageSkeleton from "../skeletons/PlaylistPageSkeleton";
import PlaylistsVIdeoCard from "../components/PlaylistsVIdeoCard";
const Playlists = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.userData?._id);
  const playlists = useSelector((state) => state.playlist?.playlists) || [];
  const loading = useSelector((state) => state.playlist?.loading);

  useEffect(() => {
    if (userId) {
      dispatch(getUserPlaylist({ userId }));
    }
  }, [userId]);

  if (loading) {
    return <PlaylistPageSkeleton></PlaylistPageSkeleton>;
  }

  return (
    <div className=" text-white pt-5 sm:p-5">
      <h1 className="text-3xl font-bold mb-4 sm:text-start ml-0 sm:ml-4 text-center">
        Playlists
      </h1>
      <div className="flex flex-col gap-1  md:flex md:flex-row flex-wrap  md:gap-20 lg:gap-10">
        {playlists.map((item) => {
          const thumbnail = item.videos?.[0]?.thumbnail;

          return (
            <PlaylistsVIdeoCard
              playlistId={item?._id}
              key={item?._id}
              thumbnail={thumbnail}
              totalVideos={item.totalVideos}
              playlistName={item.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
