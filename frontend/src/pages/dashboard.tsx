import Playground from "../components/playground";
import Sidebar from "../components/Sidebar";


function Dashboard() {
  return (
    //give red background
    <div>
      <div>
        <div className="h-screen w-full">
            <Playground></Playground>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;