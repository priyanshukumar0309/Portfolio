import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSpace } from '@/context/SpaceContext';

const BASE_TEMP = 308.7;

interface GeoData {
  city: string;
  region: string;
  country_name: string;
}

export default function SpaceTerminal() {
  const { isActivated, logs, breadcrumb, addLog } = useSpace();
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [temp, setTemp] = useState(BASE_TEMP);
  const [cursorVisible, setCursorVisible] = useState(true);
  const bootedRef = useRef(false);
  const [geoData, setGeoData] = useState<GeoData | null>(null);

  useEffect(() => {
    fetch('https://ipwho.is/')
      .then(r => r.json())
      .then((d: { city?: string; region?: string; country?: string; success?: boolean }) => {
        if (d.success !== false && d.city) {
          setGeoData({ city: d.city ?? '', region: d.region ?? '', country_name: d.country ?? '' });
        }
      })
      .catch(() => null);
  }, []);

  useEffect(() => {
    if (!isActivated || bootedRef.current) return;
    bootedRef.current = true;
    const lines = [
      'ORIGIN CORE ONLINE',
      'SPATIAL MAPPING INITIALIZED',
      'SIGNAL LOCKED. AWAITING INPUT.',
    ];
    lines.forEach((line, i) => {
      setTimeout(() => addLog(line), i * 400);
    });
  }, [isActivated, addLog]);

  useEffect(() => {
    if (!isActivated) {
      bootedRef.current = false;
    }
  }, [isActivated]);

  useEffect(() => {
    const id = setInterval(() => {
      setTemp(t => parseFloat((t + (Math.random() - 0.5) * 0.4).toFixed(1)));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 550);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const path = isActivated
    ? ['ORIGIN', ...breadcrumb].join(' / ')
    : 'STANDBY';

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed bottom-12 left-6 z-30 pointer-events-none hidden sm:block"
          style={{ width: '15vw', height: '15vh', minWidth: 180, minHeight: 120 }}
        >
          <div
            className="w-full h-full flex flex-col overflow-hidden relative"
            style={{
              background: 'rgba(0, 8, 4, 0.88)',
              border: '1px solid rgba(0, 255, 100, 0.15)',
              boxShadow: '0 0 16px rgba(0,255,80,0.04), inset 0 0 20px rgba(0,0,0,0.6)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,80,0.012) 4px)',
              }}
            />

            <div
              className="px-2 py-1 shrink-0 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(0,255,100,0.12)' }}
            >
              <span
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: '7px', color: 'rgba(0,255,100,0.55)' }}
              >
                ORIGIN-1 SYS LOG
              </span>
              <span
                className="font-mono"
                style={{ fontSize: '7px', color: 'rgba(0,255,100,0.35)' }}
              >
                {temp.toFixed(1)}°K
              </span>
            </div>

            <div
              className="px-2 py-0.5 shrink-0"
              style={{ borderBottom: '1px solid rgba(0,255,100,0.07)' }}
            >
              <span
                className="font-mono uppercase tracking-wider truncate block"
                style={{ fontSize: '7px', color: 'rgba(0,255,100,0.3)' }}
              >
                {path}
              </span>
            </div>

            <div className="flex-1 overflow-hidden px-2 py-1 flex flex-col gap-0.5">
              {logs.slice(-20).map((entry, i) => (
                <div key={i} className="flex gap-1.5 shrink-0">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: '7px', color: 'rgba(0,255,100,0.25)' }}
                  >
                    {entry.time}
                  </span>
                  <span
                    className="font-mono truncate"
                    style={{ fontSize: '7px', color: 'rgba(0,255,100,0.65)' }}
                  >
                    {entry.msg}
                  </span>
                </div>
              ))}
              <div className="flex gap-1.5">
                <span
                  className="font-mono"
                  style={{ fontSize: '7px', color: 'rgba(0,255,100,0.25)' }}
                >
                  &gt;
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '7px',
                    color: 'rgba(0,255,100,0.7)',
                    opacity: cursorVisible ? 1 : 0,
                  }}
                >
                  _
                </span>
              </div>
              <div ref={logsEndRef} />
            </div>

            {geoData && (
              <div
                className="px-2 py-1 shrink-0 flex items-center gap-1"
                style={{ borderTop: '1px solid rgba(0,255,100,0.08)' }}
              >
                <span
                  className="font-mono uppercase tracking-widest shrink-0"
                  style={{ fontSize: '6px', color: 'rgba(0,255,100,0.3)' }}
                >
                  LOC
                </span>
                <span
                  className="font-mono uppercase tracking-wider truncate"
                  style={{ fontSize: '7px', color: 'rgba(0,255,100,0.55)' }}
                >
                  {geoData.city}, {geoData.region}, {geoData.country_name}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
