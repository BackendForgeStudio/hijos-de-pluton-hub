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

export default function PactoDelVeloPage() {
  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen ${academiaFont.className} relative py-16 px-6`}>
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.40] mix-blend-screen">
        <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#08040C] via-transparent to-[#08040C]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="text-[#C8946E] text-[10px] uppercase tracking-widest hover:text-[#F4F0EB] transition-colors mb-8 border-b border-transparent hover:border-[#C8946E] pb-1">
            ← Volver al Santuario
          </Link>
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3">Manifiesto Oficial de Asthar</span>
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(229,192,161,0.3)]">El Pacto del Velo</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Las leyes fundamentales que separan el plano terrestre de la dimensión Numi y garantizan la supervivencia de ambos mundos.</p>
        </div>

        <div className="space-y-8">
          
          {/* Sección 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative"
          >
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">I. La Naturaleza del Velo</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              Tras milenios de convivencia y conflicto entre seres humanos y capacidades superiores, el Pacto del Velo se alzó como la frontera absoluta. Su propósito es evitar que la volatilidad de la energía Numi contamine la lógica del plano terrestre, y viceversa. Cruzarlo sin autorización de los Altos Linajes constituye un crimen contra el equilibrio cósmico.
            </p>
          </motion.div>

          {/* Sección 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative"
          >
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">II. Akinesis Cognitiva (El Borrado de Recuerdos)</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              Lejos de ser una reescritura total de la biografía de una persona, los especialistas en contención mental de la casa Capricornio intervienen únicamente durante la fase de inestabilidad sináptica. Se inmoviliza la consolidación del recuerdo incompatible (como presenciar una manifestación Numi), dejando intactos los vínculos afectivos pero sellando las grietas por donde los mortales intentarían buscar respuestas.
            </p>
          </motion.div>

          {/* Sección 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative"
          >
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">III. Magia Solar frente al Poder Plutoniano</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              Mientras que el poder Solar es visible, estructurado y enseñado bajo estrictos protocolos en los Bastiones de Eclipse, la energía de Plutón y la influencia de la anomalía Herea operan en las sombras. Capaz de desatar mareas negras y agujeros de gravedad, el poder plutoniano está prohibido oficialmente por el Consejo bajo el pretexto de la inestabilidad, aunque la resistencia oculta de Los Hijos de Plutón defiende que se trata de una medida de control político impuesta por los Evren.
            </p>
          </motion.div>

        </div>

      </div>
    </main>
  );
}