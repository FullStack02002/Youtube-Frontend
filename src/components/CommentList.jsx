import React, { useState, useEffect, useRef } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { BsThreeDotsVertical, MdDelete, MdEdit } from "./icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteAComment, editAComment } from "../store/Slices/commentSlice";
import { BsEmojiGrin } from "./icons";
import { Button } from "./Button";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const CommentList = ({
  avatar,
  username,
  createdAt,
  content,
  ownersId,
  commentId,
  videoOwner,
}) => {
  const user = useSelector((state) => state.auth?.userData);
  const [text, setText] = useState(content);
  const [openPicker, setopenPicker] = useState(false);
  const [open, setopen] = useState(false);
  const[openEdit,setopenEdit]=useState(false);
  const[textAreaOpen,setTextAreaOpen]=useState(false);
  const dispatch = useDispatch();
  const isOwner = user?._id === ownersId;
  const isvideoOwner = videoOwner === user?._id;
  const textareaRef = useRef(null);
  const isCommentButtonActive = text.trim().length > 0;


  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      const handleInput = () => {
        textarea.style.height = "auto"; // Reset height to auto to shrink if needed
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
      };

      textarea.addEventListener("input", handleInput);

      // Initial adjustment in case of pre-filled content
      handleInput();

      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }
  }, [text]);
  const handleChange=(e)=>{
    setText(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(editAComment({content:text,commentId,avatar,username,_id:ownersId,createdAt}))

  }

  return (
    <>
    {/* comment*/}
      <div className={`${openEdit?"hidden":"block"} flex flex-row w-full  gap-4 p-[10px]`}>
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
        <div
          className={`cursor-pointer ${
            isOwner || isvideoOwner ? "block" : "hidden"
          } relative`}
        >
          <BsThreeDotsVertical
            color="white"
            onClick={(e) => {
              e.stopPropagation();
              setopen((prev) => !prev);
            }}
          />
          <div
            className={`${
              open ? "block" : "hidden"
            } z-10 w-[130px] border bg-[#272727] absolute rounded-xl top-5 flex flex-col gap-2 p-2`}
          >
            <div
              className={`${
                isOwner ? "block" : "hidden"
              } flex items-center gap-2  text-white hover:text-purple-500`}
              onClick={(e)=>{
                e.stopPropagation();
                setopenEdit((prev)=>!prev);
              }}
            >
              <MdEdit className="w-[24px] h-[24px]" />
              <span>Edit</span>
            </div>
            <div
              className="flex items-center gap-2 text-white hover:text-purple-500"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteAComment({ commentId }));
              }}
            >
              <MdDelete className="w-[24px] h-[24px]" />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>


      {/* textarea when edit button is clicked */}
      <div className={`w-full  flex flex-row mt-[20px] gap-4 ${openEdit?"block":"hidden"}`}>
        <div>
          <img
            src={avatar}
            className={`w-[40px] h-[40px] rounded-full`}
          />
        </div>
        <div className="basis-[94%] ">
          <form onSubmit={handleSubmit}>
            <textarea
              className="text-no-resize w-full text-white outline-none  bg-[#0F0F0F] min-h-[50px] border-b border-b-[#AAAAAA] placeholder-gray-400"
              placeholder="Edit A Comment..."
              ref={textareaRef}
              onClick={(e) => {
                e.stopPropagation();
                setTextAreaOpen(true);
              }}
              value={text}
              onChange={handleChange}
            />
            <div
              className={`${
                textAreaOpen ?"block":"hidden"
              } w-full  flex flex-row justify-between p-[10px] items-center`}
            >
              {/* emoji picker */}
              <div className="cursor-pointer">
                <BsEmojiGrin
                  color="white"
                  className="font-bold h-[20px] w-[20px] relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    setopenPicker((prev) => !prev);
                  }}
                />
                <div
                  className={`z-10 absolute ${
                    openPicker ? "block" : "hidden"
                  } `}
                >
                  <Picker
                    data={data}
                    onEmojiSelect={(e) => {
                      setText((prev) => prev + e.native);
                      // setopenPicker((prev)=>!prev);
                    }}
                  />
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-row gap-2">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setTextAreaOpen(false);
                    setopenEdit(false);

                  }}
                >
                  <Button className="font-semibold  p-[10px] w-[75px] rounded-full  text-[14px] hover:bg-[#222222]">
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    className={`font-semibold  p-[10px] w-[85px] rounded-full  text-[14px]${
                      isCommentButtonActive
                        ? " text-white bg-purple-500"
                        : " text-gray-500 bg-[#272727]"
                    }  `}
                    type="submit"
                    isActive={!isCommentButtonActive}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
