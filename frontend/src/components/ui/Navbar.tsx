
import { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return(<>
        <div 
        style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: "rgba(255, 255, 255, 0.17)",
            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }}
        className="good-font-head fixed z-30 top-6 w-fit h-16 text-white rounded-lg left-1/2 -translate-x-1/2">
            <div style={{
                gap: isOpen ? 4 : 2,
                transition: "gap 0.6s ease-in-out"
            }} className="flex h-full p-1 w-full text-xl items-center justify-between">
                <div
                onClick={() => navigate("/")}
                style={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: "rgba(2, 133, 248, 0.68)",
                }}
                 className="h-full px-6 flex rounded-md justify-center items-center cursor-pointer shrink-0">
                    AgentGraph
                </div>
                <div style={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: "rgba(2, 133, 248, 0.68)",
                    width: isOpen ? '256px' : '0px',
                    transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out, padding 0.5s ease-in-out',
                    paddingLeft: isOpen ? '1rem' : '0px',
                    paddingRight: isOpen ? '1rem' : '0px',
                }}
                className="good-font text-lg justify-end gap-3 h-full flex rounded-md items-center overflow-hidden whitespace-nowrap">
                    <div className="cursor-pointer" onClick={() => navigate("/playground")}>
                        Playground
                    </div>
                </div>

                <div 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: "rgba(2, 133, 248, 0.68)",
                }}
                className="h-full w-16 p-1 flex flex-col gap-1.5 rounded-md justify-center items-center cursor-pointer shrink-0 overflow-hidden">
                    <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                    <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                </div>
                
            </div>
        </div>
    </>)
};

export default Navbar;

// backgroundColor: "rgba(0, 102, 255, 0.7)",