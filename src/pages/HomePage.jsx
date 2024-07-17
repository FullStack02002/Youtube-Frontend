import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoCard } from "../components";
import { HomePageSkeleton } from "../skeletons";

export const HomePage = () => {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);

  useEffect(() => {
    const timeoutId=setTimeout(() => {
      setLoad(false);
    }, 1000);
    if (!videos || videos.length === 0) {
      dispatch(getAllVideos({}));
    }
    return () => {
      clearTimeout(timeoutId)
      dispatch(makeVideosNull());
    };
  }, [dispatch]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Navbar />
        <Sidebar />
        <div
          id="video-container"
          className="  w-full sm:w-[92%]  sm:ml-[123px] xl:ml-[226px] sm:p-[16px] flex flex-col gap-10  sm:flex sm:flex-row flex-wrap  sm:gap-5 lg:gap-10 xl:gap-4 "
        >
          {load || loading
            ? videos.map((_, index) => <HomePageSkeleton key={index} />)
            : videos.map((video) => (
                <VideoCard
                  key={video._id}
                  title={video.title}
                  avatar={video.owner?.avatar}
                  thumbnail={video.thumbnail}
                  createdAt={video.createdAt}
                  views={video.views}
                  channel={video.owner?.username}
                  videoId={video._id}
                  duration={video.duration}
                />
              ))}
        </div>
      </div>
    </>
  );
};
