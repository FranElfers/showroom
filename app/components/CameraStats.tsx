import { Photo } from "../constants";

interface CameraStatsProps {
  camera?: Photo["camera"];
}

export function CameraStats({ camera }: CameraStatsProps) {
  if (!camera) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black/30 to-transparent flex flex-wrap items-center justify-around gap-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-white text-xs tracking-widest z-10">
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
          <line x1="9.69" y1="8" x2="21.17" y2="8" />
          <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
          <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
          <line x1="14.31" y1="16" x2="2.83" y2="16" />
          <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
        </svg>
        <span>{camera.aperture}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>{camera.shutterSpeed}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h4l2-9 4 18 2-9h4" />
        </svg>
        <span>ISO {camera.iso}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12L21 4a20 20 0 0 1 0 16L3 12z" />
          <path d="M12 8a3 5 0 0 1 0 8 3 5 0 0 1 0-8" />
        </svg>
        <span>{camera.focalLength}</span>
      </div>
    </div>
  );
}
