'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import localFont from 'next/font/local';

const academiaFont = localFont({
  src: '../fonts/AcademiaEclipse.ttf',
  variable: '--font-academia',
  display: 'swap',
});

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50"></div>
  </>
);

export default function CirculoPage() {
  return (
    <main className={`bg-[#050208] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6 overflow-hidden`}>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2E1065]/10 via-[#050208] to-[#050208]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/textura-grimorio.jpg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver a la Superficie
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Sótanos de Eclipse</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(76,29,149,0.5)]">Los Hijos de Plutón</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            "Dejamos de buscar una revolución y nos convertimos en una red de contención oculta." Únete a la resistencia de Dante y Evan en las sombras de Asthar.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 md:p-12 border border-[#E5C0A1]/20 bg-black/80 backdrop-blur-md relative text-center shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <EsquinasReliquia />
          
          <div className="mb-8">
            <svg className="w-16 h-16 mx-auto text-[#C8946E] drop-shadow-[0_0_15px_rgba(200,148,110,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>

          <h3 className="text-2xl text-[#F4F0EB] mb-4">El Santuario de la Comunidad</h3>
          <p className="text-[#E5C0A1]/70 text-sm font-light mb-8 max-w-lg mx-auto">
            El Consejo prohíbe el uso de la energía plutoniana. Aquí, debatimos teorías sobre la Moldavita, Herea y el futuro de Asthar lejos de los ojos de los Altos Linajes.
          </p>

          <a 
            href="https://discord.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block relative overflow-hidden px-10 py-4 bg-gradient-to-b from-[#1E0B2B] to-[#0A050E] text-[#F4F0EB] font-bold uppercase tracking-[0.2em] text-xs border border-[#C8946E]/50 shadow-[0_0_20px_rgba(76,29,149,0.5)] hover:shadow-[0_0_30px_rgba(200,148,110,0.6)] hover:border-[#C8946E] transition-all duration-500 group"
          >
            <span className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#E5C0A1]/20 to-transparent -skew-x-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative z-10 flex items-center gap-3">
              Conectar al Círculo (Discord) ✦
            </span>
          </a>
        </motion.div>

        <div className="mt-12 text-center text-[10px] uppercase tracking-widest text-[#E5C0A1]/40">
          <p>Solo para Espontáneos confirmados. Mantén tu presencia oculta.</p>
        </div>

      </div>
    </main>
  );
}