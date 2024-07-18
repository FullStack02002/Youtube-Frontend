import React, { useEffect } from "react";
import { Navbar, Sidebar, SearchVideoCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";

export const SearchPage = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos?.docs);

  useEffect(() => {
    dispatch(getAllVideos({ query }));
    return () => {
        dispatch(makeVideosNull());
        console.log("triggered")
    }
  }, [dispatch,query]);

  return (
   
      <div
        id="search-container"
        className="flex flex-col gap-1 sm:gap-3"
      >
        {videos.map((items) => (
          <SearchVideoCard
            duration={items.duration}
            thumbnail={items.thumbnail}
            username={items.owner.username}
            description={items.description}
            createdAt={items.createdAt}
            avatar={items.owner.avatar}
            key={items._id}
            title={items.title}
            videoId={items._id}
            views={items.views}

          />
        ))}
      </div>
    
  );
};
