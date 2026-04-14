import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Playback at 0.75× speed → multiply baseline ms by 1/0.75. */
const SPEED = 0.75;
const T = (ms: number) => Math.round(ms / SPEED);

/**
 * Short staged lines: loading-information tone, PM/nexus flavor, title case — keeps the HUD clean.
 * No waveform on this layer; parent calls activate() after fade.
 */
const bootLines = [
  { text: 'Loading Nexus Channel', delay: T(300) },
  { text: 'Fetching Career Graph', delay: T(300) },
  { text: 'Pulling Product Context', delay: T(300) },
  { text: 'Syncing Build Nodes', delay: T(300) },
  { text: 'Binding Detail Panels', delay: T(300) },
  { text: 'Origin Ready', delay: T(380) },
];

const FINAL_HOLD_MS = T(600);

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const ranRef = useRef(false);

  const runSequence = useCallback(async () => {
    for (let i = 0; i < bootLines.length; i++) {
      await new Promise(r => setTimeout(r, bootLines[i].delay));
      setVisibleLines(i + 1);
      setProgress(((i + 1) / bootLines.length) * 100);
    }
    // Pause on the final line, then exit — parent runs warp + panel on onExitComplete.
    await new Promise(r => setTimeout(r, FINAL_HOLD_MS));
    setComplete(true);
  }, []);

  useEffect(() => {
    // Strict Mode remounts effects in dev; without this guard the line timers stack and feel broken.
    if (ranRef.current) return;
    ranRef.current = true;
    runSequence();
  }, [runSequence]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!complete && (
        <motion.div
          key="boot-overlay"
          className="fixed inset-0 z-[110] bg-space-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: T(800) / 1000 }}
        >
          <div className="max-w-md w-full px-8">
            <div className="space-y-2 mb-6">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: T(300) / 1000 }}
                  className={`font-mono text-[11px] tracking-wider ${
                    i === bootLines.length - 1 && visibleLines === bootLines.length
                      ? 'text-white'
                      : 'text-white/40'
                  }`}
                >
                  <span className="text-white/20 mr-2">&gt;</span>
                  {line.text}
                </motion.div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="h-full bg-white/40"
                style={{ width: `${progress}%` }}
                transition={{ duration: T(300) / 1000 }}
              />
            </div>
            <div className="font-mono text-[9px] text-white/20 tracking-[0.2em] mt-2">
              {Math.round(progress)}% Nexus sync
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
