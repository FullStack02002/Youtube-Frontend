import React, { useEffect } from "react";
import { Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoCard } from "../components";

export const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.videos?.docs);


  useEffect(() => {
    dispatch(getAllVideos({}));
    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  if (loading) {
    return <h1 className="text-white">Loading....</h1>;
  }
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Navbar />
        <Sidebar />
        <div
          id="video-container"
          className="  w-full sm:w-[92%]  sm:ml-[123px] xl:ml-[226px] sm:p-[16px] flex flex-col  sm:flex sm:flex-row flex-wrap  sm:gap-5 lg:gap-10 xl:gap-4 "
        >
        {videos.map((video) => (
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
