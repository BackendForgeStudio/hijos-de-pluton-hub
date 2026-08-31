'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import localFont from 'next/font/local';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const academiaFont = localFont({
  src: '../fonts/AcademiaEclipse.ttf',
  variable: '--font-academia',
  display: 'swap',
});

interface Teoria {
  id: number;
  autor: string;
  mensaje: string;
  runas: number;
  created_at: string;
}

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50"></div>
  </>
);

export default function CirculoPage() {
  const [teorias, setTeorias] = useState<Teoria[]>([]);
  const [autor, setAutor] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState<string | null>(null);

  useEffect(() => {
    cargarTeorias();
  }, []);

  const cargarTeorias = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setTeorias([
        { id: 1, autor: "Iniciado #42", mensaje: "Cosmo no murió en el agujero negro de sombras... su anillo astral sigue emitiendo una frecuencia débil.", runas: 12, created_at: new Date().toISOString() },
        { id: 2, autor: "Sagitario Anónimo", mensaje: "¿Alguien más cree que Lucio está protegiendo a Lola a espaldas del Consejo desde el primer día?", runas: 8, created_at: new Date().toISOString() }
      ]);
      return;
    }

    const { data, error } = await supabase
      .from('teorias_pluton')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(15);

    if (!error && data) {
      setTeorias(data);
    }
  };

  const enviarTeoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !mensaje.trim()) return;

    setEnviando(true);
    setEstadoEnvio(null);

    if (!supabaseUrl || !supabaseKey) {
      setTimeout(() => {
        setTeorias([{ id: Date.now(), autor, mensaje, runas: 1, created_at: new Date().toISOString() }, ...teorias]);
        setAutor('');
        setMensaje('');
        setEnviando(false);
        setEstadoEnvio("✨ Teoría transmitida de forma encriptada por los túneles.");
      }, 600);
      return;
    }

    const { error } = await supabase
      .from('teorias_pluton')
      .insert([{ autor, mensaje, runas: 0 }]);

    if (error) {
      setEstadoEnvio("❌ Interferencia cósmica al enviar la teoría. Revisa la tabla de Supabase.");
    } else {
      setEstadoEnvio("✨ Transmisión asegurada y enviada a los sótanos de Eclipse.");
      setAutor('');
      setMensaje('');
      cargarTeorias();
    }
    setEnviando(false);
  };

  const otorgarRuna = async (id: number, runasActuales: number) => {
    const nuevasRunas = runasActuales + 1;
    
    // Actualización optimista en frontend
    setTeorias(teorias.map(t => t.id === id ? { ...t, runas: nuevasRunas } : t));

    if (supabaseUrl && supabaseKey) {
      await supabase
        .from('teorias_pluton')
        .update({ runas: nuevasRunas })
        .eq('id', id);
    }
  };

  return (
    <main className={`bg-[#050208] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6 overflow-hidden`}>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2E1065]/15 via-[#050208] to-[#050208]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/textura-grimorio.jpg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver a la Superficie
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Terminal Clandestina de Eclipse</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(76,29,149,0.5)]">La Red de Los Hijos de Plutón</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Tablón de teorías ocultas. Comparte tus sospechas sobre el Consejo y los Evren bajo un canal cifrado por los túneles subterráneos.
          </p>
        </div>

        {/* Formulario de Transmisión */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 border border-[#E5C0A1]/20 bg-black/85 backdrop-blur-md relative mb-12 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          <EsquinasReliquia />
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-[#F4F0EB]">Transmitir Mensaje Encriptado</h3>
            <span className="text-[10px] text-emerald-400 font-mono tracking-widest animate-pulse">● CANAL SEGURO ACTIVO</span>
          </div>
          
          <form onSubmit={enviarTeoria} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#C8946E] mb-1 font-bold">Alias / Pseudónimo Numi</label>
              <input 
                type="text" 
                required
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Ej. Espontáneo Anónimo" 
                className="w-full px-4 py-3 bg-black border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] focus:outline-none focus:border-[#C8946E]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#C8946E] mb-1 font-bold">Teoría o Hallazgo</label>
              <textarea 
                required
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu teoría sobre los capítulos..." 
                className="w-full px-4 py-3 bg-black border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] focus:outline-none focus:border-[#C8946E] resize-none"
              ></textarea>
            </div>
            <div className="text-right">
              <button 
                type="submit"
                disabled={enviando}
                className="px-6 py-2.5 bg-gradient-to-b from-[#1E0B2B] to-[#0A050E] text-[#F4F0EB] font-bold uppercase tracking-[0.2em] text-[10px] border border-[#E5C0A1]/40 hover:border-[#C8946E] transition-all cursor-pointer shadow-md"
              >
                {enviando ? 'Transmitiendo...' : 'Enviar a los Sótanos'}
              </button>
            </div>
          </form>

          {estadoEnvio && (
            <p className="mt-4 text-xs text-[#E5C0A1] text-center font-light">{estadoEnvio}</p>
          )}
        </motion.div>

        {/* Mural de Teorías */}
        <div className="space-y-6">
          <h3 className="text-lg text-[#C8946E] uppercase tracking-widest text-center mb-6">Transmisiones Recientes de la Resistencia</h3>
          
          {teorias.map((t) => (
            <div key={t.id} className="p-6 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative group transition-all hover:border-[#C8946E]/50">
              <EsquinasReliquia />
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-[#E5C0A1] tracking-wider">✦ {t.autor}</span>
                <span className="text-[10px] text-[#E5C0A1]/40 font-mono">{new Date(t.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-[#F4F0EB]/90 text-xs md:text-sm font-light leading-relaxed mb-4">{t.mensaje}</p>
              
              <div className="flex justify-end items-center pt-3 border-t border-[#E5C0A1]/10">
                <button 
                  onClick={() => otorgarRuna(t.id, t.runas)}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C8946E] bg-[#1E0B2B]/60 px-3 py-1.5 border border-[#E5C0A1]/30 hover:border-[#C8946E] transition-all cursor-pointer"
                >
                  <span>✦ Marcar con Runa</span>
                  <span className="bg-black px-2 py-0.5 rounded text-[#F4F0EB] font-mono">{t.runas}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}