import { useRef, useEffect, useCallback, useState } from 'react';
import { useSpace } from '@/context/SpaceContext';
import { motion, AnimatePresence } from 'framer-motion';

function noise(x: number, t: number): number {
  const s1 = Math.sin(x * 0.8 + t * 0.6) * 0.5;
  const s2 = Math.sin(x * 1.7 + t * 1.1) * 0.3;
  const s3 = Math.sin(x * 3.1 + t * 0.4) * 0.15;
  const s4 = Math.sin(x * 5.3 + t * 1.8) * 0.05;
  return s1 + s2 + s3 + s4;
}

const LINES = [
  'NEURAL LINK ESTABLISHED',
  'SCANNING KNOWLEDGE MATRIX',
  'PARSING CAREER TRAJECTORY',
  'MAPPING PROJECT NODES',
  'ORIGIN READY',
];

export default function Waveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseYRef = useRef(0.5);
  const timeRef = useRef(0);
  /** Wall-clock start for post-boot intro: nearly flat line first, then stronger undulation and vertical “breath”. */
  const introStartedAtRef = useRef(0);
  const { isActivated, activate } = useSpace();
  const [lineIndex, setLineIndex] = useState<number>(0);

  useEffect(() => {
    introStartedAtRef.current = performance.now();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const centerY = window.innerHeight / 2;
    const dist = Math.abs(e.clientY - centerY) / centerY;
    mouseYRef.current = 1 - dist;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (isActivated) return;

    const interval = setInterval(() => {
      setLineIndex(prev => (prev + 1) % LINES.length);
    }, 800);

    const autoTimer = setTimeout(() => {
      activate();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(autoTimer);
    };
  }, [isActivated, activate]);

  const handleClick = useCallback(() => {
    if (isActivated) return;
    activate();
  }, [isActivated, activate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isActivated) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      ctx.clearRect(0, 0, w, h);

      const elapsed = performance.now() - introStartedAtRef.current;
      // ~1s subtle ribbon, then ramp amplitude and add slow vertical drift before warp/activate.
      const settleMs = 1000;
      const rampMs = 650;
      let introMul = 1;
      if (elapsed < settleMs) {
        introMul = 0.05 + 0.12 * (elapsed / settleMs);
      } else {
        introMul = Math.min(1, 0.17 + 0.83 * ((elapsed - settleMs) / rampMs));
      }

      const centerY = h / 2;
      const proximity = mouseYRef.current;

      timeRef.current += 0.016;
      const t = timeRef.current;

      const margin = w * 0.15;
      const lineStartX = margin;
      const lineEndX = w - margin;

      const waveAmplitude = (3 + proximity * 18) * introMul;
      const lineWidth = 1 + proximity * 0.5;
      const waveOpacity = 0.4 + proximity * 0.5;
      const verticalBreath =
        elapsed >= settleMs ? Math.sin(t * 1.05) * 11 * introMul : Math.sin(t * 0.25) * 1.5;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${waveOpacity})`;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 8 + proximity * 12;

      for (let x = lineStartX; x <= lineEndX; x += 2) {
        const normalizedX = (x - lineStartX) / (lineEndX - lineStartX);
        const edgeFade = Math.sin(normalizedX * Math.PI);
        const n = noise(normalizedX * 10, t);
        const y = centerY + verticalBreath + n * waveAmplitude * edgeFade;

        if (x === lineStartX) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isActivated]);

  return (
    <AnimatePresence>
      {!isActivated && (
        <motion.div
          className="fixed inset-0 z-30 cursor-pointer"
          onClick={handleClick}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          <div className="absolute left-1/2 -translate-x-1/2 top-[38%] flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.5, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="font-mono text-[9px] tracking-[0.35em] text-white uppercase"
              >
                {LINES[lineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
            <motion.p
              className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase"
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Click to Initialize
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
