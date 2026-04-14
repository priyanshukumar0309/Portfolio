import { useState, useCallback } from 'react';
import { SpaceProvider, useSpace } from '@/context/SpaceContext';
import CosmosScene from '@/components/cosmos/CosmosScene';
import HudFrame from '@/components/cockpit/HudFrame';
import StatusBar from '@/components/cockpit/StatusBar';
import ContactBar from '@/components/cockpit/ContactBar';
import SpaceTerminal from '@/components/cockpit/SpaceTerminal';
import Waveform from '@/components/resonance/Waveform';
import BootSequence from '@/components/loader/BootSequence';
import NodeTree from '@/components/nexus/NodeTree';
import DetailPanel from '@/components/panels/DetailPanel';

/**
 * Boot is only the black terminal overlay (no waveform). When the scripted lines finish,
 * we call activate() once so the user lands in the same “expanded” state as after the old
 * waveform handoff — nodes visible, origin panel queued. Waveform only returns if they
 * later deactivate (standby) and need the resonance gate again.
 */
function SpaceShell() {
  const [bootFinished, setBootFinished] = useState(false);
  const { activate, isActivated } = useSpace();

  const handleBootComplete = useCallback(() => {
    activate();
    setBootFinished(true);
  }, [activate]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-space-black">
      <CosmosScene>
        <NodeTree />
      </CosmosScene>

      <HudFrame />
      <StatusBar />
      <ContactBar />
      <SpaceTerminal />
      {!bootFinished && <BootSequence onComplete={handleBootComplete} />}
      {bootFinished && !isActivated && <Waveform />}
      <DetailPanel />
    </div>
  );
}

function App() {
  return (
    <SpaceProvider>
      <SpaceShell />
    </SpaceProvider>
  );
}

export default App;
