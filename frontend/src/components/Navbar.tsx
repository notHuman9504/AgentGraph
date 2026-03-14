
const Navbar = () => {
    return(<>
        <div 
        style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: "rgba(255, 255, 255, 0.17)",
            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }}
        className="good-font-head fixed z-30 top-6 w-140 h-16 text-white rounded-lg left-1/2 -translate-x-1/2">
            <div className="flex h-full p-1 gap-1 w-full text-xl items-center justify-between">
                <div
                style={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: "rgba(2, 133, 248, 0.68)",
                }}
                 className="bg-white h-full w-60 p-1 flex rounded-md justify-center items-center">
                    AGENT GRAPH
                </div>
                <div style={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: "rgba(2, 133, 248, 0.68)",
                }}
                className="bg-white px-4 good-font text-lg justify-end gap-3 w-full h-full flex rounded-md items-center">
                    <div>
                        Home
                    </div>
                    <div>
                        Dashboard
                    </div>
                </div>
                
            </div>
        </div>
    </>)
};

export default Navbar;

// backgroundColor: "rgba(0, 102, 255, 0.7)",