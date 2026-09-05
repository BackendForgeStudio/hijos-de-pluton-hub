'use client';

import { useState, useEffect } from 'react';
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
  slug: string;
  rol: string;
  signo: string;
  bando: string;
  desc: string;
  frase: string;
  stats: {
    frecuencia: number;
    estabilidad: number;
    amenaza: number;
  };
  expediente: {
    estado: string;
    anomalias: string[];
    notas: string;
  };
}

const PERSONAJES: Personaje[] = [
  {
    nombre: "Lola Connor",
    slug: "lola",
    rol: "Protagonista / Espontánea",
    signo: "Escorpio (Luna en Piscis)",
    bando: "Independiente (Hijos de Plutón)",
    desc: "Ex-estudiante de medicina terrestre con el poder de la Umbrakinesis y una conexión inestable con la anomalía Herea y el poder plutoniano.",
    frase: "«¿Y si quiero apagarlo?» — A Evan.",
    stats: { frecuencia: 95, estabilidad: 20, amenaza: 90 },
    expediente: {
      estado: "Vigilancia Crítica",
      anomalias: ["Alteración umbrakinética masiva en Sector 4", "Conexión anómala con el plano de Herea"],
      notas: "Su poder no responde a los patrones numi estándar. La influencia de Plutón es impredecible. Debe mantenerse aislada de estímulos emocionales extremos o desatará un Giro irrecuperable."
    }
  },
  {
    nombre: "Cosmo Evren",
    slug: "cosmo",
    rol: "Heredero de Aškara",
    signo: "Libra",
    bando: "Dinastía Evren (Consejo)",
    desc: "Príncipe del linaje Evren, brillante, educado y dotado de Gravitokinesis. Atrapado entre la lealtad familiar y sus sentimientos por Lola.",
    frase: "«Ese chico no respira sin intención.» — Atlas sobre Cosmo.",
    stats: { frecuencia: 85, estabilidad: 88, amenaza: 45 },
    expediente: {
      estado: "En Activo",
      anomalias: ["Fluctuación gravitatoria detectada en pabellones norte"],
      notas: "El linaje Evren le exige perfección absoluta. Observo dudas recientes en su anclaje institucional. El riesgo de insubordinación crece si se le presiona con el protocolo de los Espontáneos."
    }
  },
  {
    nombre: "Evan Vesper",
    slug: "evan",
    rol: "Profesor de Combate / Resistencia",
    signo: "Aries",
    bando: "Los Hijos de Plutón",
    desc: "Espontáneo veterano marcado por la trágica muerte de su hermano Dante. Su aura emite fuego puro y es el mentor de Lola en el subsuelo.",
    frase: "«Cuando algo quema, lo mejor es apartar la mano.» — Evan.",
    stats: { frecuencia: 92, estabilidad: 40, amenaza: 85 },
    expediente: {
      estado: "Vigilancia Pasiva",
      anomalias: ["Picos térmicos y pirokinesis no autorizada en el subsuelo", "Infracciones de toque de queda"],
      notas: "Su energía está intrínsecamente ligada al duelo no resuelto por Dante. Si decide quemar sus propios límites de contención, será extremadamente difícil neutralizarlo sin bajas."
    }
  },
  {
    nombre: "Iris Aurelis",
    slug: "iris",
    rol: "Estudiante de Aire / Agua",
    signo: "Piscis",
    bando: "Aliada de Lola",
    desc: "Amiga leal de Lola, capaz de levitar, crear niebla y navegar por los sueños. Novia de Will y entusiasta de la moda cósmica.",
    frase: "«Todos están esperando en la entrada... nadie va a dar un solo paso hasta que tú estés lista.» — Iris.",
    stats: { frecuencia: 75, estabilidad: 82, amenaza: 25 },
    expediente: {
      estado: "En Activo",
      anomalias: ["Manifestación densa de niebla en los dormitorios este"],
      notas: "Poder acuático excepcionalmente estable y gran dominio onírico. Sin embargo, su lealtad ciega hacia la nueva Espontánea compromete su objetividad."
    }
  },
  {
    nombre: "Atlas Vesper",
    slug: "atlas",
    rol: "Estudiante de Tierra",
    signo: "Cáncer",
    bando: "Aliado de Lola / Pareja de Aster",
    desc: "Dotado de Patokinesis y la capacidad de levantar escudos de energía impenetrables. Encubre su gran empatía con un sarcasmo afilado.",
    frase: "«El espacio en el monte es limitado y tu ego ya ocupa tres constelaciones enteras.» — Atlas a Cosmo.",
    stats: { frecuencia: 88, estabilidad: 85, amenaza: 55 },
    expediente: {
      estado: "En Activo",
      anomalias: ["Levantamiento de escudo sísmico Nivel 4 sin autorización previa"],
      notas: "Patokinesis inusualmente fuerte. Finge desinterés y cinismo, pero la rigidez de sus escudos refleja un instinto protector que podría volverse en nuestra contra."
    }
  },
  {
    nombre: "Gala",
    slug: "gala",
    rol: "Directora de Eclipse",
    signo: "Virgo",
    bando: "Neutral / Institucional",
    desc: "Sanadora experta en Biokinesis. Responsable de la contención inicial de los Espontáneos y de mantener el frágil equilibrio de la academia.",
    frase: "«Los minerales no son herramientas que obedecen órdenes. Son aliados.» — Gala.",
    stats: { frecuencia: 98, estabilidad: 95, amenaza: 10 },
    expediente: {
      estado: "Dirección Académica",
      anomalias: ["Ninguna registrada. Control Absoluto."],
      notas: "Su biokinesis es el pilar que mantiene las instalaciones intactas. Sus métodos de contención son dolorosos pero efectivos. Un activo insustituible."
    }
  },
  {
    nombre: "Lucio",
    slug: "lucio",
    rol: "Profesor de Contención",
    signo: "Capricornio",
    bando: "Protector Oculto",
    desc: "Maestro de la Akinesis cognitiva. Antiguo amante de Dante Vesper, ha protegido en secreto a los Espontáneos desde el anonimato.",
    frase: "«La contención no es una negación; es el límite que evita el colapso.» — Lucio.",
    stats: { frecuencia: 100, estabilidad: 99, amenaza: 95 },
    expediente: {
      estado: "Custodio Mayor",
      anomalias: ["Datos encriptados. Nivel de acceso insuficiente."],
      notas: "¿Quién vigila al vigilante? Su dominio cognitivo lo hace indetectable e indispensable. Si sus lealtades se desvían hacia los Espontáneos, perderemos la Academia."
    }
  }
];

