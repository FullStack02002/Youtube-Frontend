import React, { useEffect } from "react";
import { Navbar, Button } from "../components/";
import { useSelector, useDispatch } from "react-redux";
import {
  getChannelStats,
  getChannelVideos,
  makeChannelVideosEmpty,
} from "../store/Slices/dashboardSlice";

import {
  MdOutlineSlowMotionVideo,
  FaRegEye,
  RxAvatar,
  FaRegHeart,
} from "../components/icons";
import DashboardVideoTable from "../components/DashboardVideoTable";

const Collections = () => {
  const username = useSelector((state) => state?.auth?.userData?.username);
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard?.channelStats);
  const videos = useSelector((state) => state?.dashboard?.channelVideos);

  useEffect(() => {
    dispatch(getChannelStats());
    dispatch(getChannelVideos());

    return () => {
      dispatch(makeChannelVideosEmpty());
    };
  }, [dispatch]);
  return (
    <>
      <Navbar />

      <div id="container" className="  sm:px-2 pt-4">
        {/* dashboard header */}
        <div className=" flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          {/* username */}
          <div>
            <h1 className="text-white font-bold text-xl sm:text-2xl">{`Welcome Back,${username}`}</h1>
            <p className="text-xs font-light text-slate-400">
              Seamless Video Management,Elevated Results.
            </p>
          </div>

          <div>
            <Button
              className="bg-purple-500 p-1 sm:p-2 font-semibold text-black hover:scale-110 duration-100 ease-in"
              type="button"
            >
              Upload Video
            </Button>
          </div>
        </div>

        {/* channel stats */}

        <section className="grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2 mt-5">
          <div className="border border-slate-500 sm:p-3 p-2">
            <MdOutlineSlowMotionVideo
              className="text-purple-500 mb-2"
              size={30}
            />
            <p className="text-white">Total Videos</p>
            <span className="font-bold text-2xl  text-white">
              {dashboard?.totalVideos}
            </span>
          </div>
          <div className="border border-slate-500 sm:p-3 p-2">
            <FaRegEye className="text-purple-500 mb-2" size={30} />
            <p className="text-white">Total Views</p>
            <span className="font-bold text-2xl text-white">
              {dashboard?.totalViews}
            </span>
          </div>
          <div className="border border-slate-500 sm:p-3 p-2">
            <RxAvatar className="text-purple-500 mb-2" size={30} />
            <p className="text-white">Total subscribers</p>
            <span className="font-bold text-2xl text-white">
              {dashboard?.totalSubscribers}
            </span>
          </div>
          <div className="border border-slate-500 sm:p-3 p-2">
            <FaRegHeart className="text-purple-500 mb-2" size={30} />
            <p className="text-white">Total likes</p>
            <span className="font-bold text-2xl text-white">
              {dashboard?.totalLikes}
            </span>
          </div>
        </section>

        {/* table for managing channel videos */}
        <section className="mx-auto w-full overflow-x-scroll">
          <table className="min-w-full border border-slate-500">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Toggle Publish
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white ">
                  Uploaded
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Toggle CommentSection
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Date Uploaded
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {videos?.map((video) => (
                <DashboardVideoTable
                  key={video?._id}
                  videoId={video?._id}
                  isPublished={video?.isPublished}
                  commentSection={video?.commentSection}
                  createdAt={video?.createdAt}
                  title={video?.title}
                />
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Collections;
