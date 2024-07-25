import React, { useEffect } from "react";
import { Navbar, Video } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";
import { formatDuration } from "../helpers/formatDuration";
import {
  getVideoById,
  makeVideoNull,
  getAllVideos,
  makeVideosNull,
} from "../store/Slices/videoSlice";

export const VideoDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videoId, ownerId } = useParams();
  const userId = ownerId;

  const video = useSelector((state) => state.video?.video);
  const videos = useSelector((state) => state.video?.videos.docs);

  useEffect(() => {
    dispatch(getVideoById({ videoId }));
    dispatch(getAllVideos({ userId }));
    return () => {
      dispatch(makeVideoNull());
      dispatch(makeVideosNull());
    };
  }, [dispatch, videoId, userId]);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto">
        <div
          id="container"
          className="  h-[1000px] mt-[20px] ml-[60px] mr-[60px] flex flex-row gap-[1%]"
        >
          <div id="video-comment-container" className=" h-[1000px] basis-[70%]">
            <Video src={video?.videoFile} thumbnail={video?.thumbnail} />
          </div>
         <div className=" basis-[29%] ">
            <h1 className="text-white text-center font-bold text-xl">{`More From ${video?.owner?.username}`}</h1>
         <div
            id="more-video-container"
            className="  flex flex-col gap-4 pt-3"
          >
            {videos.map((item) => (
              <div
                className="cursor-pointer  w-full h-[100px] flex flex-row gap-[1%]"
                onClick={(e) => {
                  e.stopPropagation();
                  const videoId = item._id;
                  const ownerId = item?.owner?._id;
                  navigate(`/watch/${videoId}/${ownerId}`);
                }}
              >
                <div className=" basis-[45%] h-full object-cover  relative">
                  <img
                    src={item.thumbnail}
                    className="w-full h-full rounded-xl "
                  />
                  <span className="text-sm rounded-lg text-white py-1 px-2 bg-black absolute bottom-1 right-1">
                    {formatDuration(item.duration)}
                  </span>
                </div>
                <div className=" h-full basis-[54%]">
                  <h2 className="text-white font-medium line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-[#AAAAAA]">{item.owner.username}</p>
                  <p className="text-[#AAAAAA] text-[14px]">
                    {`${item.views} views . ${timeAgo(item.createdAt)} `}
                  </p>
                </div>
              </div>
            ))}
          </div>
         </div>
        </div>
      </div>
    </>
  );
};
