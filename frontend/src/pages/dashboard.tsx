import Playground from "../components/playground";
import {PipelineProvider} from "../components/PipelineProvider"


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