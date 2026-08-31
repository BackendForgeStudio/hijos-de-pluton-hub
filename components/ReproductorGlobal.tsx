'use client';

import { useState, useEffect, useRef } from 'react';

const PLAYLIST = [
  { titulo: "Academic Ostinato", archivo: "/Academic-Ostinato.mp3" },
  { titulo: "Observatory", archivo: "/Observatory.mp3" },
  { titulo: "Subterranean", archivo: "/Subterranean.mp3" },
  { titulo: "Academic Ostinato 2", archivo: "/Academic-Ostinato-2.mp3" }
];

export default function ReproductorGlobal() {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [pistaActualIndex, setPistaActualIndex] = useState(0);
  const [volumen, setVolumen] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(PLAYLIST[0].archivo);
    audioRef.current.volume = volumen;
    audioRef.current.loop = false;

    audioRef.current.addEventListener('ended', () => {
      siguientePistaAutomatica();
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const siguientePistaAutomatica = () => {
    setPistaActualIndex((prevIndex) => {
      const siguienteIndex = (prevIndex + 1) % PLAYLIST.length;
      if (audioRef.current) {
        audioRef.current.src = PLAYLIST[siguienteIndex].archivo;
        audioRef.current.play().catch(() => {});
      }
      return siguienteIndex;
    });
  };

  const toggleReproductor = () => {
    if (!audioRef.current) return;
    if (reproduciendo) {
      audioRef.current.pause();
      setReproduciendo(false);
    } else {
      audioRef.current.play().then(() => {
        setReproduciendo(true);
      }).catch(() => {});
    }
  };

  const cambiarSiguientePista = () => {
    if (!audioRef.current) return;
    const siguienteIndex = (pistaActualIndex + 1) % PLAYLIST.length;
    setPistaActualIndex(siguienteIndex);
    audioRef.current.src = PLAYLIST[siguienteIndex].archivo;
    if (reproduciendo) {
      audioRef.current.play().catch(() => {});
    }
  };

  const ajustarVolumen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoVol = parseFloat(e.target.value);
    setVolumen(nuevoVol);
    if (audioRef.current) {
      audioRef.current.volume = nuevoVol;
    }
  };

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