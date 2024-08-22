import React,{useState, useRef , useEffect} from 'react'

const VideoCard = (props) => {
    const [length, setLength] = useState("");
    const videoRef = useRef(null);
    
    useEffect(() => {
        if (videoRef.current) {
          const video = videoRef.current;
    
          video.addEventListener("loadedmetadata", () => {
            const mins = Math.floor(video.duration / 60);
            const secs = video.duration % 60;
    
            const formattedMins = mins < 10 ? `0${mins.toFixed(0)}` : mins.toFixed(0);
            const formattedSecs = secs < 10 ? `0${secs.toFixed(0)}` : secs.toFixed(0);
            setLength(`${formattedMins}:${formattedSecs}`);
          });
        }
      }, [videoRef]);
    
    

  return (
<div className="w-[243px] h-[241.50px] bg-white rounded-lg flex-col justify-start items-start inline-flex  overflow-hidden" onClick={props.onClick}>
    <div className="w-[243px] h-[130px] relative rounded-tl-lg rounded-tr-lg ">
        <div className='bg-black h-[130px] overflow-hidden flex items-center justify-center'>
        <video src={props.videoURL} ref={videoRef}  className=' hover:opacity-40 object-fit h-[130px]'></video>
        </div>
        <div className="w-[30px] px-1 py-0.5 left-[205px] top-[106px] absolute bg-black bg-opacity-50 rounded-sm justify-center items-center inline-flex ">
            <div className="text-white text-[10px] font-medium leading-3">{length}</div>
        </div>
    </div>
    <div className="self-stretch h-[111.50px] p-4 flex-col justify-center items-start gap-3 flex">
        <div className="self-stretch text-zinc-950 text-sm font-bold leading-[18px]">{props.videoTitle}</div>
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="text-neutral-500 text-xs font-medium leading-[14px]">{props.Owner}</div>
            <div className="w-[86.41px] h-[14.50px] text-zinc-500 text-xs font-medium leading-[14px]">{new Date(props.creationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div className="h-[23px] p-1 bg-neutral-200 rounded justify-center items-center gap-1 inline-flex">
            <div className="h-2.5 justify-center items-start flex">
                <div className="h-2.5 p-[0.57px] justify-start items-start flex" />
            </div>
            <div className="text-zinc-950 text-xs font-medium">Label</div>
        </div>
    </div>
</div>
  )
}

export default VideoCard