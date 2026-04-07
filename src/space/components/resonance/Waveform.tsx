import { useSpace } from "@/space/context/SpaceContext";

export default function Waveform() {
  const { isActivated, activate } = useSpace();
  if (isActivated) return null;

  return (
    <button className="fixed inset-0 z-30 bg-black text-white/70 font-mono tracking-[0.3em] text-xs uppercase" onClick={activate}>
      Click to Initialize
    </button>
  );
}
