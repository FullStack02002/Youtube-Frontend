import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeVideosEmpty } from '../store/Slices/playlistSlice'
import { useSelector,useDispatch } from 'react-redux'
import { getPlaylistById } from '../store/Slices/playlistSlice'
import PlaylistandLikedVideo from '../components/PlaylistandLikedVideo'

const Playlist = () => {
    const dispatch=useDispatch();
    const {playlistId}=useParams();
    const videos=useSelector((state)=>state?.playlist?.videos);
    const thumbnail=videos.length>0 &&  videos[0]?.video?.thumbnail;
    const totalVideos=videos && videos.length;
    const PlaylistName=useSelector((state)=>state?.playlist?.PlaylistName)
    const user=useSelector((state)=>state?.auth?.userData);

    useEffect(()=>{
        dispatch(getPlaylistById({playlistId}))

        return ()=>{
            dispatch(makeVideosEmpty())
        }


    },[])



  return (
    <PlaylistandLikedVideo
        bgImage={thumbnail}
        fullName={user?.fullName}
        videolength={totalVideos}
        Videos={videos}
        Playlist="true"
        Text={PlaylistName}
    />
  )
}

export default Playlist