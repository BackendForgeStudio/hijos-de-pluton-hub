'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import localFont from 'next/font/local';

const academiaFont = localFont({
  src: '../fonts/AcademiaEclipse.ttf',
  variable: '--font-academia',
  display: 'swap',
});

interface Personaje {
  nombre: string;
  rol: string;
  signo: string;
  bando: string;
  desc: string;
  frase: string;
}

const PERSONAJES: Personaje[] = [
  {
    nombre: "Lola Connor",
    rol: "Protagonista / Espontánea",
    signo: "Escorpio (Luna en Piscis)",
    bando: "Independiente (Los Hijos de Plutón)",
    desc: "Ex-estudiante de medicina terrestre con el poder de la Umbrakinesis y una conexión inestable con la anomalía Herea y el poder plutoniano.",
    frase: "«¿Y si quiero apagarlo?» — A Evan."
  },
  {
    nombre: "Cosmo Evren",
    rol: "Heredero de Aškara",
    signo: "Libra",
    bando: "Dinastía Evren (Consejo)",
    desc: "Príncipe del linaje Evren, brillante, educado y dotado de Gravitokinesis. Atrapado entre la lealtad familiar y sus sentimientos por Lola.",
    frase: "«Ese chico no respira sin intención.» — Atlas sobre Cosmo."
  },
  {
    nombre: "Evan Vesper",
    rol: "Profesor de Combate / Líder de la Resistencia",
    signo: "Aries",
    bando: "Los Hijos de Plutón",
    desc: "Espontáneo veterano marcado por la trágica muerte de su hermano Dante. Su aura emite fuego puro y es el mentor de Lola en el subsuelo.",
    frase: "«Cuando algo quema, lo mejor es apartar la mano.» — Evan."
  },
  {
    nombre: "Iris Aurelis",
    rol: "Estudiante del Bastión de Aire / Agua",
    signo: "Piscis",
    bando: "Aliada de Lola",
    desc: "Amiga leal de Lola, capaz de levitar, crear niebla y navegar por los sueños. Novia de Will y entusiasta de la moda cósmica.",
    frase: "«Todos están esperando en la entrada... nadie va a dar un solo paso hasta que tú estés lista.» — Iris."
  },
  {
    nombre: "Atlas Vesper",
    rol: "Estudiante del Bastión de Tierra",
    signo: "Cáncer",
    bando: "Aliado de Lola / Pareja de Aster",
    desc: "Dotado de Patokinesis y la capacidad de levantar escudos de energía impenetrables. Encubre su gran empatía con un sarcasmo afilado.",
    frase: "«El espacio en el monte es limitado y tu ego ya ocupa tres constelaciones enteras.» — Atlas a Cosmo."
  },
  {
    nombre: "Gala",
    rol: "Directora de la Academia Eclipse",
    signo: "Virgo",
    bando: "Neutral / Institucional",
    desc: "Sanadora experta en Biokinesis. Responsable de la contención inicial de los Espontáneos y de mantener el frágil equilibrio de la academia.",
    frase: "«Los minerales no son herramientas que obedecen órdenes. Son aliados.» — Gala."
  },
  {
    nombre: "Lucio",
    rol: "Profesor de Contención",
    signo: "Capricornio",
    bando: "Protector Oculto (Ex de Dante)",
    desc: "Maestro de la Akinesis cognitiva. Antiguo amante de Dante Vesper, ha protegido en secreto a los Espontáneos desde el anonimato.",
    frase: "«La contención no es una negación; es el límite que evita el colapso.» — Lucio."
  }
];

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50"></div>
  </>
);

export default function PersonajesPage() {
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Personaje>(PERSONAJES[0]);

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6`}>
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.40] mix-blend-screen">
        <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#08040C] via-transparent to-[#08040C]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver al Santuario
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Expedientes del Consejo</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(229,192,161,0.3)]">Directorio de Personajes</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Fichas técnicas y cartas astrales de los protagonistas que moldean el destino de Asthar.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lista de nombres */}
          <div className="space-y-3 lg:col-span-1">
            {PERSONAJES.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setPersonajeSeleccionado(p)}
                className={`w-full text-left p-4 border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                  personajeSeleccionado.nombre === p.nombre
                    ? 'bg-[#2E1065]/40 border-[#C8946E] text-[#F4F0EB] shadow-[0_0_15px_rgba(200,148,110,0.3)]'
                    : 'bg-black/60 border-[#E5C0A1]/20 text-[#E5C0A1]/70 hover:border-[#C8946E]/50 hover:text-[#F4F0EB]'
                }`}
              >
                <span className="text-xs md:text-sm font-medium tracking-wide">{p.nombre}</span>
                <span className="text-xs text-[#C8946E]">✦</span>
              </button>
            ))}
          </div>

          {/* Panel de Detalles */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={personajeSeleccionado.nombre}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 border border-[#E5C0A1]/30 bg-black/80 backdrop-blur-md relative shadow-[0_0_40px_rgba(76,29,149,0.3)]"
              >
                <EsquinasReliquia />
                
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">{personajeSeleccionado.rol}</span>
                <h2 className="text-3xl text-[#F4F0EB] mb-4">{personajeSeleccionado.nombre}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-[#E5C0A1]/20 text-xs">
                  <div>
                    <span className="text-[#C8946E] font-bold block uppercase tracking-wider mb-1">Carta Astral</span>
                    <span className="text-[#E5C0A1]/90">{personajeSeleccionado.signo}</span>
                  </div>
                  <div>
                    <span className="text-[#C8946E] font-bold block uppercase tracking-wider mb-1">Filiación</span>
                    <span className="text-[#E5C0A1]/90">{personajeSeleccionado.bando}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-[#E5C0A1]/90 font-light leading-relaxed mb-6">
                  {personajeSeleccionado.desc}
                </p>

                <blockquote className="p-4 bg-[#140B1A]/80 border-l-2 border-[#C8946E] text-xs text-[#F4F0EB] italic font-light">
                  {personajeSeleccionado.frase}
                </blockquote>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </main>
  );
}