import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserPlaylist } from "../store/Slices/playlistSlice";
import { BigLoader } from "../components";
import { CgPlayList } from "../components/icons";
import PlaylistPageSkeleton from "../skeletons/PlaylistPageSkeleton";
const Playlists = () => {
  const navigate = useNavigate();
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
    return <PlaylistPageSkeleton></PlaylistPageSkeleton>
  }

  return (
    <div className="text-white pt-5 sm:p-5">
      <h1 className="text-3xl font-bold mb-4 sm:text-start ml-0 sm:ml-4 text-center">
        Playlists
      </h1>
      <div className="flex flex-col gap-1  md:flex md:flex-row flex-wrap  md:gap-20 lg:gap-10">
        {playlists.map((item) => {
          const thumbnail = item.videos?.[0]?.thumbnail;

          return (
            <div
              className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer"
              key={item?._id}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/playlists/${item?._id}`);
              }}
            >
              <div className="h-[50px] w-[70%]  bg-[#606060]  rounded-xl "></div>

              <div className="w-[80%] top-[3px]  bg-[#768893] absolute h-[50px] rounded-xl "></div>

              <div className="absolute w-[90%] top-[8px] h-[166.8px]">
                <img
                  src={thumbnail}
                  className="w-full rounded-xl h-[166.8px]"
                />
              </div>

              <div className=" absolute bottom-[70px] right-[30px] z-10  bg-[#00000099] flex flex-row items-center p-2 gap-1">
                <CgPlayList className="text-white font-bold" size={20} />
                <span className="text-white text-[14px]">
                  {item.totalVideos
                    ? `${item.totalVideos} videos`
                    : "No videos"}
                </span>
              </div>

              <div className=" mt-[140px] w-full">
                <h1 className="text-white text-center font-bold hover:text-purple-500">
                  {item.name}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;