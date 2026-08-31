'use client';

import { useAudio } from './ReproductorProvider';

const PLAYLIST = [
  { titulo: "Academic Ostinato" },
  { titulo: "Observatory" },
  { titulo: "Subterranean" },
  { titulo: "Academic Ostinato 2" }
];

export default function ReproductorGlobal() {
  const { reproduciendo, pistaActualIndex, volumen, toggleReproductor, cambiarSiguientePista, ajustarVolumen } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-2 p-3 bg-[#08040C]/95 backdrop-blur-md border border-[#C8946E]/50 rounded-lg shadow-[0_0_25px_rgba(76,29,149,0.5)]">
        
        <div className="flex items-center gap-2 px-2 text-left w-full max-w-[220px]">
          <span className={`text-xs ${reproduciendo ? 'animate-spin text-[#C8946E]' : 'text-[#E5C0A1]/50'}`}>✦</span>
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-[10px] text-[#C8946E] uppercase tracking-widest font-bold truncate">
              {reproduciendo ? PLAYLIST[pistaActualIndex].titulo : 'Santuario Silencioso'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-1">
          <button 
            onClick={toggleReproductor}
            className="px-3 py-1.5 bg-[#2E1065] border border-[#E5C0A1]/40 text-[#F4F0EB] text-[10px] uppercase tracking-widest font-bold rounded hover:border-[#C8946E] transition-all cursor-pointer shadow"
          >
            {reproduciendo ? 'Pausar' : 'Reproducir'}
          </button>

          <button 
            onClick={cambiarSiguientePista}
            title="Siguiente pista"
            className="px-2.5 py-1.5 bg-black/60 border border-[#E5C0A1]/30 text-[#C8946E] text-xs rounded hover:border-[#C8946E] transition-all cursor-pointer"
          >
            ⏭
          </button>

          <div className="flex items-center gap-1.5 pl-1 border-l border-[#E5C0A1]/20">
            <span className="text-[9px] text-[#E5C0A1]/60">Vol</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={volumen} 
              onChange={ajustarVolumen}
              className="w-16 accent-[#C8946E] cursor-pointer h-1 bg-black rounded"
            />
          </div>
        </div>

      </div>
    </div>
  );
}