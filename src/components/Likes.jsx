import React, { useEffect, useState } from "react";
import { BiSolidLike, BiSolidDislike } from "../components/icons";
import {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  toggleReplyLike,
} from "../store/Slices/likeSlice";
import { useDispatch } from "react-redux";

export const Likes = ({
  videoId,
  tweetId,
  commentId,
  replyId,
  size,
  isLiked,
  likesCount,
}) => {
  const [localisLiked, setLocalisLiked] = useState(isLiked);
  const [localLikesCount, setlocalLikesCount] = useState(likesCount);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalisLiked(isLiked);
    setlocalLikesCount(Number(likesCount));
  }, [isLiked, likesCount]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (localisLiked) {
      setlocalLikesCount((prev) => prev - 1);
    } else {
      setlocalLikesCount((prev) => prev + 1);
    }
    setLocalisLiked(!localisLiked);
    if (videoId) {
      dispatch(toggleVideoLike({ videoId }));
    }
    if (tweetId) {
      dispatch(toggleTweetLike({ tweetId }));
    }
    if (commentId) {
      dispatch(toggleCommentLike({ commentId }));
    }
    if (replyId) {
      dispatch(toggleReplyLike({ replyId }));
    }
  };

  return (
    <>
      <div className={`${(commentId || replyId || tweetId)?" sm:gap-3 md:gap-6":"gap-3"} flex flex-row`}>
      <div
        className={`flex flex-row  cursor-pointer   ${(commentId || replyId || tweetId) ? "h-[25px]" :""} ${videoId?"border-r":""} gap-2 px-1 basis-[60%] ` }
        onClick={handleLike}
      >
        <BiSolidLike
          className={`${
            localisLiked ? "text-purple-500" : "text-white"
          } cursor-pointer`}
          size={size}
        />
        <span
          className={`text-white ${
            tweetId || commentId || replyId ? "text-[15px]" : ""
          }`}
        >
          {localLikesCount > 0 ? localLikesCount : ""}
          
        </span>
      </div>
      <div className="mt-[1px]">
      <BiSolidDislike className="text-white basis-[40%]" size={size} />

      </div>
      </div>


    </>
  );
};
