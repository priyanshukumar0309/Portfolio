import { useSpace } from "@/space/context/SpaceContext";
import { PORTFOLIO_OWNER } from "@/space/data/portfolioData";

export default function DetailPanel() {
  const { activePanel, closePanel, isActivated } = useSpace();
  if (!isActivated || !activePanel) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[420px] z-40 bg-black/85 border-l border-white/10 text-white p-6 overflow-y-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">{activePanel.id === "nexus" ? PORTFOLIO_OWNER.name : activePanel.label}</h2>
          <p className="text-xs uppercase tracking-[0.16em] text-white/50">{activePanel.subtitle ?? activePanel.period ?? PORTFOLIO_OWNER.title}</p>
        </div>
        <button onClick={closePanel} className="text-white/60">
          X
        </button>
      </div>
      {activePanel.attributes ? (
        <div className="space-y-5">
          <Section title="Problem" content={activePanel.attributes.problem} />
          <Section title="Solution" content={activePanel.attributes.solution} />
          <Section title="Impact" content={activePanel.attributes.impact} />
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {activePanel.attributes.technologies.map((tech) => (
                <span key={tech} className="text-xs border border-white/20 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white/40">Select a terminal node to view details.</p>
      )}
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">{title}</h3>
      <p className="text-sm text-white/75">{content}</p>
    </div>
  );
}
