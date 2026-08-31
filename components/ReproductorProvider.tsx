'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';

const PLAYLIST = [
  { titulo: "Academic Ostinato", archivo: "/Academic-Ostinato.mp3" },
  { titulo: "Observatory", archivo: "/Observatory.mp3" },
  { titulo: "Subterranean", archivo: "/Subterranean.mp3" },
  { titulo: "Academic Ostinato 2", archivo: "/Academic-Ostinato-2.mp3" }
];

interface AudioContextType {
  reproduciendo: boolean;
  pistaActualIndex: number;
  volumen: number;
  toggleReproductor: () => void;
  cambiarSiguientePista: () => void;
  ajustarVolumen: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function ReproductorProvider({ children }: { children: React.ReactNode }) {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [pistaActualIndex, setPistaActualIndex] = useState(0);
  const [volumen, setVolumen] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializar el audio una sola vez a nivel global
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[0].archivo);
      audioRef.current.volume = volumen;
      audioRef.current.loop = false;

      audioRef.current.addEventListener('ended', () => {
        siguientePistaAutomatica();
      });
    }

    return () => {
      // No destruimos el audio al desmontar subpáginas para que persista
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
    <AudioContext.Provider value={{ reproduciendo, pistaActualIndex, volumen, toggleReproductor, cambiarSiguientePista, ajustarVolumen }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio debe usarse dentro de un ReproductorProvider');
  return context;
}