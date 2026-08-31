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

type CategoriaLore = 'linajes' | 'leyes' | 'lugares' | 'clasificado';

const DATOS_GRIMORIO: Record<CategoriaLore, { titulo: string; items: { nombre: string; desc: string; img?: string }[] }> = {
  linajes: {
    titulo: "Los Cinco Altos Linajes",
    items: [
      { nombre: "Evren", desc: "Dueños y custodios de la Academia Eclipse. Gobiernan Aškara, el centro financiero de Asthar, construido alrededor del monolito de Pirita. Impulsaron el Pacto del Velo.", img: "/images/linaje-evren.jpg" },
      { nombre: "Helion", desc: "La élite política. Gobernantes de Damyra, una ciudad de palacios dorados. Su linaje suele liderar el Consejo de Asthar.", img: "/images/linaje-helion.jpg" },
      { nombre: "Aurelis", desc: "Diplomáticos y pacifistas. Protectores del mundo humano y de las artes. Edificaron Eirholm entre mármol, cristal y hielo.", img: "/images/linaje-aurelis.jpg" },
      { nombre: "Vesper", desc: "Eruditos e investigadores. Su ciudad, Eldcraig, se alza sobre acantilados repletos de bibliotecas y observatorios astronómicos.", img: "/images/linaje-vesper.jpg" },
      { nombre: "Draken", desc: "Custodios de la moralidad y la ética. Convirtieron los escarpados cañones de Zahari en inmensos santuarios.", img: "/images/linaje-draken.jpg" }
    ]
  },
  leyes: {
    titulo: "Doce Leyes de la Manifestación Natal",
    items: [
      { nombre: "Aries (Pirokinesis)", desc: "Control del fuego y la energía calórica. Pueden arder sin quemarse y calcinar amenazas." },
      { nombre: "Tauro (Taurokinesis)", desc: "Capacidad de volverse físicamente indestructibles. La piel se endurece, los músculos crecen y emergen cuernos dorados de la frente." },
      { nombre: "Géminis (Duplikinesis)", desc: "El desdoblamiento. Pueden dividir su identidad original en dos gemelos físicos con personalidades independientes." },
      { nombre: "Cáncer (Patokinesis)", desc: "Influencia directa sobre las emociones físicas. Capacidad de generar potentes campos de fuerza y escudos indestructibles." },
      { nombre: "Leo (Heliokinesis)", desc: "Control absoluto sobre la luz. Pueden emitir un resplandor dorado propio y cegar a sus enemigos." },
      { nombre: "Virgo (Biokinesis)", desc: "Magia celular. Sanadores capaces de reescribir y reparar tejidos vivos con energía azulada." },
      { nombre: "Libra (Gravitokinesis)", desc: "Manipulación de la gravedad. Pueden suspender objetos y personas, o aplastarlos contra el suelo." },
      { nombre: "Escorpio (Umbrakinesis)", desc: "Control de las sombras y la penumbra. Capacidad de canalizar energía negativa y crear portales oscuros." },
      { nombre: "Sagitario (Chorokinesis)", desc: "Especialistas en la materialización de flechas de energía pura y la apertura de portales espaciales." },
      { nombre: "Capricornio (Akinesis)", desc: "El límite y la estructura. Capacidad de inmovilizar procesos moleculares y fijaciones sinápticas (modificación de recuerdos)." },
      { nombre: "Acuario (Electrokinesis)", desc: "Dominio absoluto sobre los flujos eléctricos y la tecnología." },
      { nombre: "Piscis (Onirokinesis)", desc: "Navegantes de los sueños. Capaces de proyectar realidades en mentes ajenas, crear niebla densa y levitar sutilmente." }
    ]
  },
  lugares: {
    titulo: "Geografía de Asthar",
    items: [
      { nombre: "Aškara (Evren)", desc: "El centro financiero. Construido alrededor de un inmenso monolito de pirita, cruzado por canales de agua cristalina.", img: "/images/askara-evren.jpg" },
      { nombre: "Damyra (Helion)", desc: "La capital política. Palacios de oro brillante y piedra blanca iluminados por una intensa luz solar.", img: "/images/damyra-helion.jpg" },
      { nombre: "Eirholm (Aurelis)", desc: "Ciudad de paz y arte. Erigida sobre hielo eterno, mármol blanco y cristal bajo auroras boreales.", img: "/images/eirholm-aurelis.jpg" },
      { nombre: "Eldcraig (Vesper)", desc: "Santuario erudito. Bibliotecas y observatorios astronómicos sobre acantilados rocosos junto al mar.", img: "/images/eldcraig-vesper.jpg" },
      { nombre: "Zahari (Draken)", desc: "Monumento espiritual. Inmensos santuarios tallados directamente en la roca rojiza de cañones escarpados.", img: "/images/zahari-draken.jpg" }
    ]
  },
  clasificado: {
    titulo: "Archivos Clasificados (Nivel Evren)",
    items: [
      { nombre: "Dilución Inversa", desc: "El ADN humano no diluye la genética Numi, la concentra. Por eso, los Espontáneos desarrollan poderes mucho más fuertes e inestables que los nacidos en Asthar." },
      { nombre: "Moldavita", desc: "Vidrio originado por impacto meteórico. Utilizado por los Evren en una máquina que genera interferencias destructivas para anular y 'vaciar' los poderes de los Espontáneos." },
      { nombre: "La Anomalía Herea", desc: "La sexta luna de Plutón. Los nacidos bajo el cruce de sus restos espaciales poseen un amplificador de energía incontrolable, causando combustión si no se canaliza." },
      { nombre: "El Poder Plutoniano", desc: "La capacidad prohibida de corromper el poder Solar. Genera destrucción masiva (agujeros negros, mareas de sombras) y está penado por el Consejo de Asthar." }
    ]
  }
};

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
  </>
);

