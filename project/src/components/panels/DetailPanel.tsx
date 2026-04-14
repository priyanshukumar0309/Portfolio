import { useState, useEffect, useRef, type ComponentType } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  PanelLeftOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpace } from '@/context/SpaceContext';
import { PORTFOLIO_OWNER } from '@/data/portfolioData';
import { formatCareerYearRange, isCareerGraphNode } from '@/data/careerYearRange';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getDetailPanelLucideIcon } from '@/data/detailPanelLucideRegistry';
import type { DetailPanelIconKey } from '@/data/detailPanelIconKeys';

const PANEL_WIDTH = 420;

function extractFirstUrl(value: string): string | null {
  const match = value.match(/https?:\/\/[^\s|]+/i);
  return match ? match[0] : null;
}

/** Derive a stable key when legacy data only had heading/title. */
function sectionSlug(title: string, index: number) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 40);
  return base || `section_${index}`;
}

/**
 * Normalize `DetailPanelSection` and legacy `{ heading, content }` shapes from
 * `portfolioData` or older localStorage JSON into `{ key, title, body, ... }`.
 */
function normalizeDetailSection(section: any, index: number) {
  const title = (section.title ?? section.heading ?? "Section") as string;
  const body = (section.body ?? section.content ?? "") as string;
  const key =
    typeof section.key === "string" && section.key.length > 0 ? section.key : sectionSlug(title, index);
  return {
    key,
    title,
    body,
    buttons: section.buttons ?? [],
    headingIcon: section.headingIcon as DetailPanelIconKey | undefined,
  };
}

function getPanelSections(activePanel: any) {
  if (activePanel.detailPanel?.sections?.length) {
    return activePanel.detailPanel.sections.map((section: any, index: number) => normalizeDetailSection(section, index));
  }

  if (!activePanel.attributes) return [];
  const impactUrl = extractFirstUrl(activePanel.attributes.impact);
  return [
    { key: "fallback_problem", title: "Problem", body: activePanel.attributes.problem, buttons: [], headingIcon: "orbit" as const },
    { key: "fallback_solution", title: "Solution", body: activePanel.attributes.solution, buttons: [], headingIcon: "code" as const },
    {
      key: "fallback_impact",
      title: "Impact",
      body: activePanel.attributes.impact,
      buttons: impactUrl ? [{ label: "Open Link", url: impactUrl, icon: "externalLink" as const }] : [],
      headingIcon: "layers" as const,
    },
  ];
}

/** Prefer `detailPanel.technologies`, then legacy `attributes.technologies` (e.g. old localStorage JSON). */
function getPanelTechnologies(activePanel: any): string[] {
  const fromDetail = activePanel.detailPanel?.technologies;
  const fromAttrs = activePanel.attributes?.technologies;
  if (Array.isArray(fromDetail) && fromDetail.length > 0) return fromDetail;
  if (Array.isArray(fromAttrs) && fromAttrs.length > 0) return fromAttrs;
  return [];
}

