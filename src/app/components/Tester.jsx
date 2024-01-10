import React from 'react';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import Draggable from 'react-draggable';
import ScenarioPiece from './ScenarioPiece';


const DraggableBox = ({id}) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} >
            {/* <div id={id} className='h-[200px] w-[100px] border border-black ' onClick={()=>{
              console.log(id);
            }}>
                {id}
            </div> */}
            <div>
            <ScenarioPiece id={id} options={[]} />
            </div>
        </Draggable>
    );
};

export default function Tester() {
    return (
        <div className='flex w-full justify-evenly' >
            {/* <Xwrapper> */}
                <DraggableBox id={'elem1'}/>
                <DraggableBox id={'elem2'} />
                <DraggableBox id={'elem3'} />
                {/* <Xarrow start={'elem1'} end="elem2" color='black' showHead={false} startAnchor='bottom' endAnchor='top'/>
                <Xarrow start={'elem1'} end="elem3" color='black' showHead={false} startAnchor='bottom' endAnchor='top'/>
            </Xwrapper> */}
        </div>
    );
}