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

// MAPEO DE SIGNOS A BASTIONES Y KINESIS (CANON DE LA OBRA)
const DATOS_ASTRO = [
  { signo: "Aries", bastion: "Bastión de Fuego", kinesis: "Pirokinesis", desc: "Fuego mental acelerado. Tu energía es directa, afilada y letal." },
  { signo: "Tauro", bastion: "Bastión de Tierra", kinesis: "Taurokinesis", desc: "Resistencia indestructible. Tu piel se endurece como la roca volcánica." },
  { signo: "Géminis", bastion: "Bastión de Aire", kinesis: "Duplikinesis", desc: "El desdoblamiento. Capacidad de fragmentar tu identidad en dos." },
  { signo: "Cáncer", bastion: "Bastión de Agua", kinesis: "Patokinesis", desc: "Hipersensibilidad emocional y creación de escudos indestructibles." },
  { signo: "Leo", bastion: "Bastión de Fuego", kinesis: "Heliokinesis", desc: "Control absoluto sobre la luz solar. Brillas como un sol en miniatura." },
  { signo: "Virgo", bastion: "Bastión de Tierra", kinesis: "Biokinesis", desc: "Magia celular. Capacidad de sanar tejidos y reescribir la materia viva." },
  { signo: "Libra", bastion: "Bastión de Aire", kinesis: "Gravitokinesis", desc: "Dominio de la gravedad, suspensión y levitación táctica." },
  { signo: "Escorpio", bastion: "Bastión de Agua", kinesis: "Umbrakinesis", desc: "Control de las sombras y la penumbra. Frecuencia de Plutón y Herea." },
  { signo: "Sagitario", bastion: "Bastión de Aire", kinesis: "Chorokinesis", desc: "Materialización de flechas de energía y apertura de portales espaciales." },
  { signo: "Capricornio", bastion: "Bastión de Tierra", kinesis: "Akinesis", desc: "Estructura y límite atómico. Especialistas en contención y memoria." },
  { signo: "Acuario", bastion: "Bastión de Aire", kinesis: "Electrokinesis", desc: "Manipulación de flujos eléctricos, tecnología y ondas de radio." },
  { signo: "Piscis", bastion: "Bastión de Agua", kinesis: "Onirokinesis", desc: "Navegantes de los sueños, creadores de niebla y levitación sutil." }
];

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50"></div>
  </>
);

export default function CartasAstralesPage() {
  const [dia, setDia] = useState<string>('');
  const [mes, setMes] = useState<string>('1');
  const [resultado, setResultado] = useState<{ signo: string; bastion: string; kinesis: string; desc: string } | null>(null);

  const calcularSigno = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseInt(dia, 10);
    const m = parseInt(mes, 10);

    if (isNaN(d) || d < 1 || d > 31) return;

    let index = 0;
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) index = 0; // Aries
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) index = 1; // Tauro
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) index = 2; // Géminis
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) index = 3; // Cáncer
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) index = 4; // Leo
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) index = 5; // Virgo
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) index = 6; // Libra
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) index = 7; // Escorpio
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) index = 8; // Sagitario
    else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) index = 9; // Capricornio (Corregido operador)
    else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) index = 10; // Acuario
    else index = 11; // Piscis

    setResultado(DATOS_ASTRO[index]);
  };

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6`}>
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        
        <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 inline-block border-b border-transparent hover:border-[#C8946E] pb-1">
          ← Volver al Santuario
        </Link>

        <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 block">Registro Central de Asthar</span>
        <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4">Generador de Carta Astral</h1>
        <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Introduce tu fecha de nacimiento para que el Registro Central calcule tu frecuencia Numi y tu Bastión asignado.</p>

        <div className="p-8 border border-[#E5C0A1]/30 bg-black/80 backdrop-blur-md relative text-left shadow-[0_0_40px_rgba(76,29,149,0.3)]">
          <EsquinasReliquia />

          <form onSubmit={calcularSigno} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C8946E] mb-2 font-bold">Día de Nacimiento</label>
                <input 
                  type="number" 
                  min="1" 
                  max="31" 
                  required 
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  placeholder="Ej. 14" 
                  className="w-full px-4 py-3 bg-black border border-[#E5C0A1]/30 text-sm text-[#F4F0EB] focus:outline-none focus:border-[#C8946E]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C8946E] mb-2 font-bold">Mes</label>
                <select 
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-[#E5C0A1]/30 text-sm text-[#F4F0EB] focus:outline-none focus:border-[#C8946E]"
                >
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
            </div>

            <div className="text-center pt-2">
              <button 
                type="submit"
                className="relative overflow-hidden px-8 py-3 bg-gradient-to-b from-[#1E0B2B] to-[#0A050E] text-[#F4F0EB] font-bold uppercase tracking-[0.2em] text-xs border border-[#E5C0A1]/40 hover:border-[#C8946E] transition-all cursor-pointer shadow-lg"
              >
                Analizar Frecuencia Astral
              </button>
            </div>
          </form>

          <AnimatePresence>
            {resultado && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mt-8 pt-8 border-t border-[#E5C0A1]/20 text-center"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Signo Dominante: {resultado.signo}</span>
                <h3 className="text-3xl text-[#F4F0EB] mb-2">{resultado.bastion}</h3>
                <p className="text-xs text-[#C8946E] font-bold tracking-widest mb-4 uppercase">Ley Natal: {resultado.kinesis}</p>
                <p className="text-xs md:text-sm text-[#E5C0A1]/90 font-light leading-relaxed">{resultado.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </main>
  );
}