import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useBlock } from "../PipelineProvider";
const BlockWrapper = ({ BlockId, children }) => {
    const {setBlockId, setNodes, setEdges} = useBlock();
  return (
    <div>
      <div className="w-full flex justify-end gap-[3px]">
        <button
        className="active:scale-80 transition-transform duration-100"
          onClick={() => {
                setBlockId(BlockId);
          }}
        >
          <PencilSquareIcon className="h-[10px] w-[10px] cursor-pointer text-gray-500 hover:text-blue-600" />
        </button>
        
        <button className="active:scale-80 transition-transform duration-100">
          <TrashIcon className="h-[10px] w-[10px] cursor-pointer text-gray-500 hover:text-red-600"
            onClick={()=>{
              setNodes(nodes => nodes.filter(node => node.id !== BlockId))
              setEdges(edges =>
                  edges.filter(edge =>
                  edge.source !== BlockId && edge.target !== BlockId
                )
              )
            }}
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
