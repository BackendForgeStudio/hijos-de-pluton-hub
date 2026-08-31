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
  const [deviceId, setDeviceId] = useState<string>('');
  const [modalMensaje, setModalMensaje] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem('eclipse_device_id');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('eclipse_device_id', id);
    }
    setDeviceId(id);

    // Opcional: Autocompletar el alias si ya lo usó en este navegador antes
    const savedAlias = localStorage.getItem('eclipse_user_alias');
    if (savedAlias) setAutor(savedAlias);

    cargarTeorias();
  }, []);

  const cargarTeorias = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setTeorias([
        { id: 1, autor: "Iniciado #42", mensaje: "Cosmo no murió en el agujero negro de sombras...", runas: 12, created_at: new Date().toISOString() }
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
    if (!autor.trim() || !mensaje.trim() || !deviceId) return;

    setEnviando(true);
    setEstadoEnvio(null);

    const aliasLimpio = autor.trim();

    // 1. Verificar si el autor ya existe en la tabla de dueños
    const { data: registroAutor, error: errorRegistro } = await supabase
      .from('autores_registrados')
      .select('dispositivo_hash')
      .eq('autor', aliasLimpio)
      .single();

    if (errorRegistro && errorRegistro.code !== 'PGRST116') {
      // Error real de red/base de datos
      setEstadoEnvio("❌ Interferencia cósmica al verificar el pseudónimo.");
      setEnviando(false);
      return;
    }

    if (registroAutor) {
      // Si el autor ya existe, comprobamos si el dispositivo actual es el dueño legítimo
      if (registroAutor.dispositivo_hash !== deviceId) {
        setEstadoEnvio("⚠️ Este pseudónimo ya pertenece a otra frecuencia estelar. Elige uno propio.");
        setEnviando(false);
        return;
      }
    } else {
      // Si el autor no existe, lo registramos como propiedad de este dispositivo
      const { error: errorNuevo } = await supabase
        .from('autores_registrados')
        .insert([{ autor: aliasLimpio, dispositivo_hash: deviceId }]);

      if (errorNuevo) {
        setEstadoEnvio("❌ No se pudo reclamar este pseudónimo.");
        setEnviando(false);
        return;
      }
    }

    // 2. Guardar la teoría en el tablón
    const { error: errorTeoria } = await supabase
      .from('teorias_pluton')
      .insert([{ autor: aliasLimpio, mensaje, runas: 0 }]);

    if (errorTeoria) {
      setEstadoEnvio("❌ Error al transmitir la teoría a los sótanos.");
    } else {
      setEstadoEnvio("✨ Transmisión asegurada y enviada a los sótanos de Eclipse.");
      localStorage.setItem('eclipse_user_alias', aliasLimpio);
      setMensaje('');
      cargarTeorias();
    }
    setEnviando(false);
  };

  const otorgarRuna = async (id: number, runasActuales: number) => {
    if (!deviceId) return;

    const { data: existente } = await supabase
      .from('runas_otorgadas')
      .select('id')
      .eq('teoria_id', id)
      .eq('dispositivo_hash', deviceId)
      .single();

    if (existente) {
      setModalMensaje("⚠️ Tu frecuencia ya ha otorgado una Runa a esta transmisión anteriormente.");
      return;
    }

    const { error: errorRegistro } = await supabase
      .from('runas_otorgadas')
      .insert([{ teoria_id: id, dispositivo_hash: deviceId }]);

    if (errorRegistro) {
      setModalMensaje("⚠️ No se pudo registrar tu Runa en el Consejo.");
      return;
    }

    const nuevasRunas = runasActuales + 1;

    const { error } = await supabase
      .from('teorias_pluton')
      .update({ runas: nuevasRunas })
      .eq('id', id);

    if (!error) {
      setTeorias(teorias.map(t => t.id === id ? { ...t, runas: nuevasRunas } : t));
    }
  };

  return (
    <main className={`bg-[#050208] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6 overflow-hidden`}>
      
      {/* VENTANA MODAL FLOTANTE */}
      <AnimatePresence>
        {modalMensaje && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 border border-[#C8946E] bg-[#08040C] max-w-md w-full relative text-center shadow-[0_0_30px_rgba(200,148,110,0.3)]"
            >
              <EsquinasReliquia />
              <span className="text-[#C8946E] text-[10px] uppercase tracking-widest font-bold block mb-2">Aviso del Registro Central</span>
              <p className="text-xs md:text-sm text-[#F4F0EB] font-light mb-6 leading-relaxed">{modalMensaje}</p>
              <button 
                onClick={() => setModalMensaje(null)}
                className="px-6 py-2 bg-gradient-to-b from-[#1E0B2B] to-[#0A050E] text-[#F4F0EB] font-bold uppercase tracking-[0.2em] text-[10px] border border-[#E5C0A1]/40 hover:border-[#C8946E] transition-all cursor-pointer shadow-md"
              >
                Comprendido ✦
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
            Tablón de teorías ocultas. Canal cifrado (Tus pseudónimos quedan vinculados exclusivamente a tu frecuencia/navegador).
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
              <label className="block text-[10px] uppercase tracking-widest text-[#C8946E] mb-1 font-bold">Alias / Pseudónimo Numi (Personal y Exclusivo)</label>
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