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

// BASE DE DATOS FUSIONADA DE IMÁGENES DE LA GALERÍA
type CategoriaGaleria = 'visiones' | 'linajes' | 'leyes' | 'geografia' | 'clasificado';

interface ImagenGaleria {
  id: string;
  titulo: string;
  desc: string;
  categoria: CategoriaGaleria;
  src: string;
}

const IMAGENES: ImagenGaleria[] = [
  // VISIONES
  { id: 'v1', titulo: 'El Umbral', desc: 'El vórtice violeta en la Selva Negra.', categoria: 'visiones', src: '/images/galeria-1.jpg' },
  { id: 'v2', titulo: 'La Cascada Invertida', desc: 'El lago de Aškara donde el agua asciende hacia el cielo.', categoria: 'visiones', src: '/images/galeria-2.jpg' },
  { id: 'v3', titulo: 'El Laberinto de Asterión', desc: 'El coliseo mecánico durante El Giro.', categoria: 'visiones', src: '/images/galeria-3.jpg' },
  { id: 'v4', titulo: 'Baile de las Dos Lunas', desc: 'El salón de gala bajo la luz astral.', categoria: 'visiones', src: '/images/galeria-4.jpg' },
  { id: 'v5', titulo: 'Aula de Contención', desc: 'Turmalina negra y aislamiento absoluto.', categoria: 'visiones', src: '/images/galeria-5.jpg' },
  { id: 'v6', titulo: 'Tormenta en el Cobertizo', desc: 'Refugio subterráneo durante el caos magnético.', categoria: 'visiones', src: '/images/galeria-6.jpg' },

  // LINAJES
  { id: 'l1', titulo: 'Linaje Evren', desc: 'Dueños y custodios de la Academia Eclipse.', categoria: 'linajes', src: '/images/linaje-evren.jpg' },
  { id: 'l2', titulo: 'Linaje Helion', desc: 'La élite política y gobernantes de Damyra.', categoria: 'linajes', src: '/images/linaje-helion.jpg' },
  { id: 'l3', titulo: 'Linaje Aurelis', desc: 'Diplomáticos, pacificistas y artistas.', categoria: 'linajes', src: '/images/linaje-aurelis.jpg' },
  { id: 'l4', titulo: 'Linaje Vesper', desc: 'Eruditos e investigadores de Eldcraig.', categoria: 'linajes', src: '/images/linaje-vesper.jpg' },
  { id: 'l5', titulo: 'Linaje Draken', desc: 'Custodios de la moralidad y la ética.', categoria: 'linajes', src: '/images/linaje-draken.jpg' },
  
  // GEOGRAFÍA
  { id: 'g1', titulo: 'Aškara', desc: 'El centro financiero (Capital Evren).', categoria: 'geografia', src: '/images/askara-evren.jpg' },
  { id: 'g2', titulo: 'Damyra', desc: 'La capital política (Palacios Helion).', categoria: 'geografia', src: '/images/damyra-helion.jpg' },
  { id: 'g3', titulo: 'Eirholm', desc: 'Ciudad de paz y arte (Santuario Aurelis).', categoria: 'geografia', src: '/images/eirholm-aurelis.jpg' },
  { id: 'g4', titulo: 'Eldcraig', desc: 'Santuario erudito (Acantilados Vesper).', categoria: 'geografia', src: '/images/eldcraig-vesper.jpg' },
  { id: 'g5', titulo: 'Zahari', desc: 'Monumento espiritual (Cañones Draken).', categoria: 'geografia', src: '/images/zahari-draken.jpg' },

  // LEYES (KINESIS)
  { id: 'k1', titulo: 'Aries (Pirokinesis)', desc: 'Fuego y energía calórica.', categoria: 'leyes', src: '/images/ley-aries.jpg' },
  { id: 'k2', titulo: 'Tauro (Taurokinesis)', desc: 'Indestructibilidad física.', categoria: 'leyes', src: '/images/ley-tauro.jpg' },
  { id: 'k3', titulo: 'Géminis (Duplikinesis)', desc: 'Desdoblamiento de identidad.', categoria: 'leyes', src: '/images/ley-geminis.jpg' },
  { id: 'k4', titulo: 'Cáncer (Patokinesis)', desc: 'Escudos emocionales y campos de fuerza.', categoria: 'leyes', src: '/images/ley-cancer.jpg' },
  { id: 'k5', titulo: 'Leo (Heliokinesis)', desc: 'Control absoluto de la luz.', categoria: 'leyes', src: '/images/ley-leo.jpg' },
  { id: 'k6', titulo: 'Virgo (Biokinesis)', desc: 'Magia celular y sanación.', categoria: 'leyes', src: '/images/ley-virgo.jpg' },
  { id: 'k7', titulo: 'Libra (Gravitokinesis)', desc: 'Manipulación de la gravedad.', categoria: 'leyes', src: '/images/ley-libra.jpg' },
  { id: 'k8', titulo: 'Escorpio (Umbrakinesis)', desc: 'Control de sombras y energía negativa.', categoria: 'leyes', src: '/images/ley-escorpio.jpg' },
  { id: 'k9', titulo: 'Sagitario (Chorokinesis)', desc: 'Materialización y portales espaciales.', categoria: 'leyes', src: '/images/ley-sagitario.jpg' },
  { id: 'k10', titulo: 'Capricornio (Akinesis)', desc: 'El límite, inmovilización molecular.', categoria: 'leyes', src: '/images/ley-capricornio.jpg' },
  { id: 'k11', titulo: 'Acuario (Electrokinesis)', desc: 'Dominio sobre tecnología y electricidad.', categoria: 'leyes', src: '/images/ley-acuario.jpg' },
  { id: 'k12', titulo: 'Piscis (Onirokinesis)', desc: 'Navegantes de los sueños.', categoria: 'leyes', src: '/images/ley-piscis.jpg' },

  // CLASIFICADO
  { id: 'c1', titulo: 'Dilución Inversa', desc: 'El secreto del ADN Numi.', categoria: 'clasificado', src: '/images/clasificado-dilucion.jpg' },
  { id: 'c2', titulo: 'Moldavita', desc: 'Mecanismos de interferencia.', categoria: 'clasificado', src: '/images/clasificado-moldavita.jpg' },
  { id: 'c3', titulo: 'La Anomalía Herea', desc: 'La sexta luna de Plutón.', categoria: 'clasificado', src: '/images/clasificado-herea.jpg' },
  { id: 'c4', titulo: 'El Poder Plutoniano', desc: 'La corrupción del poder Solar.', categoria: 'clasificado', src: '/images/clasificado-plutoniano.jpg' }
];

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300 z-20"></div>
  </>
);

