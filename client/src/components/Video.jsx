import { useEffect, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react"

export default function Video () {

  const vid = useRef(null);
  const [isCameraOn, setCameraOn] = useState(false);

  const handleLoadedMetaData = useCallback( e =>{
    e.target.play();
  }, [])

  const toggleCameraOn = useCallback(()=>setCameraOn(prev => !prev), [])

  useEffect(()=>{
    const mediaDevices = navigator.mediaDevices;
    const vidHtml = vid.current
    mediaDevices.getUserMedia({video: true}).then(stream => {
      if(isCameraOn)
        vidHtml.srcObject = stream;
      else
        vidHtml.srcObject = undefined;
    })
    return () => vid.srcObject = undefined;
  }, [isCameraOn])


  return (
    <div className="text-white border border-white" >
      <video className="-scale-x-100"  ref={vid} onLoadedMetadata={handleLoadedMetaData} />
      <button onClick={toggleCameraOn}>{`${isCameraOn}`}&nbsp;{isCameraOn ? "Turn Camera Off" : "Turn Camera On"}</button>
    </div>
  )
}