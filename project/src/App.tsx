import { SpaceProvider } from '@/context/SpaceContext';
import CosmosScene from '@/components/cosmos/CosmosScene';
import HudFrame from '@/components/cockpit/HudFrame';
import StatusBar from '@/components/cockpit/StatusBar';
import ContactBar from '@/components/cockpit/ContactBar';
import SpaceTerminal from '@/components/cockpit/SpaceTerminal';
import Waveform from '@/components/resonance/Waveform';
import NodeTree from '@/components/nexus/NodeTree';
import DetailPanel from '@/components/panels/DetailPanel';

function App() {
  return (
    <SpaceProvider>
      <div className="w-screen h-screen overflow-hidden bg-space-black">
        <CosmosScene>
          <NodeTree />
        </CosmosScene>

        <HudFrame />
        <StatusBar />
        <ContactBar />
        <SpaceTerminal />
        <Waveform />
        <DetailPanel />
      </div>
    </SpaceProvider>
  );
}

export default App;