// COMPONENTES DE EFECTOS ESPECIALES
const TextoDesencriptado = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let iteration = 0;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < iteration || letter === " ") return letter;
          return characters[Math.floor(Math.random() * characters.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2; 
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const TextoCensurado = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-black/90 text-transparent hover:text-[#E5C0A1]/80 active:text-[#E5C0A1]/80 transition-colors duration-500 select-none cursor-crosshair">
    {children}
  </span>
);

const obtenerTemaAmbiental = (amenaza: number) => {
  if (amenaza >= 80) return { border: "border-red-900/50", shadow: "shadow-[0_0_40px_rgba(153,27,27,0.25)]", accent: "text-red-500", glow: "bg-red-900/10" };
  if (amenaza <= 30) return { border: "border-blue-900/50", shadow: "shadow-[0_0_40px_rgba(30,58,138,0.2)]", accent: "text-blue-400", glow: "bg-blue-900/10" };
  return { border: "border-[#E5C0A1]/30", shadow: "shadow-[0_0_40px_rgba(76,29,149,0.2)]", accent: "text-[#C8946E]", glow: "bg-[#4C1D95]/10" };
};

// UI COMPONENTES BASE
const EsquinasReliquia = ({ colorBorder = "border-[#E5C0A1]/50" }) => (
  <>
    <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l ${colorBorder} transition-colors duration-500`}></div>
    <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${colorBorder} transition-colors duration-500`}></div>
    <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${colorBorder} transition-colors duration-500`}></div>
    <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r ${colorBorder} transition-colors duration-500`}></div>
  </>
);

