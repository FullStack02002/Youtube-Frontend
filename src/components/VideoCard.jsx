import React, { useEffect, useRef, useState } from "react";
import { formatDuration } from "../helpers/formatDuration";
import { timeAgo } from "../helpers/timeAgo";
import { useNavigate } from "react-router-dom";
import {
  BsThreeDotsVertical,
  MdSaveAlt,
  IoCloseCircleOutline,
  FaPlus,
} from "../components/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  createPlaylist,
} from "../store/Slices/playlistSlice";
export const VideoCard = ({
  title,
  thumbnail,
  videoId,
  avatar,
  duration,
  channel,
  views,
  createdAt,
  ownerId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [playlistPopOpen, setplaylistPopOpen] = useState(false);
  const [openList, setopenList] = useState(false);
  const [checkedPlaylists, setCheckedPlaylists] = useState({});
  const [openInput, setopenInput] = useState(false);
  const [Text, setText] = useState("");
  const inputRef = useRef(null);

  const playlists = useSelector((state) => state.playlist?.playlists);
  const isAuth = useSelector((state) => state.auth?.status);

  // to check is video is present in particular playlist
  const isVideoPresent = (playlistId) => {
    return checkedPlaylists[playlistId] || false;
  };

  // to check initial checked
  useEffect(() => {
    if (playlists) {
      const initialCheckedState = {};
      playlists.forEach((playlist) => {
        initialCheckedState[playlist._id] = playlist.videos.some(
          (video) => video._id === videoId
        );
      });
      setCheckedPlaylists(initialCheckedState);
    }
  }, [playlists, videoId]);

  // to focus input
  useEffect(() => {
    if (openInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openInput]);

  // to handle change of checkbox
  const handleChange = (playlistId, isChecked, PlaylistName) => {
    if (isChecked) {
      dispatch(addVideoToPlaylist({ videoId, playlistId, PlaylistName }));
    } else {
      dispatch(deleteVideoFromPlaylist({ playlistId, videoId, PlaylistName }));
    }
    setCheckedPlaylists((prev) => ({
      ...prev,
      [playlistId]: isChecked,
    }));
  };

  const handleCreatePlaylist = async () => {
    const resultAction = await dispatch(createPlaylist(Text));
    console.log(resultAction);
    if (resultAction.type === "createPlaylist/fulfilled") {
      const newPlaylist = resultAction.payload;
      dispatch(
        addVideoToPlaylist({
          videoId,
          playlistId: newPlaylist._id,
          PlaylistName: newPlaylist.name,
        })
      );
      setopenList(false);
      setopenInput(false);
      setplaylistPopOpen(false);
      setText("");
      const playlistId = newPlaylist._id;
      setCheckedPlaylists((prev) => ({
        ...prev,
        [playlistId]: true,
      }));
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/watch/${videoId}/${ownerId}`);
        }}
        className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] "
      >
        <div id="thumbnail-container" className="relative">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-[224px] sm:rounded-xl"
          />
          <span className="text-sm rounded-lg text-white py-1 px-2 bg-black absolute bottom-2 right-2">
            {formatDuration(duration)}
          </span>
        </div>
        <div
          id="content-container"
          className="mt-3 flex flex-row gap-4 items-center"
        >
          <div id="avatar">
            <img
              src={avatar}
              className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0"
            />
          </div>
          <div id="content" className="w-[80%] ">
            <h2 className="text-white font-bold text-[15px] lg:text-[16px] line-clamp-2">
              {title}
            </h2>
            <div className="text-[#AAAAAA]">
              <h2 className="text-[15px] lg-text[12px] truncate">{channel}</h2>
              <span className="text-[13px] lg:text-[16px]">{`${views} views. ${timeAgo(
                createdAt
              )}`}</span>
            </div>
          </div>
        </div>
        {/* three dots for opening save to playlist */}
        <BsThreeDotsVertical
          className={` ${
            isAuth ? "block" : "hidden"
          } text-white absolute bottom-[80px] right-0 cursor-pointer `}
          onClick={(e) => {
            e.stopPropagation();
            if (!openList) {
              setplaylistPopOpen((prev) => !prev);
            }
          }}
        />

        {/* div opens when three dots gets clicked */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={` ${
            playlistPopOpen ? "block" : "hidden"
          } absolute w-[253px]  z-10 bg-[#272727] rounded-xl bottom-[18px] right-[10px] pt-3 pb-3`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setopenList((prev) => !prev);
              setplaylistPopOpen(false);
            }}
            className=" flex flex-row justify-center gap-5 hover:text-purple-500 text-white pt-2 pb-2"
          >
            <div>
              <MdSaveAlt size={24} />
            </div>
            <p>Save to playlist</p>
          </div>
        </div>

        {/* div opens when save to playlist gets clicked */}
        <div
          className={`${
            openList ? "block" : "hidden"
          }  w-[200px]  absolute right-[10px] bottom-[18px] z-10 bg-[#272727] rounded-xl  p-5 `}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1 className="text-white font-bold">Save video to...</h1>

          {playlists.map((item) => {
            return (
              <div
                key={item?._id}
                className="mt-5 flex flex-row gap-4 items-center"
              >
               
                <input
                  type="checkbox"
                  checked={isVideoPresent(item?._id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleChange(item?._id, e.target.checked, item.name);
                  }}
                  className="w-[20px] h-[20px] outline-none cursor-pointer text-[#272727]"
                  id={item?._id}
                />
                 <label htmlFor={item?._id} className="cursor-pointer">
                  <h1 className="text-white hover:text-purple-500 line-clamp-1">
                    {item.name}
                  </h1>
                </label>
              </div>
            );
          })}

          {/*cross button  */}

          <IoCloseCircleOutline
            onClick={(e) => {
              e.stopPropagation();
              setopenList(false);
              setopenInput(false);
            }}
            className="text-white absolute top-5 hover:text-purple-500 right-2"
            size={24}
          />

          {/* create new playlist */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setopenInput(true);
            }}
            className={` ${
              openInput ? "hidden" : "block"
            }  mt-4 flex flex-row gap-4  items-center`}
          >
            <FaPlus className="text-white hover:text-purple-500" size={20} />
            <span className="text-white hover:text-purple-500 text-[14px] font-semibold">
              Create new playlist
            </span>
          </div>

          {/* Input to create new playlist  */}

          <div className={`${openInput ? "block" : "hidden"} mt-4`}>
            <label htmlFor="1" className="text-white font-semibold">
              Name
            </label>
            <input
              ref={inputRef}
              value={Text}
              type="text"
              id="1"
              placeholder="Enter playlist title..."
              className="text-white w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none transition-colors bg-[#272727] placeholder:text-white"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div
              className="mt-4 text-purple-500"
              onClick={(e) => {
                e.stopPropagation();
                handleCreatePlaylist();
              }}
            >
              <p className="text-end">Create</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
