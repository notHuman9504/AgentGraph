import Playground from "./playground";
import {PipelineProvider} from "../contexts/PipelineProvider"


function Dashboard() {
  return (
    <div>
      <div>
        <div className="h-screen w-full">
            <PipelineProvider>
            <Playground/>
            </PipelineProvider>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;