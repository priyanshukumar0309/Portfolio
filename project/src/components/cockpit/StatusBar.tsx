import { useSpace } from '@/context/SpaceContext';
import { Switch } from '@/components/ui/switch';

export default function StatusBar() {
  const { isActivated, breadcrumb, cosmosMode } = useSpace();
  const onToggleSpaceMode = () => {
    window.dispatchEvent(new CustomEvent('toggle-space-mode'));
  };

  const trail =
    isActivated && breadcrumb.length > 0
      ? ['ORIGIN', ...breadcrumb].join(' / ')
      : isActivated
        ? 'ORIGIN'
        : 'STANDBY';

  return (
    <div className="fixed top-0 left-0 right-0 z-20 pointer-events-none">
      {/* Mobile: two-row HUD — controls on row 1, truncated breadcrumb on row 2 (avoids three-column squeeze). */}
      <div className="flex flex-col gap-1.5 px-4 py-2.5 sm:hidden pointer-events-none">
        <div className="flex items-center justify-between gap-2 pointer-events-auto">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/20 bg-black/75 px-2 py-1 text-white">
              <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/85">Space</span>
              <Switch checked onCheckedChange={onToggleSpaceMode} className="scale-[0.82]" />
            </div>
            <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Kumar Priyanshu
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                cosmosMode === 'warp' ? 'animate-pulse bg-green-400' : 'bg-green-500'
              }`}
            />
            <span className="font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-white/45">
              {cosmosMode === 'idle' ? 'ONLINE' : cosmosMode === 'warp' ? 'WARP' : 'LOCK'}
            </span>
          </div>
        </div>
        <div className="truncate rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-1 font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-white/42">
          {trail}
        </div>
      </div>

      {/* Desktop: original three-column header */}
      <div className="hidden sm:flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/70 text-white px-2 sm:px-3 py-1.5 rounded-md border border-white/20">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] whitespace-nowrap">Space Mode</span>
            <Switch checked onCheckedChange={onToggleSpaceMode} />
          </div>
          <div className="font-mono text-[10px] sm:text-[12px] font-semibold tracking-[0.18em] sm:tracking-[0.25em] text-white/60 uppercase whitespace-nowrap">
            Kumar Priyanshu
          </div>
        </div>

        <div className="font-mono text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase">{trail}</div>

        <div className="flex items-center gap-3">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              cosmosMode === 'warp' ? 'bg-green-400 animate-pulse' : 'bg-green-500'
            }`}
          />
          <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
            {cosmosMode === 'idle' ? 'SYS ONLINE' : cosmosMode === 'warp' ? 'WARP ACTIVE' : 'LOCKED'}
          </span>
        </div>
      </div>
    </div>
  );
}
