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

// BASE DE DATOS ZODIACAL Y KINESIS (Con las imágenes que ya tenemos)
const DATOS_ASTRALES = [
  { signo: 'Capricornio', bastion: 'Tierra', kinesis: 'Akinesis', img: '/images/ley-capricornio.jpg', desc: 'El límite y la estructura. Capacidad de inmovilizar procesos moleculares y fijaciones sinápticas.' },
  { signo: 'Acuario', bastion: 'Aire', kinesis: 'Electrokinesis', img: '/images/ley-acuario.jpg', desc: 'Dominio absoluto sobre los flujos eléctricos y la tecnología.' },
  { signo: 'Piscis', bastion: 'Agua', kinesis: 'Onirokinesis', img: '/images/ley-piscis.jpg', desc: 'Navegantes de los sueños. Capaces de proyectar realidades en mentes ajenas.' },
  { signo: 'Aries', bastion: 'Fuego', kinesis: 'Pirokinesis', img: '/images/ley-aries.jpg', desc: 'Control del fuego y la energía calórica. Pueden arder sin quemarse.' },
  { signo: 'Tauro', bastion: 'Tierra', kinesis: 'Taurokinesis', img: '/images/ley-tauro.jpg', desc: 'Capacidad de volverse físicamente indestructibles.' },
  { signo: 'Géminis', bastion: 'Aire', kinesis: 'Duplikinesis', img: '/images/ley-geminis.jpg', desc: 'El desdoblamiento. Pueden dividir su identidad en dos gemelos físicos.' },
  { signo: 'Cáncer', bastion: 'Agua', kinesis: 'Patokinesis', img: '/images/ley-cancer.jpg', desc: 'Influencia sobre emociones físicas. Capacidad de generar campos de fuerza.' },
  { signo: 'Leo', bastion: 'Fuego', kinesis: 'Heliokinesis', img: '/images/ley-leo.jpg', desc: 'Control absoluto sobre la luz. Brillas como un sol en miniatura.' },
  { signo: 'Virgo', bastion: 'Tierra', kinesis: 'Biokinesis', img: '/images/ley-virgo.jpg', desc: 'Magia celular. Sanadores capaces de reescribir y reparar tejidos vivos.' },
  { signo: 'Libra', bastion: 'Aire', kinesis: 'Gravitokinesis', img: '/images/ley-libra.jpg', desc: 'Manipulación de la gravedad. Pueden suspender objetos y personas.' },
  { signo: 'Escorpio', bastion: 'Agua', kinesis: 'Umbrakinesis', img: '/images/ley-escorpio.jpg', desc: 'Control de las sombras y la penumbra. Capacidad de canalizar energía negativa.' },
  { signo: 'Sagitario', bastion: 'Fuego', kinesis: 'Chorokinesis', img: '/images/ley-sagitario.jpg', desc: 'Materialización de flechas de energía pura y apertura de portales.' }
];

const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50 transition-colors duration-300 z-20"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50 transition-colors duration-300 z-20"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50 transition-colors duration-300 z-20"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50 transition-colors duration-300 z-20"></div>
  </>
);

