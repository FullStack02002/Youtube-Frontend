import React from 'react'

export const Video = ({src,thumbnail}) => {
  return (
    <video
                src={src}
                poster={thumbnail}
                
                controls
                playsInline
                className="  h-[460px] w-full object-cover rounded-xl"
            ></video>
  )
}
