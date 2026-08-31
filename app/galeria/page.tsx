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

const VISIONES = [
  { id: 1, src: '/images/galeria-1.jpg', titulo: 'El Umbral', desc: 'El vórtice violeta en la Selva Negra.' },
  { id: 2, src: '/images/galeria-2.jpg', titulo: 'La Cascada Invertida', desc: 'El lago de Aškara donde el agua asciende hacia el cielo.' },
  { id: 3, src: '/images/galeria-3.jpg', titulo: 'El Laberinto de Asterión', desc: 'El coliseo mecánico durante El Giro.' },
  { id: 4, src: '/images/galeria-4.jpg', titulo: 'El Aula de Contención', desc: 'Turmalina negra y aislamiento absoluto.' },
  { id: 5, src: '/images/galeria-5.jpg', titulo: 'El Cobertizo', desc: 'Refugio subterráneo durante la tormenta magnética.' },
  { id: 6, src: '/images/galeria-6.jpg', titulo: 'El Auditorio', desc: 'Sede del Consejo de Asthar.' }
];

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
  </>
);

export default function GaleriaPage() {
  const [imagenActiva, setImagenActiva] = useState<{ src: string; titulo: string; desc: string } | null>(null);

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6`}>
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver al Santuario
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Archivo Visual</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4">Galería de Asthar</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Visiones capturadas de los lugares más enigmáticos de la Academia Eclipse y sus dominios.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VISIONES.map((vision) => (
            <motion.div 
              key={vision.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setImagenActiva(vision)}
              className="h-72 border border-[#E5C0A1]/20 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#C8946E] transition-all duration-300"
              style={{ backgroundImage: `url('${vision.src}')`, backgroundColor: '#140B1A' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/20 transition-all duration-500"></div>
              <EsquinasReliquia />
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg text-[#F4F0EB] font-medium group-hover:text-[#C8946E] transition-colors">{vision.titulo}</h3>
                <p className="text-[10px] text-[#E5C0A1]/0 group-hover:text-[#E5C0A1]/80 uppercase tracking-widest mt-2 transition-all duration-300">{vision.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {imagenActiva && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setImagenActiva(null)} 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setImagenActiva(null)} className="absolute -top-12 right-0 text-[#E5C0A1] hover:text-[#C8946E] text-xs uppercase tracking-widest transition-colors">
                Cerrar ✕
              </button>
              <img src={imagenActiva.src} alt={imagenActiva.titulo} className="max-h-[75vh] w-auto border border-[#E5C0A1]/30 shadow-[0_0_50px_rgba(76,29,149,0.3)] object-contain bg-[#08040C]" />
              <div className="mt-6 text-center">
                <h3 className="text-2xl text-[#C8946E] mb-2">{imagenActiva.titulo}</h3>
                <p className="text-[#E5C0A1]/80 text-sm font-light tracking-widest uppercase">{imagenActiva.desc}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}