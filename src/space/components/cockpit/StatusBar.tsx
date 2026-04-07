import { useSpace } from "@/space/context/SpaceContext";
import { PORTFOLIO_OWNER } from "@/space/data/portfolioData";

export default function StatusBar() {
  const { isActivated, breadcrumb, cosmosMode } = useSpace();
  return (
    <div className="fixed top-0 left-0 right-0 z-20 pointer-events-none">
      <div className="flex items-center justify-between px-8 py-4 text-white/60 font-mono text-[11px] uppercase tracking-[0.2em]">
        <div>{PORTFOLIO_OWNER.name}</div>
        <div>{isActivated ? ["ORIGIN", ...breadcrumb].join(" / ") : "STANDBY"}</div>
        <div>{cosmosMode === "warp" ? "WARP ACTIVE" : "SYS ONLINE"}</div>
      </div>
    </div>
  );
}