const BarraEstadistica = ({ label, value, colorHex }: { label: string; value: number; colorHex: string }) => (
  <div className="mb-3 w-full relative z-10">
    <div className="flex justify-between text-[9px] uppercase tracking-widest mb-1.5">
      <span className="text-[#E5C0A1]/80">{label}</span>
      <span style={{ color: colorHex }} className="font-bold">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-black/60 border border-[#E5C0A1]/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full shadow-[0_0_10px_currentColor]"
        style={{ backgroundColor: colorHex, color: colorHex }}
      />
    </div>
  </div>
);

// ICONOS VECTORIALES
const IconoConstelacion = () => (
  <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="18" r="2"/>
    <path d="M17 7l-10 4m5 6l-5-5"/>
  </svg>
);

const IconoOjo = () => (
  <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconoFisura = () => (
  <svg className="w-3.5 h-3.5 text-red-400/90 mr-2 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L22 12L12 22L2 12L12 2Z" strokeDasharray="4 2" strokeOpacity="0.5"/>
    <path d="M11 6L14 12L10 14L13 20" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 drop-shadow-[0_0_3px_rgba(239,68,68,1)]"/>
  </svg>
);

export default function PersonajesPage() {
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Personaje>(PERSONAJES[0]);
  const tema = obtenerTemaAmbiental(personajeSeleccionado.stats.amenaza);

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6`}>
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.40] mix-blend-screen">
        <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#08040C] via-transparent to-[#08040C]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver al Santuario
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Expedientes del Consejo</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(229,192,161,0.3)]">Directorio de Iniciados</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Archivos de inteligencia clasificados. Acceso restringido por los Altos Linajes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lista lateral de expedientes */}
          <div className="lg:col-span-4 space-y-3">
            {PERSONAJES.map((p) => {
              const pTema = obtenerTemaAmbiental(p.stats.amenaza);
              const isActive = personajeSeleccionado.nombre === p.nombre;
              return (
                <button
                  key={p.slug}
                  onClick={() => setPersonajeSeleccionado(p)}
                  className={`w-full text-left p-4 border transition-all duration-500 cursor-pointer flex justify-between items-center ${
                    isActive
                      ? `bg-[#2E1065]/40 ${pTema.border} text-[#F4F0EB] ${pTema.shadow}`
                      : 'bg-black/60 border-[#E5C0A1]/20 text-[#E5C0A1]/70 hover:border-[#C8946E]/50 hover:text-[#F4F0EB]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-medium tracking-wide">{p.nombre}</span>
                    <span className="text-[9px] uppercase tracking-widest mt-1 opacity-50 font-mono">ID: {p.slug.toUpperCase()}</span>
                  </div>
                  <span className={`text-xs ${isActive ? pTema.accent : 'text-[#C8946E]'} transition-colors`}>✦</span>
                </button>
              );
            })}
          </div>

          {/* Panel de Detalles (Expediente Dinámico) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={personajeSeleccionado.nombre}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative border ${tema.border} bg-[#0A050E]/95 ${tema.shadow} overflow-hidden transition-colors duration-700`}
              >
                {/* Resplandor ambiental adaptativo */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 transition-colors duration-700 ${tema.glow}`}></div>

                <div className="relative z-10 p-8 md:p-10">
                  <EsquinasReliquia colorBorder={tema.border} />
                  
                  {/* Encabezado del Expediente */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="max-w-[70%]">
                      <span className={`${tema.accent} text-[10px] uppercase tracking-widest font-bold block mb-2 transition-colors`}>
                        {personajeSeleccionado.rol}
                      </span>
                      <h2 className="text-3xl md:text-4xl text-[#F4F0EB] relative z-10 min-h-[40px]">
                        <TextoDesencriptado text={personajeSeleccionado.nombre} />
                      </h2>
                    </div>
                    <div className="text-right relative z-10">
                      <motion.span 
                        animate={{ opacity: personajeSeleccionado.stats.amenaza > 80 ? [1, 0.5, 1] : 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`text-[9px] uppercase tracking-widest font-mono block border px-2 py-1 backdrop-blur-sm transition-colors ${
                          personajeSeleccionado.stats.amenaza > 80 ? 'text-red-400 border-red-900/50 bg-red-950/30' : 'text-[#E5C0A1] border-[#E5C0A1]/30 bg-black/40'
                        }`}
                      >
                        {personajeSeleccionado.expediente.estado}
                      </motion.span>
                    </div>
                  </div>

                  {/* Datos Básicos con Iconos */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-6 border-b ${tema.border} text-xs relative z-10 transition-colors`}>
                    <div className="flex items-center">
                      <span className={tema.accent}><IconoConstelacion /></span>
                      <div>
                        <span className={`${tema.accent} font-bold block uppercase tracking-wider mb-0.5 text-[9px] transition-colors`}>Carta Astral</span>
                        <span className="text-[#E5C0A1]/90">{personajeSeleccionado.signo}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={tema.accent}><IconoOjo /></span>
                      <div>
                        <span className={`${tema.accent} font-bold block uppercase tracking-wider mb-0.5 text-[9px] transition-colors`}>Filiación</span>
                        <span className="text-[#E5C0A1]/90">{personajeSeleccionado.bando}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8 relative z-10">
                    {/* Descripción y Anomalías */}
                    <div>
                      <p className="text-xs md:text-sm text-[#E5C0A1]/90 font-light leading-relaxed mb-6">
                        {personajeSeleccionado.desc}
                      </p>
                      
                      <div className="mb-4">
                        <span className={`${tema.accent} font-bold block uppercase tracking-widest mb-3 text-[10px] transition-colors`}>
                          Registro de Anomalías
                        </span>
                        <ul className="space-y-2">
                          {personajeSeleccionado.expediente.anomalias.map((anomalia, idx) => (
                            <li key={idx} className="text-xs text-[#E5C0A1]/80 font-light flex items-start">
                              <IconoFisura />
                              <TextoCensurado>
                                <span className="leading-relaxed">{anomalia}</span>
                              </TextoCensurado>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Estadísticas de Contención */}
                    <div className="bg-black/40 border border-[#E5C0A1]/10 p-5 backdrop-blur-sm relative overflow-hidden">
                      <span className={`${tema.accent} font-bold block uppercase tracking-widest mb-5 text-[10px] text-center border-b border-[#E5C0A1]/10 pb-2 transition-colors`}>
                        Métricas de Contención
                      </span>
                      <BarraEstadistica label="Frecuencia Numi (Poder Bruto)" value={personajeSeleccionado.stats.frecuencia} colorHex="#E5C0A1" />
                      <BarraEstadistica label="Estabilidad / Anclaje" value={personajeSeleccionado.stats.estabilidad} colorHex="#4C1D95" />
                      <BarraEstadistica label="Nivel de Amenaza (Asthar)" value={personajeSeleccionado.stats.amenaza} colorHex={personajeSeleccionado.stats.amenaza > 80 ? "#ef4444" : "#991B1B"} />
                    </div>
                  </div>

                  {/* Notas del Custodio (Encriptadas) */}
                  <div className={`bg-[#100A14] p-5 border-l-4 ${tema.border} mb-8 relative z-10 shadow-inner transition-colors`}>
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <IconoOjo />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#E5C0A1]/50 block mb-2">Adjunto: Notas del Custodio</span>
                    <p className={`font-mono text-xs ${tema.accent} leading-relaxed opacity-90 min-h-[60px] transition-colors`}>
                      <TextoDesencriptado text={personajeSeleccionado.expediente.notas} />
                    </p>
                  </div>

                  {/* Frase canónica */}
                  <blockquote className="text-center p-4 border-t border-b border-[#E5C0A1]/10 text-xs text-[#F4F0EB] italic font-light tracking-wide relative z-10">
                    <TextoCensurado>
                      {personajeSeleccionado.frase}
                    </TextoCensurado>
                  </blockquote>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}