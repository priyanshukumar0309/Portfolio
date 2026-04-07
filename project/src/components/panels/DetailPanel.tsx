import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpace } from '@/context/SpaceContext';
import { PORTFOLIO_OWNER } from '@/data/portfolioData';
import { useIsMobile } from '@/hooks/useIsMobile';

const PANEL_WIDTH = 420;

function extractFirstUrl(value: string): string | null {
  const match = value.match(/https?:\/\/[^\s|]+/i);
  return match ? match[0] : null;
}

function getPanelSections(activePanel: any) {
  if (activePanel.detailPanel?.sections?.length) {
    return activePanel.detailPanel.sections.map((section: any) => ({
      title: section.heading.toUpperCase(),
      content: section.content,
      buttons: section.buttons ?? [],
    }));
  }

  if (!activePanel.attributes) return [];
  const impactUrl = extractFirstUrl(activePanel.attributes.impact);
  return [
    { title: 'PROBLEM', content: activePanel.attributes.problem, buttons: [] },
    { title: 'SOLUTION', content: activePanel.attributes.solution, buttons: [] },
    {
      title: 'IMPACT',
      content: activePanel.attributes.impact,
      buttons: impactUrl ? [{ label: 'Open Link', url: impactUrl }] : [],
    },
  ];
}

