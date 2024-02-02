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
import Modal from 'react-modal';
import { Space } from "react-zoomable-ui";
const Canvas = (props) => {
    const [wires, setWires] = useState([]);
    const [showComponent, setShowComponent] = useState(true);

    // useEffect(() => { 
    //     const timeout = setTimeout(() => { 
    //       setShowComponent(true); 
    //     }, 3000); 
     
    //     return () => clearTimeout(timeout); 
    //   }, [props.cards]); 

      useEffect(() => {
        
      
        if(props.cards.length){
            let allWires = [];
            props.cards.forEach((card,cardIndex) => {
                card.options.forEach((option,optionIndex) => {
                    if(!option.external && props.cards[option.destination]){
                        
                        allWires.push({start:`${cardIndex}`,end:option.destination});
                    }
                })
            })
            setWires(allWires);
            const firstCard = document.getElementById('0');
            if(firstCard){
                firstCard.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
            }
        }
        
      }, [props.cards])

    // layout is an array of objects, see the demo for more complete usage
    return (
        <Xwrapper>
                    
            <MapCards cardId={0} user={props.user} projectName={props.projectName}
             setWires={setWires} selectedCardId={props.selectedCardId}
             setSelectedCardId={props.setSelectedCardId} 
             newVideoId={props.newVideoId} setNewVideoId={props.setNewVideoId}
             cards={props.cards} setCards={props.setCards} setNextCardSelector={props.setNextCardSelector}
             
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


const DraggableBox = ({id,options,title,overlay,videosrc,selectedCardId,newVideoId,setNewVideoId,setSelectedCardId,setCards,setNextCardSelector}) => {
  const updateXarrow = useXarrow();
  if(newVideoId==id) {
    setNewVideoId(-1);

}
  return (
      <Draggable onDrag={updateXarrow} onStop={updateXarrow}  >
          <div  className="w-fit h-fit" onClick={selectedCardId==id ? null : ()=>{ 
                setSelectedCardId(id);
                const card = document.getElementById(id);
                if(card){
                    card.scrollIntoView({behavior: "smooth", block: "end", inline: "center"});
                }
                
          }}>
          <ScenarioPiece  options={options} title={title} overlay={overlay} id={id}
           videosrc={videosrc} enabled={selectedCardId==id} newVideoId={newVideoId} setSelectedCardId={setSelectedCardId} setNewVideoId={setNewVideoId} 
            nextClick={()=>{
                setNextCardSelector(true);
            }}
            />
            
          </div>

      </Draggable>
  );
};

const MapCards=({cardId,user, projectName,setWires, selectedCardId,setSelectedCardId, newVideoId, setNewVideoId, cards, setCards, setNextCardSelector})=>{
    console.log('Cards : ', cards);
    console.log('Card data :', cards[cardId]);
    return cards[cardId] ?(
        <div className="flex flex-col  w-fit items-center gap-20">
                        <DraggableBox id={cardId}
                         options={cards[cardId].options}
                           title={cards[cardId].title}
                             overlay={cards[cardId].overlay}
                             videosrc={cards[cardId].videosrc}
                             selectedCardId={selectedCardId}
                             setSelectedCardId={setSelectedCardId}
                             newVideoId={newVideoId} setNewVideoId={setNewVideoId} setCards={setCards}
                             setNextCardSelector={setNextCardSelector}
                             />
                                
                             <div className="flex flex-row w-full justify-evenly gap-20">
                             
                                {cards[cardId].options.map((option) => {

                                    if(!option.external)
                                    {
                                    

                                        return (
                                            <MapCards key={option.destination} cardId={parseInt(option.destination)}
                                            setWires={setWires}
                                            user={user} projectName={projectName} selectedCardId={selectedCardId}
                                            setSelectedCardId={setSelectedCardId}
                                            newVideoId={newVideoId} setNewVideoId={setNewVideoId}
                                            cards={cards} setCards={setCards} setNextCardSelector={setNextCardSelector}
                                            />
                                            
                                        )
                                    }
                                    else return null;
                                })}

                             </div>

        </div>
    ) : null


}