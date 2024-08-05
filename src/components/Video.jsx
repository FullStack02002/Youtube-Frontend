import React from 'react'

export const Video = ({src,thumbnail}) => {
  return (
    <video
                src={src}
                poster={thumbnail}
                // autoPlay
                controls
                playsInline
                className="  sm:h-[250px] md:h-[460px] w-full object-cover lg:rounded-xl"
            ></video>
  )
}
