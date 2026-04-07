import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: 'DEEP SPACE NODE EXPLORER v1.0', delay: 200 },
  { text: 'Initializing navigation systems...', delay: 400 },
  { text: 'Loading star charts...', delay: 300 },
  { text: 'Calibrating warp drive...', delay: 500 },
  { text: 'Establishing comms link...', delay: 300 },
  { text: 'Systems online.', delay: 400 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const runSequence = useCallback(async () => {
    for (let i = 0; i < bootLines.length; i++) {
      await new Promise(r => setTimeout(r, bootLines[i].delay));
      setVisibleLines(i + 1);
      setProgress(((i + 1) / bootLines.length) * 100);
    }
    await new Promise(r => setTimeout(r, 600));
    setComplete(true);
    await new Promise(r => setTimeout(r, 500));
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    runSequence();
  }, [runSequence]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-space-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-md w-full px-8">
            <div className="space-y-2 mb-6">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
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
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="font-mono text-[9px] text-white/20 tracking-[0.2em] mt-2">
              {Math.round(progress)}% INITIALIZED
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
