import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import ScenarioPiece from './ScenarioPiece';
 
const handleStyle = { left: 10 };
 
function TextUpdaterNode({ data}) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
            <Handle type="target" position={Position.Top} className=' opacity-0 '
            style={{
              border: 'none', 
              outline: 'none',
              width: '1px',
              height: '1px',
              background: 'transparent',
              position: 'absolute',
              top: '3.5%', // Adjust these values to position the handle
              left: '50%' // Adjust these values to position the handle
            }}
            isConnectable={false}
              />

      <div onClick={()=>{
        data.setSelectedCardId(data.cardIndex);
      }}>
    <ScenarioPiece options={data.card.options} title={data.card.title} 
    overlay={data.card.overlay} videosrc={data.card.videosrc} 
    enabled={data.selectedCardId==data.cardIndex} setSelectedCardId={data.setSelectedCardId}
    setNewVideoId={data.setNewVideoId} newVideoId={data.newVideoId}
    nextClick={()=>{
      data.setNextCardSelector(true);
    }}
    
    />
    
      </div>
      <Handle type="source" position={Position.Bottom} id="a" 
      style={{
        border: 'none', 
        outline: 'none',
        width: '1px',
        height: '1px',
        background: 'transparent',
        position: 'absolute',
        top: '99%', // Adjust these values to position the handle
        left: '50%' // Adjust these values to position the handle
      }} 
      isConnectable={false}
      />

    </>
  );
}

export default TextUpdaterNode;