import CosmosScene from "@/space/components/cosmos/CosmosScene";
import NodeTree from "@/space/components/nexus/NodeTree";
import HudFrame from "@/space/components/cockpit/HudFrame";
import StatusBar from "@/space/components/cockpit/StatusBar";
import ContactBar from "@/space/components/cockpit/ContactBar";
import Waveform from "@/space/components/resonance/Waveform";
import DetailPanel from "@/space/components/panels/DetailPanel";
import { SpaceProvider } from "@/space/context/SpaceContext";

export default function SpaceExplorer() {
  return (
    <SpaceProvider>
      <div className="w-screen h-screen overflow-hidden bg-black relative">
        <CosmosScene>
          <NodeTree />
        </CosmosScene>
        <HudFrame />
        <StatusBar />
        <ContactBar />
        <Waveform />
        <DetailPanel />
      </div>
    </SpaceProvider>
  );
}