const IconoDescargar = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export default function CartasAstralesPage() {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('Enero');
  const [nombre, setNombre] = useState('');
  const [resultado, setResultado] = useState<typeof DATOS_ASTRALES[0] | null>(null);
  const [analizando, setAnalizando] = useState(false);
  
  // Estados para descarga de pergamino
  const [fondoTarjeta, setFondoTarjeta] = useState<'oscura' | 'dorada'>('oscura');
  const [generandoImagen, setGenerandoImagen] = useState(false);

  const calcularSigno = (d: number, m: string) => {
    if ((m === 'Enero' && d <= 19) || (m === 'Diciembre' && d >= 22)) return 'Capricornio';
    if ((m === 'Enero' && d >= 20) || (m === 'Febrero' && d <= 18)) return 'Acuario';
    if ((m === 'Febrero' && d >= 19) || (m === 'Marzo' && d <= 20)) return 'Piscis';
    if ((m === 'Marzo' && d >= 21) || (m === 'Abril' && d <= 19)) return 'Aries';
    if ((m === 'Abril' && d >= 20) || (m === 'Mayo' && d <= 20)) return 'Tauro';
    if ((m === 'Mayo' && d >= 21) || (m === 'Junio' && d <= 20)) return 'Géminis';
    if ((m === 'Junio' && d >= 21) || (m === 'Julio' && d <= 22)) return 'Cáncer';
    if ((m === 'Julio' && d >= 23) || (m === 'Agosto' && d <= 22)) return 'Leo';
    if ((m === 'Agosto' && d >= 23) || (m === 'Septiembre' && d <= 22)) return 'Virgo';
    if ((m === 'Septiembre' && d >= 23) || (m === 'Octubre' && d <= 22)) return 'Libra';
    if ((m === 'Octubre' && d >= 23) || (m === 'Noviembre' && d <= 21)) return 'Escorpio';
    if ((m === 'Noviembre' && d >= 22) || (m === 'Diciembre' && d <= 21)) return 'Sagitario';
    return 'Capricornio';
  };

  const analizarFrecuencia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dia || parseInt(dia) < 1 || parseInt(dia) > 31) return;
    
    setAnalizando(true);
    setResultado(null);

    setTimeout(() => {
      const signoCalculado = calcularSigno(parseInt(dia), mes);
      const data = DATOS_ASTRALES.find(d => d.signo === signoCalculado);
      if (data) setResultado(data);
      setAnalizando(false);
    }, 1500); // Simulamos el escaneo mágico
  };

  // Función de descarga idéntica a la del test de casas para mantener la coherencia
  const descargarCartaAstral = () => {
    if (!resultado || generandoImagen) return;
    setGenerandoImagen(true);

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setGenerandoImagen(false);
      return;
    }

    const imagenFondo = new Image();
    imagenFondo.crossOrigin = "anonymous";
    imagenFondo.src = fondoTarjeta === 'dorada' ? '/tarjeta-dorada.jpg' : '/tarjeta-oscura.jpg';

    imagenFondo.onload = () => {
      ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);

      const textColorPrimary = fondoTarjeta === 'dorada' ? '#1E0B2B' : '#F4F0EB';
      const textColorSecondary = fondoTarjeta === 'dorada' ? '#3B1E08' : '#E5C0A1';
      const accentColor = fondoTarjeta === 'dorada' ? '#8B4513' : '#C8946E';

      if (fondoTarjeta === 'oscura') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      } else {
        ctx.shadowColor = 'rgba(59, 30, 8, 0.3)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
      }

      ctx.fillStyle = accentColor;
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('REGISTRO CENTRAL DE ASTHAR', canvas.width / 2, 140);

      ctx.fillStyle = textColorSecondary;
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`CARTA ASTRAL DE: ${nombre ? nombre.toUpperCase() : 'INICIADO'}`, canvas.width / 2, 185);

      ctx.fillStyle = textColorPrimary;
      ctx.font = 'bold 64px serif';
      ctx.fillText(`Bastión de ${resultado.bastion}`, canvas.width / 2, 260);

      ctx.fillStyle = accentColor;
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`SIGNO: ${resultado.signo.toUpperCase()}  ✦  LEY: ${resultado.kinesis.toUpperCase()}`, canvas.width / 2, 320);

      ctx.fillStyle = textColorSecondary;
      ctx.font = '24px sans-serif';
      const palabras = resultado.desc.split(' ');
      let linea = '';
      let y = 390; 
      const maxWidth = 750;

      for (let n = 0; n < palabras.length; n++) {
        const testLine = linea + palabras[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(linea, canvas.width / 2, y);
          linea = palabras[n] + ' ';
          y += 38;
        } else {
          linea = testLine;
        }
      }
      ctx.fillText(linea, canvas.width / 2, y);

      ctx.shadowColor = 'transparent';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 300, 480);
      ctx.lineTo(canvas.width / 2 + 300, 480);
      ctx.strokeStyle = fondoTarjeta === 'dorada' ? 'rgba(139, 69, 19, 0.3)' : 'rgba(229, 192, 161, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      if (fondoTarjeta === 'oscura') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      } else {
        ctx.shadowColor = 'rgba(59, 30, 8, 0.3)';
      }

      ctx.fillStyle = accentColor;
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('ELCODICEDEPLUTON.COM', canvas.width / 2 - 40, 510);
      
      ctx.textAlign = 'left';
      ctx.fillText('✦ CÓDICE DE PLUTÓN', canvas.width / 2 + 40, 510);

      try {
        const link = document.createElement('a');
        link.download = `carta-astral-${resultado.signo.toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error("Error al generar tarjeta:", err);
      } finally {
        setGenerandoImagen(false);
      }
    };

    imagenFondo.onerror = () => {
      console.error("No se pudo cargar la imagen de fondo");
      setGenerandoImagen(false);
    };
  };

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen selection:bg-[#3B0764] selection:text-white ${academiaFont.className} relative py-16 px-6`}>
      
      {/* FONDO BASE ESTELAR */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.20] mix-blend-screen">
        <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#08040C] via-transparent to-[#08040C]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* CABECERA */}
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver al Santuario
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Registro Central de Asthar</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(229,192,161,0.3)]">Generador de Carta Astral</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Introduce tu nombre y fecha de nacimiento para que el Registro Central calcule tu frecuencia Numi y tu Bastión asignado.</p>
        </div>

        {/* FORMULARIO */}
        <div className="bg-black/80 backdrop-blur-md border border-[#E5C0A1]/20 p-8 shadow-[0_0_40px_rgba(76,29,149,0.2)] relative mb-12">
          <EsquinasReliquia />
          <form onSubmit={analizarFrecuencia} className="flex flex-col items-center gap-6 relative z-10">
            
            <div className="w-full max-w-md">
              <label className="block text-[10px] uppercase tracking-widest text-[#E5C0A1]/70 mb-2 font-bold">Tu Nombre (Opcional)</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Ej: Evan" 
                className="w-full bg-[#140B1A]/80 border border-[#E5C0A1]/30 p-3 text-[#F4F0EB] focus:outline-none focus:border-[#C8946E] transition-colors text-sm"
              />
            </div>

            <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[10px] uppercase tracking-widest text-[#E5C0A1]/70 mb-2 font-bold">Día de Nacimiento</label>
                <input 
                  type="number" 
                  min="1" 
                  max="31" 
                  required
                  value={dia} 
                  onChange={(e) => setDia(e.target.value)} 
                  placeholder="20" 
                  className="w-full bg-[#140B1A]/80 border border-[#E5C0A1]/30 p-3 text-[#F4F0EB] focus:outline-none focus:border-[#C8946E] transition-colors text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] uppercase tracking-widest text-[#E5C0A1]/70 mb-2 font-bold">Mes</label>
                <select 
                  value={mes} 
                  onChange={(e) => setMes(e.target.value)} 
                  className="w-full bg-[#140B1A]/80 border border-[#E5C0A1]/30 p-3 text-[#F4F0EB] focus:outline-none focus:border-[#C8946E] transition-colors text-sm cursor-pointer appearance-none"
                >
                  {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={analizando}
              className={`mt-4 relative overflow-hidden px-8 py-3 bg-gradient-to-b from-[#1E0B2B] to-[#0A050E] text-[#F4F0EB] font-bold uppercase tracking-[0.2em] text-xs border border-[#E5C0A1]/40 shadow-[0_0_15px_rgba(76,29,149,0.3)] transition-all duration-500 ${analizando ? 'opacity-50 cursor-wait' : 'hover:shadow-[0_0_25px_rgba(200,148,110,0.5)] hover:border-[#C8946E]'}`}
            >
              {analizando ? 'Escaneando flujos...' : 'Analizar Frecuencia Astral'}
            </button>
          </form>
        </div>

        {/* RESULTADO DINÁMICO */}
        <AnimatePresence mode="wait">
          {resultado && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full border border-[#C8946E]/50 bg-black/90 backdrop-blur-xl overflow-hidden relative shadow-[0_0_50px_rgba(200,148,110,0.15)] flex flex-col md:flex-row"
            >
              {/* IMAGEN DE LA KINESIS */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative border-b md:border-b-0 md:border-r border-[#C8946E]/30">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${resultado.img})` }}
                ></div>
                {/* Degradado para fundir la imagen con el contenido en móviles */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              </div>

              {/* INFORMACIÓN Y DESCARGA */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-10">
                <span className="text-[#C8946E] text-[10px] uppercase tracking-widest font-bold mb-2">Signo Dominante: {resultado.signo}</span>
                <h2 className="text-4xl text-[#F4F0EB] mb-2 font-serif">Bastión de {resultado.bastion}</h2>
                <span className="text-[#E5C0A1] text-xs uppercase tracking-[0.3em] font-bold block mb-6">Ley Natal: {resultado.kinesis}</span>
                <p className="text-[#E5C0A1]/90 text-sm font-light leading-relaxed mb-8">{resultado.desc}</p>
                
                {/* SELECTOR Y BOTÓN DE DESCARGA */}
                <div className="w-full pt-6 border-t border-[#E5C0A1]/20 flex flex-col items-center md:items-start">
                  <p className="text-[9px] uppercase tracking-widest text-[#E5C0A1]/60 mb-3">Descargar Pergamino Oficial</p>
                  
                  <div className="flex gap-3 mb-4">
                    <button 
                      onClick={() => setFondoTarjeta('oscura')}
                      className={`w-12 h-8 bg-cover bg-center rounded-sm transition-all duration-300 ${fondoTarjeta === 'oscura' ? 'border border-[#C8946E] shadow-[0_0_10px_rgba(200,148,110,0.5)] scale-110' : 'border border-[#E5C0A1]/20 opacity-50 hover:opacity-100'}`}
                      style={{ backgroundImage: "url('/tarjeta-oscura.jpg')" }}
                      title="Versión Oscura"
                    />
                    <button 
                      onClick={() => setFondoTarjeta('dorada')}
                      className={`w-12 h-8 bg-cover bg-center rounded-sm transition-all duration-300 ${fondoTarjeta === 'dorada' ? 'border border-[#8B4513] shadow-[0_0_10px_rgba(139,69,19,0.5)] scale-110' : 'border border-[#E5C0A1]/20 opacity-50 hover:opacity-100'}`}
                      style={{ backgroundImage: "url('/tarjeta-dorada.jpg')" }}
                      title="Versión Dorada"
                    />
                  </div>

                  <button 
                    onClick={descargarCartaAstral}
                    disabled={generandoImagen}
                    className="flex items-center justify-center px-6 py-2.5 bg-[#2E1065]/80 border border-[#E5C0A1]/40 text-[#F4F0EB] font-bold uppercase tracking-widest text-[10px] hover:border-[#C8946E] hover:bg-[#3B1E08] transition-all cursor-pointer shadow-[0_0_15px_rgba(76,29,149,0.3)] w-full md:w-auto"
                  >
                    {generandoImagen ? 'Canalizando...' : (
                      <>
                        <IconoDescargar />
                        Descargar Carta
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}