'use client'
import React, { useCallback, useMemo, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import TextUpdaterNode from './CustomNodeExemple'; 
import CustomEdge from './CustomEdge';
const initialNodes = [
];
const initialEdges = [
];




const Canvas = ({cards,setCards, selectedCardId, setSelectedCardId, setNewVideoId, newVideoId, setNextCardSelector}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
    const edgeTypes = useMemo(() => ({ 'customEdge': CustomEdge }), []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
      );

      useEffect(() => {
        
        if(cards.length){
          setEdges([]);
            cards.forEach((card,cardIndex) => {
              console.log(card);
              console.log(card.position);
                setNodes((nds) => [...nds,
                  { id: `${cardIndex}`, type: 'textUpdater'  ,
                   position: {x:card.position.x,y:card.position.y}, data: { card:card, cardIndex:cardIndex,setSelectedCardId:setSelectedCardId,selectedCardId: selectedCardId , setNewVideoId:setNewVideoId, newVideoId:newVideoId, setNextCardSelector:setNextCardSelector},
                   
                    
                  }
                ])
                
                card.options.forEach((option,optionIndex) => {
                    if(!option.external && cards[parseInt(option.destination)]){
                        setEdges((eds) => addEdge({source:`${cardIndex}`,target:option.destination}, eds))
                    }
                })
            })
        }
      }, [cards])

      useEffect(()=>{
        setNodes(prevNodes =>{
          const newNodes=prevNodes.map(node=>{
            return {...node, data:{...node.data, selectedCardId:selectedCardId}}
          });
          return newNodes;
        })
      },[selectedCardId,cards])
      const onNodeDragStop = useCallback((event, node) => {
        // Update the card's position in your state here
        const updatedCards = cards.map((card, index) => {
            if (index.toString() === node.id) {
                return { ...card, position: node.position };
            }
            return card;
        });
        // Assuming you have a method to update cards
        setCards(updatedCards);
    }, [cards, setCards]);


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges.map(edge => ({ ...edge, type: 'customEdge', style: { stroke: 'black', strokeWidth: 2 } }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
      />
  </div>
  )
}

export default Canvas