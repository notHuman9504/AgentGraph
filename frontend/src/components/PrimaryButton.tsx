import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const PrimaryButton = ({label = "Submit"}) => {
    return (<>
        <button className={`active:scale-99 px-2 flex justify-between items-center border-white border-2 w-full h-12 text-md text-white rounded-lg bg-gray-500 shadow-gray-500/50 shadow-lg`}>
            <div>{label}</div>
            <PaperAirplaneIcon className="h-4 w-4 stroke-3"/>
        </button>
    </>)
};

export default PrimaryButton;

