'use client'
import ScenarioPiece from "./ScenarioPiece";
import ResponsiveGridLayout from 'react-grid-layout';
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import { Xwrapper, useXarrow} from "react-xarrows";
import Xarrow from "react-xarrows";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
const Canvas = (props) => {
    const [wires, setWires] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    useEffect(() => { 
        const timeout = setTimeout(() => { 
          setShowComponent(true); 
        }, 3000); 
     
        return () => clearTimeout(timeout); 
      }, []); 

    // layout is an array of objects, see the demo for more complete usage
    return (
        <Xwrapper>
            <MapCards cardId={'0'} user={props.user} projectName={props.projectName}
             setWires={setWires} selectedCardId={props.selectedCardId}
             setSelectedCardId={props.setSelectedCardId} setOptions={props.setOptions} 
             setVideoURL={props.setVideoURL} setVideoName={props.setVideoName} 
             setOverlayText={props.setOverlayText} options={props.options}
             videoURL={props.videoURL} videoName={props.videoName} overlayText={props.overlayText}
             newVideoId={props.newVideoId} setNewVideoId={props.setNewVideoId}
             
             />
            {showComponent ?wires.map((wire,index) => {
                console.log('Card id : '+wire.start+' option id : '+wire.end);
                return (
                    <div className="relative" key={index}>
                        <Xarrow start={wire.start} end={wire.end} 
                        showHead={false} color="black"
                        startAnchor='bottom' endAnchor='top'
                        strokeWidth={2}
                        />
                    </div>
                )
            }) : null}
        </Xwrapper>
    )
}

export default Canvas;


const DraggableBox = ({id,options,prev,title,overlay,videosrc,selectedCardId,setSelectedCardId,setOptions,setVideoURL,setVideoName,setOverlayText, dynamicOptions, videoURL,videoName,overlayText, newVideoId,setNewVideoId}) => {
  const updateXarrow = useXarrow();
  const [videoSRC, setVideoSRC] = useState(videosrc);
  if(newVideoId==id) {

    setVideoSRC(videoURL);
    setNewVideoId(-1);

}
  return (
      <Draggable onDrag={updateXarrow} onStop={updateXarrow} >
          <div id={id} className="w-fit h-fit" onClick={selectedCardId==id ? null : ()=>{
            setSelectedCardId(id);
            setOptions(options);
            setVideoURL(videosrc);
            setVideoName(title);
            setOverlayText(overlay);

            
          }}>
          <ScenarioPiece  options={dynamicOptions} prev={prev} title={videoName} overlay={overlayText}
           videosrc={videosrc} enabled={selectedCardId==id} newVideoId={newVideoId} setNewVideoId={setNewVideoId} />
          </div>
      </Draggable>
  );
};

const MapCards=({cardId,user, projectName,setWires, selectedCardId,setSelectedCardId, setOptions,setVideoURL,setVideoName,setOverlayText, options, videoURL,videoName,overlayText, newVideoId, setNewVideoId})=>{
    const [card, setCard] = useState([]);

    useEffect(()=>{

        const fetchCard=async()=>{
            try {
                console.log('cardId : '+cardId+' user : '+user.uid+' projectName : '+projectName);
                const querySnapshot = await getDoc(doc(db, `scenarios/${user.uid}/folderless/${projectName}/cards/${cardId}`));
                console.log('card fetched : '+querySnapshot.data());
                if(querySnapshot.exists())
                setCard([querySnapshot.data()]);
                querySnapshot.data().options.map((option) => {
                    if(!option.external)
                    {
                        setWires((wires) => [...wires, {start:cardId,end:option.destination}]);
                    }
                })
            } catch (error) {
                console.error('Error fetching card:', error);
            }
        };

        if(user)
        fetchCard();
    },[user])

    useEffect(()=>{
        console.log('done rendering ?');
    },[])

    return card.length ?(
        <div className="flex flex-col  w-full items-center gap-20">
                        <DraggableBox id={cardId}
                         options={card[0].options}
                          prev={card[0].prev}
                           title={card[0].title}
                             overlay={card[0].overlay }
                             videosrc={card[0].videosrc}
                             selectedCardId={selectedCardId}
                             setSelectedCardId={setSelectedCardId}
                             setOptions={setOptions} setVideoURL={setVideoURL} setVideoName={setVideoName}
                             setOverlayText={setOverlayText} dynamicOptions={options}
                             videoURL={videoURL} videoName={videoName} overlayText={overlayText}
                             newVideoId={newVideoId} setNewVideoId={setNewVideoId}
                             />
                             <div className="flex flex-row w-full justify-evenly">
                                {card[0].options.map((option) => {

                                    if(!option.external)
                                    {

                                        return (
                                            <MapCards key={option.destination} cardId={option.destination} user={user} projectName={projectName} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId}
                                            
                                            setOptions={setOptions} setVideoURL={setVideoURL} setVideoName={setVideoName}
                                            setOverlayText={setOverlayText} options={options}
                                            videoURL={videoURL} videoName={videoName} overlayText={overlayText} 
                                            newVideoId={newVideoId} setNewVideoId={setNewVideoId}
                                            />
                                            
                                        )
                                    }
                                    else return null;
                                })}

                             </div>

        </div>
    ) : null


}