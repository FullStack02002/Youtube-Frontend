import React, { useEffect } from "react";
import { Navbar, Video, Button } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";
import { formatDuration } from "../helpers/formatDuration";
import { BiSolidLike, BiSolidDislike } from "../components/icons";
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
            <h1 className="text-white font-bold text-xl mt-2">
              {video?.title}
            </h1>
            <div className=" w-full flex flex-row justify-between pt-[10px] pb-[10px] border">
              <div className="flex flex-row gap-4">
                <div>
                  <img
                    src={video?.owner?.avatar}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-col ">
                  <h2 className="text-white font-bold">
                    {video?.owner?.username}
                  </h2>
                  <p className="text-[#AAAAAA] text-[14px]">{`${video?.owner?.subscribersCount} subscribers`}</p>
                </div>
                <div className="mt-[6px]">
                  <Button className="text-white font-bold text-[14px] bg-purple-500 border-none outline-none h-[36px]  w-[95px] rounded-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" basis-[29%] ">
            <h1 className="text-white text-center font-bold text-xl">{`More From ${video?.owner?.username}`}</h1>
            <div
              id="more-video-container"
              className="  flex flex-col gap-4 pt-3"
            >
              {videos.map((item) => (
                <div
                  className="cursor-pointer  w-full h-[100px] flex flex-row gap-[3%]"
                  onClick={(e) => {
                    e.stopPropagation();
                    const videoId = item._id;
                    const ownerId = item?.owner?._id;
                    navigate(`/watch/${videoId}/${ownerId}`);
                  }}
                  key={item._id}
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
                  <div className=" h-full basis-[52%]">
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