export default function GrimorioPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaLore>('linajes');

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen selection:bg-[#3B0764] selection:text-white ${academiaFont.className} relative py-16 px-6`}>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.40] mix-blend-screen">
        <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#08040C] via-transparent to-[#08040C]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver al Santuario
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Expedientes de Asthar</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(229,192,161,0.3)]">El Grimorio</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Archivos desencriptados del Registro Central. Información vital para todo iniciado y Espontáneo de la Academia Eclipse.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 border-b border-[#E5C0A1]/20 pb-4">
          {(Object.keys(DATOS_GRIMORIO) as CategoriaLore[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300 ${
                categoriaActiva === cat 
                  ? 'text-[#F4F0EB] bg-[#C8946E]/20 border border-[#C8946E]/50 shadow-[0_0_15px_rgba(200,148,110,0.3)]' 
                  : 'text-[#E5C0A1]/50 hover:text-[#C8946E] border border-transparent'
              }`}
            >
              {cat === 'linajes' ? 'Linajes' : cat === 'leyes' ? 'Doce Leyes' : cat === 'lugares' ? 'Geografía' : 'Clasificado'}
            </button>
          ))}
        </div>

        <div className="min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={categoriaActiva}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {DATOS_GRIMORIO[categoriaActiva].items.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-6 border border-[#E5C0A1]/20 relative overflow-hidden group hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(200,148,110,0.15)] transition-all duration-500 ${item.img ? 'min-h-[220px] flex flex-col justify-end' : 'bg-black/60 backdrop-blur-md'}`}
                >
                  {/* EFECTO DE IMAGEN CINEMÁTICA CON HOVER */}
                  {item.img && (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-105 opacity-40 group-hover:opacity-75 grayscale-[30%] group-hover:grayscale-0"
                        style={{ backgroundImage: `url('${item.img}')` }}
                      ></div>
                      {/* Degradado oscuro base para proteger siempre la legibilidad del texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08040C] via-[#08040C]/80 to-transparent opacity-90"></div>
                    </>
                  )}

                  <EsquinasReliquia />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl text-[#F4F0EB] mb-3 group-hover:text-[#C8946E] transition-colors drop-shadow-md">{item.nombre}</h3>
                    <p className="text-[#E5C0A1]/90 text-xs md:text-sm font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}