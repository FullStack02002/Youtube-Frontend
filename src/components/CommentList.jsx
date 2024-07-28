import React, { useState,useEffect } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { BsThreeDotsVertical, MdDelete, MdEdit } from "./icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteAComment,editAComment } from "../store/Slices/commentSlice";

export const CommentList = ({
  avatar,
  username,
  createdAt,
  content,
  ownersId,
  commentId,
  
}) => {
  const user=useSelector((state)=>state.auth?.userData);
    
    const [open,setopen]=useState(false);
  const dispatch = useDispatch();
  const isOwner=user?._id===ownersId;
  


  return (
    <div className="flex flex-row w-full  gap-4 p-[10px]">
      <div>
        <img src={avatar} className="w-[40px] h-[40px] rounded-full" />
      </div>
      <div className="basis-[94%]">
        <div className="flex flex-row gap-1">
          <h3 className="text-white font-bold text-[14px]">@{username}</h3>
          <span className="text-[#AAAAAA] text-[14px]">
            {timeAgo(createdAt)}
          </span>
        </div>
        <p className="text-white font-semibold mt-[5px]">{content}</p>
      </div>
      <div className={`cursor-pointer ${isOwner ? "block" : "hidden"} relative`}>
        <BsThreeDotsVertical color="white" onClick={(e)=>{
            e.stopPropagation();
            setopen((prev)=>!prev);
        }} />
        <div className={`${open?"block":"hidden"} z-10 w-[130px] border bg-[#272727] absolute rounded-xl top-5 flex flex-col gap-2 p-2`}>
          <div className="flex items-center gap-2  text-white hover:text-purple-500">
            <MdEdit className="w-[24px] h-[24px]" />
            <span>Edit</span>
          </div>
          <div className="flex items-center gap-2 text-white hover:text-purple-500" onClick={(e)=>{
            e.stopPropagation();
            dispatch(deleteAComment({commentId}));
          }}>
            <MdDelete className="w-[24px] h-[24px]" />
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};
