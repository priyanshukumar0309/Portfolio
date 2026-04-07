import { Github, Hand, Linkedin, Mail, ZoomIn, type LucideIcon } from 'lucide-react';
import { useSpace } from '@/context/SpaceContext';
import { contactLinks } from '@/data/portfolioData';
import { useEffect, useState } from 'react';

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export default function ContactBar() {
  const { cameraTarget } = useSpace();
  const [coords, setCoords] = useState({ x: '0.00', y: '0.00', z: '5.00' });

  useEffect(() => {
    setCoords({
      x: cameraTarget[0].toFixed(2),
      y: cameraTarget[1].toFixed(2),
      z: cameraTarget[2].toFixed(2),
    });
  }, [cameraTarget]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      <div className="flex md:grid md:grid-cols-3 items-center justify-center px-8 py-4">
        <div className="hidden md:flex items-center gap-2 pointer-events-auto text-white/45 font-mono text-[10px] tracking-[0.12em] uppercase">
          <Hand size={12} />
          <span>Pan & Drag</span>
          <ZoomIn size={12} />
          <span>Pinch / Wheel to Zoom</span>
        </div>

        <div className="flex items-center justify-center gap-4 pointer-events-auto">
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase mr-1">COMMS</span>
          {contactLinks.map(link => {
            const Icon = iconMap[link.icon];
            return (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 text-white/50 hover:text-white transition-all duration-300" title={link.label}>
                {Icon && <Icon size={14} className="group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />}
                <span className="font-mono text-[10px] font-medium tracking-wider uppercase hidden sm:inline">{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="hidden md:block font-mono text-[10px] font-medium tracking-[0.15em] text-white/35 text-right">
          X:{coords.x} &nbsp; Y:{coords.y} &nbsp; Z:{coords.z}
        </div>
      </div>
    </div>
  );
}
