import { contactLinks } from "@/space/data/portfolioData";
import { useSpace } from "@/space/context/SpaceContext";

export default function ContactBar() {
  const { returnToNexus } = useSpace();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 px-8 py-4 flex items-center justify-between text-white/60 font-mono text-[11px]">
      <button className="uppercase tracking-[0.18em]" onClick={returnToNexus}>
        Return to Origin
      </button>
      <div className="flex gap-3">
        {contactLinks.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="uppercase tracking-[0.15em]">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