export default function DetailPanel() {
  const { activePanel, closePanel, addLog, isActivated, setPanelCollapsed } = useSpace();
  const [isOpen, setIsOpen] = useState(true);
  const isManuallyCollapsed = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!activePanel) return;
    const isTerminal = Boolean(activePanel.attributes || activePanel.detailPanel) && (!activePanel.children || activePanel.children.length === 0);
    if (isTerminal) {
      isManuallyCollapsed.current = false;
      setPanelCollapsed(false);
      setIsOpen(true);
    } else if (!isManuallyCollapsed.current) {
      setIsOpen(true);
    }
  }, [activePanel, setPanelCollapsed]);

  const handleClose = () => {
    addLog(`SIGNAL CLOSED :: ${activePanel?.label?.toUpperCase() ?? 'NODE'}`);
    closePanel();
    setIsOpen(false);
    isManuallyCollapsed.current = false;
  };

  const togglePanel = () => {
    setIsOpen(prev => {
      const next = !prev;
      isManuallyCollapsed.current = !next;
      if (isMobile) setPanelCollapsed(!next);
      return next;
    });
  };

  const visible = isActivated && activePanel !== null;

  const sections = activePanel ? getPanelSections(activePanel) : [];
  const content = activePanel ? (
    <>
      {activePanel.image && (
        <div className="w-full overflow-hidden p-4" style={{ height: isMobile ? 180 : 240 }}>
          <img src={activePanel.image} alt={activePanel.label} className="w-full h-full object-contain rounded-md bg-white/[0.03] border border-white/15" />
        </div>
      )}
      <div className={isMobile ? 'px-5 py-4' : 'p-8'}>
        {(activePanel.attributes || activePanel.detailPanel) ? (
          <div className={isMobile ? 'space-y-0' : 'space-y-0'}>
            {sections.map((section: any, index: number) => (
              <div key={section.title} className="space-y-2">
                {index > 0 && <div className="h-px w-full bg-white/25 mb-4" />}
                <Section title={section.title} content={section.content} />
                {section.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {section.buttons.map((button: any) => (
                      <a
                        key={`${section.title}-${button.label}`}
                        href={button.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center ${isMobile ? 'px-3 py-1.5 text-[11px]' : 'px-4 py-2 text-xs'} bg-purple hover:bg-purple-light text-white rounded-md transition-colors`}
                      >
                        {button.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {activePanel.attributes?.technologies?.length > 0 && (
              <div>
                {sections.length > 0 && <div className="h-px w-full bg-white/25 mb-4" />}
                <h3 className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {activePanel.attributes.technologies.map((tech: string) => (
                    <span key={tech} className={`font-mono text-[10px] tracking-wider ${isMobile ? 'px-2.5 py-1' : 'px-3 py-1.5'} border border-white/10 text-white/50 rounded-sm`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="font-mono text-[11px] text-white/20 tracking-wider">[Data module pending upload]</div>
        )}
      </div>
    </>
  ) : null;

  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {visible && !isOpen && (
            <motion.button
              key="panel-arrow"
              className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto"
              style={{ width: 44, height: 28, borderRadius: 20, background: 'rgba(12, 12, 18, 0.92)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={togglePanel}
              aria-label="Open panel"
            >
              <ChevronUp size={14} className="text-white/50" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {visible && activePanel && (
            <motion.div className="fixed left-0 right-0 bottom-0 z-50" style={{ height: '50dvh' }} initial={{ y: '100%' }} animate={{ y: isOpen ? 0 : '100%' }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 280 }}>
              <div className="w-full h-full flex flex-col overflow-hidden relative" style={{ background: 'linear-gradient(180deg, rgba(10,10,16,0.16), rgba(4,4,8,0.2))', backdropFilter: 'blur(34px) saturate(125%)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 34%, rgba(255,255,255,0) 62%)' }} />
                <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <button onClick={togglePanel} className="text-white/30 hover:text-white/70 transition-colors shrink-0"><ChevronDown size={16} /></button>
                    <div className="min-w-0">
                      <h2 className="font-sans text-[15px] font-semibold text-white tracking-wide truncate">{activePanel.id === 'nexus' ? PORTFOLIO_OWNER.name : activePanel.label}</h2>
                      <p className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase truncate">{activePanel.id === 'nexus' ? PORTFOLIO_OWNER.title : activePanel.subtitle ?? activePanel.period ?? ''}</p>
                    </div>
                  </div>
                  <button onClick={handleClose} className="text-white/30 hover:text-white transition-colors p-1 shrink-0 ml-3"><X size={16} /></button>
                </div>
                <div className="flex-1 overflow-y-auto">{content}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <AnimatePresence>
      {visible && activePanel && (
        <>
          <motion.div className="fixed top-0 right-0 h-full z-50" style={{ width: PANEL_WIDTH }} initial={{ x: '100%' }} animate={{ x: isOpen ? 0 : '100%' }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 280 }}>
            <div className="h-full overflow-y-auto relative" style={{ background: 'linear-gradient(160deg, rgba(10,10,16,0.14), rgba(4,4,8,0.24))', backdropFilter: 'blur(34px) saturate(125%)', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 36%, rgba(255,255,255,0) 68%)' }} />
              <div className="p-8 pb-0">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-sans text-xl font-semibold text-white tracking-wide">{activePanel.id === 'nexus' ? PORTFOLIO_OWNER.name : activePanel.label}</h2>
                    <p className="font-mono text-[11px] tracking-[0.15em] text-white/40 mt-1 uppercase">{activePanel.id === 'nexus' ? PORTFOLIO_OWNER.title : activePanel.subtitle ?? activePanel.period ?? ''}</p>
                    {activePanel.id !== 'nexus' && activePanel.subtitle && activePanel.period && <p className="font-mono text-[10px] tracking-[0.1em] text-white/30 mt-0.5">{activePanel.period}</p>}
                  </div>
                  <button onClick={handleClose} className="text-white/30 hover:text-white transition-colors p-1"><X size={18} /></button>
                </div>
              </div>
              {content}
            </div>
          </motion.div>
          <motion.button
            className="fixed top-1/2 -translate-y-1/2 z-50 flex items-center justify-center focus:outline-none"
            style={{ width: 26, height: 72, borderRadius: '10px 0 0 10px', background: 'rgba(10, 10, 10, 0.88)', backdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.08)', borderRight: 'none' }}
            animate={{ right: isOpen ? PANEL_WIDTH : 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
            onClick={togglePanel}
            aria-label={isOpen ? 'Close panel' : 'Open panel'}
          >
            {isOpen ? <ChevronRight size={13} className="text-white/40 hover:text-white/80 transition-colors" /> : <ChevronLeft size={13} className="text-white/40 hover:text-white/80 transition-colors" />}
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase mb-2">{title}</h3>
      <p className="font-sans text-[13px] leading-relaxed text-white/60">{content}</p>
    </div>
  );
}
