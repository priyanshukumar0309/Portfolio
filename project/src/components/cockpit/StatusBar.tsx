import { useSpace } from '@/context/SpaceContext';
import { Switch } from '@/components/ui/switch';

export default function StatusBar() {
  const { isActivated, breadcrumb, cosmosMode } = useSpace();
  const onToggleSpaceMode = () => {
    window.dispatchEvent(new CustomEvent('toggle-space-mode'));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20 pointer-events-none">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/70 text-white px-2 sm:px-3 py-1.5 rounded-md border border-white/20">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] whitespace-nowrap">Space Mode</span>
            <Switch checked onCheckedChange={onToggleSpaceMode} />
          </div>
          <div className="font-mono text-[10px] sm:text-[12px] font-semibold tracking-[0.18em] sm:tracking-[0.25em] text-white/60 uppercase whitespace-nowrap">
            Kumar Priyanshu
          </div>
        </div>

        <div className="font-mono text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase">
          {isActivated && breadcrumb.length > 0
            ? ['ORIGIN', ...breadcrumb].join(' / ')
            : isActivated
              ? 'ORIGIN'
              : 'STANDBY'}
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full ${
            cosmosMode === 'warp'
              ? 'bg-green-400 animate-pulse'
              : 'bg-green-500'
          }`} />
          <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
            {cosmosMode === 'idle' ? 'SYS ONLINE' : cosmosMode === 'warp' ? 'WARP ACTIVE' : 'LOCKED'}
          </span>
        </div>
      </div>
    </div>
  );
}
