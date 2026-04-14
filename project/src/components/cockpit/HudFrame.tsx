export default function HudFrame() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-4 left-4 w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
      </div>
      <div className="absolute top-4 right-4 w-12 h-12">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/30 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
      </div>
      <div className="absolute bottom-4 left-4 w-12 h-12">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-white/30 to-transparent" />
      </div>
      <div className="absolute bottom-4 right-4 w-12 h-12">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/*
        Vignette: softer multi-stop gradient reduces visible “steps” (banding) on near-black backgrounds.
        No scanline layer — repeating 1px stripes read as dirty horizontal lines at common DPRs and over WebGL.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
}
