import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoCard } from "../components";
import { HomePageSkeleton } from "../skeletons";

export const HomePage = () => {
  console.log("rendered");
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

    dispatch(getAllVideos({}));

    return () => {
      clearTimeout(timeoutId);
      dispatch(makeVideosNull());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
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
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [loading, isFetching]);

  return (
    <>
      <div
        id="video-container"
        className="   flex flex-col gap-2  sm:flex sm:flex-row  flex-wrap  sm:gap-5  lg:gap-4 xl:gap-4 "
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
    </>
  );
};
