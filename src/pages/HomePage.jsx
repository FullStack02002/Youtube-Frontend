import React, { useCallback, useEffect, useState } from "react";
import { InfinitScroll, Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoCard } from "../components";
import { HomePageSkeleton } from "../skeletons";

export const HomePage = () => {
  const [page, setPage] = useState(1);
  const [isFetching, setisFetching] = useState(true);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);

  useEffect(() => {
    dispatch(getAllVideos({}));

    return () => {
      dispatch(makeVideosNull());
    };
  }, [dispatch]);



  const fetchMoreVideos=useCallback(()=>{
    if(hasNextPage){
      setisFetching(true);
      dispatch(getAllVideos({page:page+1})).then(()=>{
        setisFetching(false)
      });
      setPage((prev)=>prev+1);
    }

  },[page,hasNextPage,dispatch])

  useEffect(() => {
    if (!loading && isFetching) {
      const timeoutId = setTimeout(() => {
        setisFetching(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [loading, isFetching]);

  return (
    <>
      <InfinitScroll fetchMore={fetchMoreVideos} hasNextPage={hasNextPage}>
        <div
          id="video-container"
          className="   flex flex-col gap-2  sm:flex sm:flex-row  flex-wrap  sm:gap-5  lg:gap-4 xl:gap-4 "
        >
          {loading
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
                  ownerId={video.owner._id}
                />
              ))}
          {isFetching &&
            Array.from({ length: 6 }, (_, index) => (
              <HomePageSkeleton key={`loading-skeleton-${index}`} />
            ))}
        </div>
      </InfinitScroll>
    </>
  );
};
