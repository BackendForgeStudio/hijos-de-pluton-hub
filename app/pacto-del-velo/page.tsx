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
          <h1 className="text-4xl md:text-5xl text-[#F4F0EB] mb-4 drop-shadow-[0_0_15px_rgba(229,192,161,0.3)]">El Pacto del Velo y las Leyes de Asthar</h1>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light max-w-2xl">Compendio oficial del Consejo sobre la separación de mundos, la genética de los Espontáneos y las restricciones de poder.</p>
        </div>

        <div className="space-y-8">
          
          {/* Sección 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative">
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">I. La Naturaleza del Velo</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              Tras milenios de conflicto y convivencia entre seres humanos y capacidades superiores, el Pacto del Velo se alzó como la frontera absoluta entre la Tierra y Asthar. Su propósito principal es evitar que la volatilidad de la energía Numi contamine la lógica del plano terrestre y proteger el frágil equilibrio de ambas dimensiones. Cruzarlo sin la autorización y los protocolos de los Altos Linajes constituye un delito mayor ante el Consejo.
            </p>
          </motion.div>

          {/* Sección 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative">
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">II. La Dilución Inversa en los Espontáneos</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              Contrariamente a la creencia tradicional de que el ADN Numi presente en los humanos se diluiría con los siglos, la genética humana ha demostrado ser altamente maleable. Generación tras generación, el gen se ha concentrado y fortificado, dando lugar a los <strong>Espontáneos</strong>: individuos nacidos en la Tierra con un flujo energético considerablemente más potente, concentrado y potencialmente inestable que el de los nacidos en Asthar.
            </p>
          </motion.div>

          {/* Sección 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative">
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">III. Akinesis Cognitiva (El Sello de Recuerdos)</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              Los especialistas en contención mental de la casa Capricornio no "borran" biografías enteras (un proceso inestable y peligroso). En su lugar, intervienen durante la fase de consolidación del trauma o shock. Inmovilizan la fijación de la huella sináptica cuando un mortal presencia magia Numi, sellando las conexiones que incitarían a buscar respuestas, pero preservando intactos los vínculos afectivos esenciales.
            </p>
          </motion.div>

          {/* Sección 4 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative">
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">IV. El Peligro de la Moldavita y la Extracción Celular</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              Bajo la justificación de mantener la estabilidad del Velo, la dinastía Evren desarrolló métodos clandestinos empleando <strong>Moldavita</strong> (un vidrio de origen meteórico) en máquinas de interferencia destructiva. Estas máquinas anulan y vacían el flujo energético de los Espontáneos (como se evidenció en los casos de Alexander y Will), bajo el temor político de que su creciente poder desestabilice el orden de los Altos Linajes.
            </p>
          </motion.div>

          {/* Sección 5 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="p-8 border border-[#E5C0A1]/20 bg-black/70 backdrop-blur-md relative">
            <EsquinasReliquia />
            <h3 className="text-xl text-[#C8946E] mb-3 font-medium">V. La Anomalía Herea y el Poder Plutoniano</h3>
            <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light leading-relaxed">
              La energía de Plutón y su conexión con <strong>Herea</strong> (la sexta luna destruida del planeta) actúan como un amplificador infinito de poder. Aquellos marcados por esta conjunción (como Dante Vesper y Lola Connor) poseen un flujo tan desmedido que, sin la contención adecuada, puede calcinar el sistema nervioso desde el interior o abrir mareas negras y portales dimensionales incontrolables.
            </p>
          </motion.div>

        </div>

      </div>
    </main>
  );
}