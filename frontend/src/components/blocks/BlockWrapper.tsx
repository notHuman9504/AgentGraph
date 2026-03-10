import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useBlock } from "../PipelineProvider";
const BlockWrapper = ({ BlockId, children }) => {
    const {setBlockId} = useBlock();
  return (
    <div className="bg-sky-300 rounded-sm text-xs">
      <div className="w-full flex justify-end gap-[3px] p-1">
        <button
          onClick={() => {
                setBlockId(BlockId);
          }}
        >
          <PencilSquareIcon className="h-[10px] w-[10px] cursor-pointer text-gray-500 hover:text-blue-600" />
        </button>
        <TrashIcon className="h-[10px] w-[10px] cursor-pointer text-gray-500 hover:text-red-600" />
      </div>
      {children}
    </div>
  );
};

export default BlockWrapper;