/** Sidebar link row: white/neutral chrome, Lucide icon + label from `portfolioData` (no fixed “Egress” copy). */
function HudLinkButton({
  href,
  label,
  compact,
  icon,
}: {
  href: string;
  label: string;
  compact: boolean;
  icon?: DetailPanelIconKey;
}) {
  const Icon = getDetailPanelLucideIcon(icon, href, label) as ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
    'aria-hidden'?: boolean;
  }>;
  const row =
    compact
      ? 'group relative inline-flex w-fit max-w-full min-h-[32px] items-center gap-2 overflow-hidden rounded-md border border-white/18 bg-white/[0.05] px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08] active:scale-[0.99]'
      : 'group relative inline-flex w-fit max-w-full min-h-[34px] items-center gap-2 overflow-hidden rounded-md border border-white/18 bg-white/[0.05] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08] active:scale-[0.99]';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={row}
      style={{ color: "rgb(250 250 250)" }}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.05)_45%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/22 bg-black/35 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <Icon size={13} strokeWidth={2} style={{ color: "rgb(250 250 250)" }} aria-hidden />
      </span>
      <span
        className="relative max-w-[200px] truncate text-left font-sans text-[12px] font-medium normal-case tracking-normal sm:max-w-[240px]"
        style={{ color: "rgb(250 250 250 / 0.95)" }}
      >
        {label}
      </span>
      <ExternalLink size={12} strokeWidth={2} className="relative shrink-0 text-white/40 transition-colors group-hover:text-white/80" aria-hidden />
    </a>
  );
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
  const careerHeaderYears =
    activePanel && isCareerGraphNode(activePanel.id) ? formatCareerYearRange(activePanel.period) : null;

  const sections = activePanel ? getPanelSections(activePanel) : [];
  const detailUi = activePanel?.detailPanel;
  // Defaults match `src/data` when a field is omitted (e.g. legacy localStorage overrides).
  const ImageAccent = getDetailPanelLucideIcon(detailUi?.imageAccentIcon ?? 'sparkles', '', '') as ComponentType<{
    size?: number;
    className?: string;
    'aria-hidden'?: boolean;
  }>;
  const TechHeadingIcon = getDetailPanelLucideIcon(detailUi?.technologiesHeadingIcon ?? 'cpu', '', '') as ComponentType<{
    size?: number;
    className?: string;
    'aria-hidden'?: boolean;
  }>;

  const content = activePanel ? (
    <>
      {activePanel.image && (
        <div className="w-full overflow-hidden p-4" style={{ height: isMobile ? 180 : 240 }}>
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/30 shadow-[inset_0_0_40px_rgba(34,211,238,0.06)]">
            <ImageAccent className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-cyan-300/35" aria-hidden />
            <img src={activePanel.image} alt={activePanel.label} className="max-h-full max-w-full object-contain p-2" />
          </div>
        </div>
      )}
      <div className={isMobile ? 'px-5 py-4 text-neutral-100' : 'p-8 text-neutral-100'} style={{ color: "rgb(245 245 245 / 0.95)" }}>
        {(sections.length > 0 || getPanelTechnologies(activePanel).length > 0 || activePanel.detailPanel || activePanel.attributes) ? (
          <div className={isMobile ? 'space-y-0' : 'space-y-0'}>
            {sections.map((section: any, index: number) => (
              <div key={section.key} className="space-y-2">
                {index > 0 && <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />}
                <Section title={section.title} body={section.body} headingIcon={section.headingIcon} />
                {section.buttons.length > 0 && (
                  <div className={`flex flex-wrap gap-2 ${isMobile ? 'pt-1' : 'pt-2'}`}>
                    {section.buttons.map((button: any) => (
                      <HudLinkButton
                        key={`${section.key}-${button.label}`}
                        href={button.url}
                        label={button.label}
                        compact={isMobile}
                        icon={button.icon}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {getPanelTechnologies(activePanel).length > 0 && (
              <div>
                {sections.length > 0 && <div className="mb-4 mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />}
                <h3 className="mb-2 flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.2em] text-cyan-200/55 uppercase">
                  <TechHeadingIcon size={12} className="text-cyan-400/70" aria-hidden />
                  Technologies
                </h3>
                {/* One chip per row: calmer border/fill (less glass) so list reads as a simple stack */}
                <div className="flex flex-col gap-2">
                  {getPanelTechnologies(activePanel).map((tech: string) => (
                    <div
                      key={tech}
                      className="w-full rounded-md border border-white/10 bg-black/35 px-3 py-2 font-sans text-[12px] font-normal leading-snug text-white/78"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activePanel.children?.length > 0 && (
              <div>
                <div className="mb-4 mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <h3 className="mb-2 flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.2em] text-cyan-200/55 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
                  Sub Nodes
                </h3>
                <div className="space-y-1">
                  {activePanel.children.map((child: any) => {
                    const childYears = isCareerGraphNode(child.id) ? formatCareerYearRange(child.period) : null;
                    return (
                      <div key={child.id}>
                        <div className="font-sans text-[12px] leading-snug text-white/75">{child.label}</div>
                        {childYears && (
                          <div className="mt-px font-sans text-[9px] leading-none tracking-wide text-white/38">{childYears}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="font-sans text-[12px] text-white/25 tracking-wide">[Data module pending upload]</div>
        )}
      </div>
    </>
  ) : null;

  // HUD chrome: icon-only controls with glow rings so reads as cockpit, not generic UI.
  const hudIconButtonClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/25 bg-black/40 text-cyan-100/80 shadow-[0_0_18px_rgba(34,211,238,0.12)] transition-all hover:border-cyan-300/45 hover:bg-cyan-500/10 hover:text-white hover:shadow-[0_0_26px_rgba(34,211,238,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50';

  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {visible && !isOpen && (
            <motion.button
              key="panel-arrow"
              className="pointer-events-auto fixed bottom-14 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center gap-1 rounded-full border border-cyan-500/30 bg-black/75 px-4 py-2 shadow-[0_0_24px_rgba(34,211,238,0.15)] backdrop-blur-md"
              style={{ minWidth: 120 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={togglePanel}
              aria-label="Open panel"
            >
              <PanelLeftOpen size={14} className="text-cyan-300/80" aria-hidden />
              <span className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-cyan-100/80">Open bay</span>
              <ChevronUp size={14} className="text-cyan-200/70" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {visible && activePanel && (
            <motion.div className="fixed bottom-0 left-0 right-0 z-50" style={{ height: '50dvh' }} initial={{ y: '100%' }} animate={{ y: isOpen ? 0 : '100%' }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 280 }}>
              <div
              className="relative flex h-full w-full flex-col overflow-hidden text-neutral-100"
              style={{
                background: "linear-gradient(180deg, rgba(12,12,18,0.9), rgba(6,6,10,0.94))",
                backdropFilter: "blur(28px) saturate(110%)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                color: "rgb(245 245 245 / 0.95)",
              }}
            >
                <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.01) 40%, rgba(255,255,255,0) 65%)' }} />
                <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex min-w-0 items-center gap-3">
                    <button type="button" onClick={togglePanel} className={hudIconButtonClass} aria-label="Collapse panel">
                      <ChevronDown size={16} />
                    </button>
                    <div className="min-w-0">
                      <h2 className="truncate font-display text-[15px] font-semibold tracking-wide text-white">{activePanel.id === 'nexus' ? PORTFOLIO_OWNER.name : activePanel.label}</h2>
                      {activePanel.id === 'nexus' ? (
                        <p className="truncate font-sans text-[10px] tracking-wide text-white/45">{PORTFOLIO_OWNER.title}</p>
                      ) : (
                        careerHeaderYears && (
                          <p className="truncate font-sans text-[9px] leading-none tracking-wide text-white/42">{careerHeaderYears}</p>
                        )
                      )}
                    </div>
                  </div>
                  <button type="button" onClick={handleClose} className={hudIconButtonClass} aria-label="Close panel">
                    <X size={16} />
                  </button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">{content}</div>
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
          <motion.div className="fixed top-0 right-0 z-50 h-full" style={{ width: PANEL_WIDTH }} initial={{ x: '100%' }} animate={{ x: isOpen ? 0 : '100%' }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 280 }}>
            <div
              className="relative h-full overflow-y-auto text-neutral-100"
              style={{
                background: "linear-gradient(160deg, rgba(12,12,18,0.88), rgba(6,6,10,0.93))",
                backdropFilter: "blur(28px) saturate(110%)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                color: "rgb(245 245 245 / 0.95)",
              }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.012) 38%, rgba(255,255,255,0) 70%)' }} />
              <div className="p-8 pb-0">
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-semibold tracking-wide text-white">{activePanel.id === 'nexus' ? PORTFOLIO_OWNER.name : activePanel.label}</h2>
                    {activePanel.id === 'nexus' ? (
                      <p className="mt-1 font-sans text-[11px] tracking-wide text-white/45">{PORTFOLIO_OWNER.title}</p>
                    ) : (
                      careerHeaderYears && (
                        <p className="mt-0.5 font-sans text-[10px] leading-none tracking-wide text-white/42">{careerHeaderYears}</p>
                      )
                    )}
                  </div>
                  <button type="button" onClick={handleClose} className={hudIconButtonClass} aria-label="Close panel">
                    <X size={18} />
                  </button>
                </div>
              </div>
              {content}
            </div>
          </motion.div>
          <motion.button
            type="button"
            className="fixed top-1/2 z-50 flex -translate-y-1/2 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            style={{
              width: 28,
              height: 76,
              borderRadius: '12px 0 0 12px',
              background: 'linear-gradient(180deg, rgba(8,12,18,0.92), rgba(4,6,12,0.88))',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(34,211,238,0.22)',
              borderRight: 'none',
              boxShadow: 'inset 0 0 20px rgba(34,211,238,0.08), 0 0 24px rgba(0,0,0,0.4)',
            }}
            animate={{ right: isOpen ? PANEL_WIDTH : 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
            onClick={togglePanel}
            aria-label={isOpen ? 'Close panel' : 'Open panel'}
          >
            {isOpen ? (
              <ChevronRight size={14} className="text-cyan-300/70 transition-colors hover:text-cyan-100" />
            ) : (
              <ChevronLeft size={14} className="text-cyan-300/70 transition-colors hover:text-cyan-100" />
            )}
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Node sidebar uses plain copy only: strip `**` markers so emphasis never appears here
 * (About / standard pages can still use `inlineBold` on the same source strings).
 */
function stripSidebarEmphasis(raw: string): string {
  return raw.replace(/\*\*/g, '');
}

function SectionBody({ text }: { text: string }) {
  const plain = stripSidebarEmphasis(text);
  const lines = plain
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return null;
  // One paragraph: no list. Multiple lines (e.g. Scope/Impact): round disc bullets, cockpit-readable on dark glass.
  if (lines.length === 1) {
    return (
      <p className="font-sans text-[13px] font-normal leading-relaxed text-white/75">{lines[0]}</p>
    );
  }
  return (
    <ul className="list-disc list-outside space-y-2 pl-4 font-sans text-[13px] font-normal leading-relaxed text-white/75 marker:text-cyan-200/55">
      {lines.map((line, li) => (
        <li key={li} className="pl-0.5">
          {line}
        </li>
      ))}
    </ul>
  );
}

function Section({ title, body, headingIcon }: { title: string; body: string; headingIcon?: DetailPanelIconKey }) {
  const HeadingMarker = getDetailPanelLucideIcon(headingIcon ?? 'satellite', '', '') as ComponentType<{
    size?: number;
    className?: string;
    'aria-hidden'?: boolean;
  }>;
  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.2em] text-cyan-100/75 uppercase">
        <HeadingMarker size={11} className="shrink-0 text-cyan-200/75" aria-hidden />
        {title}
      </h3>
      <SectionBody text={body} />
    </div>
  );
}
