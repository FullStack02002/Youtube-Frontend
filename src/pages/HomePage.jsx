import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoCard } from "../components";
import { HomePageSkeleton } from "../skeletons";

export const HomePage = () => {
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetching, setisFetching] = useState(true);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoad(false);
    }, 1000);
    if (!videos || videos.length === 0) {
      dispatch(getAllVideos({}));
    }
    return () => {
      clearTimeout(timeoutId);
      dispatch(makeVideosNull());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasNextPage
      ) {
        setisFetching(true);
        dispatch(getAllVideos({ page: page + 1 })).then(() => {
          setisFetching(false);
          setPage((prev) => prev + 1);
        });
      }
    };
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [dispatch, loading, hasNextPage, page]);

  useEffect(() => {
    if (!loading && isFetching) {
      const timeoutId = setTimeout(() => {
        setisFetching(false);
      }, 4000); // Ensuring the loader hides after 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [loading, isFetching]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <Navbar />
        <Sidebar />
        <div
          id="video-container"
          className="  w-full sm:w-[85%]  sm:ml-[123px] xl:ml-[226px] sm:p-[16px] flex flex-col gap-2  sm:flex sm:flex-row  flex-wrap  sm:gap-5 lg:pl-[40px] lg:gap-19 xl:gap-4 xl:pt-[16px] xl:p-[0] xl:pl-[15px]"
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
          {isFetching &&
            Array.from({ length: 6 }, (_, index) => (
              <HomePageSkeleton key={`loading-skeleton-${index}`} />
            ))}
        </div>
      </div>
    </>
  );
};