const IconoDescargar = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export default function GaleriaPage() {
  const [filtroActivo, setFiltroActivo] = useState<CategoriaGaleria>('visiones');
  const [imagenModal, setImagenModal] = useState<ImagenGaleria | null>(null);
  const [descargando, setDescargando] = useState(false);

  const imagenesFiltradas = IMAGENES.filter(img => img.categoria === filtroActivo);

  // FUNCIÓN PARA DESCARGAR LA IMAGEN CON LA MARCA DE AGUA EN EL CANVAS
  const descargarConMarcaDeAgua = (imagen: ImagenGaleria) => {
    if (descargando) return;
    setDescargando(true);

    const imgElement = new Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.src = imagen.src;

    imgElement.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setDescargando(false);
        return;
      }

      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(8, 4, 12, 0.75)";
      const barHeight = 80;
      ctx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);

      ctx.fillStyle = "#C8946E";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText("ELCODICEDEPLUTON.COM  ✦  SANTUARIO OFICIAL", canvas.width - 40, canvas.height - (barHeight / 2));

      ctx.fillStyle = "rgba(244, 240, 235, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText(imagen.titulo, 40, canvas.height - (barHeight / 2));

      try {
        const link = document.createElement('a');
        link.download = `el-codice-de-pluton-${imagen.titulo.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
      } catch (err) {
        console.error("Error al generar descarga:", err);
      } finally {
        setDescargando(false);
      }
    };

    imgElement.onerror = () => {
      console.error("No se pudo cargar la imagen para descargarla");
      setDescargando(false);
    };
  };

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen selection:bg-[#3B0764] selection:text-white ${academiaFont.className} relative py-16 px-6`}>
      
      {/* FONDO BASE */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.30] mix-blend-screen">
        <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#08040C] via-transparent to-[#08040C]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* CABECERA */}
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver al Santuario
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Archivo Visual</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(229,192,161,0.3)]">Galería de Asthar</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Visiones capturadas de los lugares, linajes y secretos más enigmáticos de la Academia Eclipse.</p>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 border-b border-[#E5C0A1]/20 pb-6">
          {(['visiones', 'linajes', 'leyes', 'geografia', 'clasificado'] as CategoriaGaleria[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroActivo(cat)}
              className={`px-5 py-2 text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                filtroActivo === cat 
                  ? 'text-[#F4F0EB] bg-[#C8946E]/20 border border-[#C8946E]/50 shadow-[0_0_15px_rgba(200,148,110,0.3)]' 
                  : 'text-[#E5C0A1]/50 hover:text-[#C8946E] border border-transparent'
              }`}
            >
              {cat === 'visiones' ? 'Visiones' : cat === 'linajes' ? 'Linajes' : cat === 'leyes' ? 'Kinesis' : cat === 'geografia' ? 'Lugares' : 'Clasificado'}
            </button>
          ))}
        </div>

        {/* REJILLA DE IMÁGENES */}
        <div className="min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filtroActivo}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
            >
              {imagenesFiltradas.map((imagen) => (
                <div
                  key={imagen.id}
                  className="relative w-full aspect-video group cursor-pointer border border-[#E5C0A1]/20 overflow-hidden hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(200,148,110,0.2)] transition-all bg-[#140B1A]"
                  onClick={() => setImagenModal(imagen)}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale-[40%] group-hover:grayscale-0"
                    style={{ backgroundImage: `url('${imagen.src}')` }}
                  ></div>
                  
                  {/* Degradado para mejorar la legibilidad del texto en miniatura */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:via-black/20 transition-all duration-500"></div>
                  
                  <EsquinasReliquia />
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-[#F4F0EB] text-sm md:text-base font-bold drop-shadow-md group-hover:text-[#C8946E] transition-colors">{imagen.titulo}</h3>
                    <p className="text-[9px] md:text-[10px] text-[#E5C0A1]/0 group-hover:text-[#E5C0A1]/80 uppercase tracking-widest mt-1 transition-all duration-300 line-clamp-2">{imagen.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* MODAL (VISOR A PANTALLA COMPLETA) */}
      <AnimatePresence>
        {imagenModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl cursor-pointer"
            onClick={() => setImagenModal(null)}
          >
            <div className="relative w-full max-w-6xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              
              {/* Botón Cerrar Superior */}
              <button 
                onClick={() => setImagenModal(null)} 
                className="absolute -top-10 right-0 text-[#E5C0A1]/70 hover:text-[#C8946E] text-xs uppercase tracking-widest transition-colors z-[110]"
              >
                Cerrar ✕
              </button>

              {/* Imagen en grande */}
              <motion.img 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                src={imagenModal.src} 
                alt={imagenModal.titulo}
                className="w-full max-h-[75vh] object-contain border border-[#C8946E]/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-[#08040C]"
              />
              
              {/* Barra inferior del modal con Título, Descripción y Botón de Descarga */}
              <div className="w-full mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl text-[#C8946E] font-serif">{imagenModal.titulo}</h3>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#E5C0A1]/80 mt-1">
                    {imagenModal.desc}
                  </p>
                </div>

                <button 
                  onClick={() => descargarConMarcaDeAgua(imagenModal)}
                  disabled={descargando}
                  className={`flex items-center justify-center px-6 py-3 bg-[#2E1065]/80 border text-[#F4F0EB] font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(76,29,149,0.3)] ${descargando ? 'opacity-50 cursor-wait border-[#E5C0A1]/30' : 'hover:border-[#C8946E] border-[#E5C0A1]/40 hover:bg-[#3B1E08]'}`}
                >
                  {descargando ? 'Sellando...' : (
                    <>
                      <IconoDescargar />
                      Descargar Sello
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}