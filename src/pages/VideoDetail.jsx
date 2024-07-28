import React, { useEffect, useRef } from "react";
import {
  Navbar,
  Video,
  Description,
  TextArea,
  CommentList,
} from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";
import { formatDuration } from "../helpers/formatDuration";
import {
  getVideoComments,
  makeCommentsEmpty,
} from "../store/Slices/commentSlice";
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
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const comments = useSelector((state) => state.comment?.comments);


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getVideoById({ videoId }));
    dispatch(getVideoComments({ videoId }));
    dispatch(getAllVideos({ userId }));
    return () => {
      dispatch(makeVideoNull());
      dispatch(makeVideosNull());
      dispatch(makeCommentsEmpty());
    };
  }, [dispatch, videoId, userId]);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto">
        <div
          id="container"
          className="   mt-[20px] ml-[60px] mr-[60px] flex flex-row gap-[1%]"
        >
          <div id="video-comment-container" className="  basis-[70%]">
            {/* video player */}
            <Video src={video?.videoFile} thumbnail={video?.thumbnail} />

            {/* video title */}
            <h1 className="text-white font-bold text-xl mt-2">
              {video?.title}
            </h1>

            {/* description */}
            <Description
              channelId={video?.owner?._id}
              avatar={video?.owner?.avatar}
              username={video?.owner?.username}
              subscribersCount={video?.owner?.subscribersCount}
              isSubscribed={video?.owner?.isSubscribed}
              isLiked={video?.isLiked}
              likesCount={video?.likesCount}
              videoId={video?._id}
              views={video?.views}
              createdAt={video?.createdAt}
              Description={video?.description}
            />

            {/* comment section */}
            <div className="w-full  mt-[40px] ">
              <div>
                <p className="text-white text-xl font-semibold">
                  {totalComments} Comments
                </p>
              </div>

              {/* Add a Comment Text Area */}

              <TextArea
                comment={true}
                videoId={video?._id}
                avatarHeight={"40px"}
                avatarWidth={"40px"}
              />

              {/* comment list */}
              <div className="w-full  mt-[20px]  flex flex-col gap-2">
                {comments.map((comment) => (
                  <CommentList
                    key={comment?._id}
                    avatar={comment?.owner?.avatar}
                    username={comment?.owner?.username}
                    content={comment?.content}
                    createdAt={comment?.createdAt}
                    ownersId={comment?.owner?._id}
                    commentId={comment?._id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* more videos container */}
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
