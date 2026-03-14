import { PlayIcon } from "@heroicons/react/24/outline";

const RunButton = () => {
    return (<>
        <button className={`active:scale-99 px-2 flex justify-center gap-1 items-center border-white border-2 w-full h-12 text-md text-white rounded-lg bg-blue-400 shadow-blue-400/50 shadow-lg`}>
            <PlayIcon className="h-4 w-4 stroke-3"/>
            <div>Run</div>
        </button>
    </>)
};

export default RunButton;