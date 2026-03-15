import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useBlock } from "../PipelineProvider";
const BlockWrapper = ({ BlockId, children }) => {
    const {blockId, setBlockId, setNodes, setEdges} = useBlock();
  return (
    <div>
      <div className="w-full flex justify-end gap-[3px]">
        <button
        className="nopan nodrag transition-transform duration-100 h-[10px] w-[10px]"
          onClick={() => {
                setBlockId(BlockId);
          }}
        >
          <PencilSquareIcon className="active:scale-80 active:text-blue-600 h-[10px] w-[10px] cursor-pointer text-gray-500 hover:text-blue-600" />
        </button>
        
        <button className="nopan nodrag transition-transform duration-100"
          onClick={()=>{
            if(blockId === BlockId){
              setBlockId(null);
            }
              setNodes(nodes => nodes.filter(node => node.id !== BlockId))
              setEdges(edges =>
                  edges.filter(edge =>
                  edge.source !== BlockId && edge.target !== BlockId
                )
              )
            }}
        >
          <TrashIcon className="active:scale-80 active:text-red-600 h-[10px] w-[10px] cursor-pointer text-gray-500 hover:text-red-600"
          />
        </button>
      </div>
      <div onClick={() => {
                setBlockId(BlockId);
          }}>
      {children}
      </div>
    </div>
  );
};

export default BlockWrapper;
