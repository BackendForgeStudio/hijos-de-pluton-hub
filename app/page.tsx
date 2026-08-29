'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const academiaFont = localFont({
  src: './fonts/AcademiaEclipse.ttf',
  variable: '--font-academia',
  display: 'swap',
});

const PROFECIAS = [
  "“Bajo la sombra de Plutón, ningún secreto permanece enterrado para siempre.”",
  "“La Academia Eclipse no elige a sus alumnos; las constelaciones trazan su destino.”",
  "“Cuando el anillo se alinee, el verdadero rostro del eclipse será revelado.”",
  "“La luz guía a los inexpertos, pero solo los hijos de la oscuridad dominan el cosmos.”",
  "“Un pacto sellado en noviembre jamás podrá romperse bajo la luz de la luna.”"
];

export default function CodicePlutonPage() {
  const [profeciaActual, setProfeciaActual] = useState("Pulsa el cristal para invocar tu profecía diaria.");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-19T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const consultarOraculo = () => {
    const randomIndex = Math.floor(Math.random() * PROFECIAS.length);
    setProfeciaActual(PROFECIAS[randomIndex]);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen selection:bg-[#3B0764] selection:text-white ${academiaFont.className}`}>
      
      {/* 1. GRAN BANNER (HERO) ASTRAL */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden isolate">
        
        <div 
          className="absolute inset-0 bg-cover bg-center -z-30 opacity-60"
          style={{ backgroundImage: "url('/fondo-astral.png')" }}
        ></div>

        <motion.img
          src="/anillo.png"
          alt="Anillo Astrológico"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          className="absolute w-[1100px] h-[1100px] max-w-none -z-20 opacity-85 object-contain"
        />

        {/* Planeta con resplandor púrpura oscurecido */}
        <div className="absolute w-[520px] h-[520px] -z-10 flex items-center justify-center">
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-[#2E1065] to-[#4C1D95] rounded-full blur-[90px] opacity-80"></div>
          <img
            src="/planeta-oficial.png"
            alt="Planeta Oficial Los Hijos de Plutón"
            className="absolute w-full h-full object-contain drop-shadow-[0_0_60px_rgba(76,29,149,0.85)] opacity-95 brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-[#3B0764]/30 rounded-full blur-2xl pointer-events-none z-10 mix-blend-screen"></div>
        </div>

        <img
          src="/estrella.png"
          alt="Estrella Polar"
          className="absolute top-[calc(50%-380px)] -translate-y-1/2 w-40 h-40 z-30 drop-shadow-[0_0_35px_rgba(229,192,161,1)] object-contain"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-4"
        >
          <h1 className="font-normal text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5EE] via-[#E5C0A1] to-[#A26D45] drop-shadow-[0_10px_30px_rgba(0,0,0,1)] filter brightness-110 contrast-125 tracking-wider text-center mb-4">
            EL CÓDICE<br />DE PLUTÓN
          </h1>
          <p className="text-[#E5C0A1]/90 text-sm md:text-base font-light tracking-[0.2em] uppercase text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            El santuario para los lectores y fans de Los Hijos de Plutón
          </p>
        </motion.div>
        
        <div 
          onClick={() => scrollToSection('oraculo-diario')}
          className="absolute bottom-8 cursor-pointer px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C0A1]/20 shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:border-[#C8946E]/50 transition-all z-30"
        >
          <span className="text-[#C8946E] text-xs tracking-widest uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Desciende a las sombras
          </span>
        </div>
      </section>

      {/* 2. NAVEGACIÓN ADHESIVA */}
      <nav className="sticky top-0 z-50 bg-[#08040C]/90 backdrop-blur-md border-b border-[#E5C0A1]/20 py-4 px-6">
        <ul className="flex justify-center gap-6 md:gap-12 text-xs uppercase tracking-[0.2em] font-bold text-[#E5C0A1]/80">
          <li onClick={() => scrollToSection('lore')} className="hover:text-white cursor-pointer transition-colors">La Obra</li>
          <li onClick={() => scrollToSection('oraculo-diario')} className="hover:text-white cursor-pointer transition-colors">Oráculo Diario</li>
          <li onClick={() => scrollToSection('merch')} className="hover:text-white cursor-pointer transition-colors">Reliquias</li>
          <li onClick={() => scrollToSection('discord')} className="hover:text-white cursor-pointer transition-colors">Discord</li>
          <li onClick={() => scrollToSection('faq')} className="hover:text-white cursor-pointer transition-colors">FAQ</li>
        </ul>
      </nav>

      {/* 3. SECCIÓN: CUENTA ATRÁS */}
      <section className="py-16 bg-[#0F0814] border-b border-[#E5C0A1]/10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#C8946E] text-xs uppercase tracking-[0.4em] mb-4 font-bold">Próximo Alineamiento del Eclipse</p>
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto text-[#F4F0EB]">
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-4 rounded backdrop-blur-sm">
              <span className="text-3xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.days}</span>
              <p className="text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Días</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-4 rounded backdrop-blur-sm">
              <span className="text-3xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.hours}</span>
              <p className="text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Horas</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-4 rounded backdrop-blur-sm">
              <span className="text-3xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.minutes}</span>
              <p className="text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Min</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-4 rounded backdrop-blur-sm">
              <span className="text-3xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.seconds}</span>
              <p className="text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Seg</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAJAS INTERACTIVAS: DISEÑO ASIMÉTRICO */}
      <section id="lore" className="py-36 px-6 relative bg-[#08040C] overflow-hidden">
        <div className="absolute top-1/4 left-5 w-[500px] h-[500px] bg-[#3B0764]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-5 w-[500px] h-[500px] bg-[#C8946E]/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl text-[#F4F0EB] mb-3 tracking-wider">Los Archivos del Códice</h2>
            <p className="text-[#E5C0A1]/70 text-sm tracking-[0.3em] uppercase">Explora los misterios de la Academia Eclipse</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/90 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-xl relative group cursor-pointer shadow-[0_0_30px_rgba(76,29,149,0.15)] transition-all md:mt-0"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E5C0A1]"></div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-3 font-bold">Volumen I</span>
              <h3 className="text-2xl text-[#F4F0EB] mb-3 tracking-wide">La Obra y el Lore</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed mb-6">
                Descubre los secretos detrás de <span className="text-[#F4F0EB] italic">Los Hijos de Plutón</span>. Sumérgete en el trasfondo de la Academia Eclipse y sus enigmas ocultos.
              </p>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C8946E] font-bold group-hover:underline">Leer manuscrito →</span>
            </motion.div>

            <motion.div 
              id="merch"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/90 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-xl relative group cursor-pointer shadow-[0_0_30px_rgba(76,29,149,0.15)] transition-all md:mt-16"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E5C0A1]"></div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-3 font-bold">Artefactos</span>
              <h3 className="text-2xl text-[#F4F0EB] mb-3 tracking-wide">Reliquias y Merch</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed mb-6">
                Coleccionables oficiales. Ediciones especiales, marcapáginas rituales, láminas astrológicas y artefactos únicos para auténticos fans de la saga.
              </p>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C8946E] font-bold group-hover:underline">Explorar tienda →</span>
            </motion.div>

            <motion.div 
              id="discord"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/90 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-xl relative group cursor-pointer shadow-[0_0_30px_rgba(76,29,149,0.15)] transition-all md:mt-4"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E5C0A1]"></div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-3 font-bold">Comunidad</span>
              <h3 className="text-2xl text-[#F4F0EB] mb-3 tracking-wide">El Círculo (Discord)</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed mb-6">
                Únete a nuestra comunidad secreta en Discord. Debates sobre la trama, canales de teorías y eventos en directo con los autores de la novela.
              </p>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C8946E] font-bold group-hover:underline">Unirse al santuario →</span>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/90 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-xl relative group cursor-pointer shadow-[0_0_30px_rgba(76,29,149,0.15)] transition-all md:mt-24"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E5C0A1]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E5C0A1]"></div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-3 font-bold">Manuscritos</span>
              <h3 className="text-2xl text-[#F4F0EB] mb-3 tracking-wide">Capítulos Inéditos</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed mb-6">
                Escenas eliminadas y perspectivas secundarias exclusivas que expanden la historia más allá de las páginas impresas.
              </p>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C8946E] font-bold group-hover:underline">Desvelar secretos →</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. SECCIÓN INTERACTIVA: EL ORÁCULO DIARIO */}
      <section id="oraculo-diario" className="py-28 px-6 bg-gradient-to-b from-[#08040C] via-[#120718] to-[#08040C] border-y border-[#E5C0A1]/15 text-center relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[#C8946E] uppercase tracking-[0.4em] text-xs font-bold block mb-3">Consulta mística</span>
          <h2 className="text-4xl text-[#F4F0EB] mb-6">El Oráculo de Plutón</h2>
          <p className="text-[#E5C0A1]/80 text-sm md:text-base font-light mb-10">
            Regresa cada día a consultar los designios de la Academia Eclipse. Pulsa el sello para revelar la profecía oculta que marcará tu jornada.
          </p>

          <div className="p-8 bg-black/60 border border-[#E5C0A1]/40 backdrop-blur-md mb-8 shadow-[0_0_40px_rgba(76,29,149,0.25)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#08040C] px-4 text-[#C8946E] text-xs uppercase tracking-widest border border-[#E5C0A1]/30">Profecía del día</div>
            <p className="text-xl md:text-2xl text-[#F4F0EB] italic font-light tracking-wide min-h-[80px] flex items-center justify-center">
              {profeciaActual}
            </p>
          </div>

          <button 
            onClick={consultarOraculo}
            className="px-8 py-4 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase tracking-widest text-xs hover:bg-[#C8946E] hover:text-black transition-all shadow-[0_0_25px_rgba(46,16,101,0.7)] border border-[#E5C0A1]/30 cursor-pointer"
          >
            Invocar Nueva Profecía
          </button>
        </div>
      </section>

      {/* 6. SECCIÓN FAQ / SEO OPTIMIZADA PARA GOOGLE */}
      <section id="faq" className="py-28 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C8946E] uppercase tracking-[0.4em] text-xs font-bold block mb-3">Base de Conocimiento</span>
            <h2 className="text-3xl md:text-4xl text-[#F4F0EB]">Preguntas Frecuentes sobre la Obra</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-[#0F0814]/80 border border-[#E5C0A1]/20">
              <h3 className="text-xl text-[#F4F0EB] mb-2 font-medium">¿De qué trata la novela de Los Hijos de Plutón?</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed">
                Es una obra de fantasía, misterio y suspense creada en coautoría por Augusta Thoenig y Fran de Solas, ambientada en el enigmático universo de la Academia Eclipse, donde las constelaciones, los pactos y los enigmas estelares guían el destino de sus protagonistas.
              </p>
            </div>

            <div className="p-6 bg-[#0F0814]/80 border border-[#E5C0A1]/20">
              <h3 className="text-xl text-[#F4F0EB] mb-2 font-medium">¿Qué es El Códice de Plutón?</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed">
                Es el santuario digital y portal oficial de la comunidad de lectores de la novela, un espacio interactivo para consultar el lore, acceder a merchandising oficial, participar en el servidor de Discord y descubrir contenidos inéditos.
              </p>
            </div>

            <div className="p-6 bg-[#0F0814]/80 border border-[#E5C0A1]/20">
              <h3 className="text-xl text-[#F4F0EB] mb-2 font-medium">¿Cuándo se revelan los próximos secretos de la Academia Eclipse?</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed">
                El próximo gran hito y alineamiento de la comunidad está programado para el 19 de noviembre, fecha límite para los registros en el Oráculo de Admisión y anuncios exclusivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAPTACIÓN (EL ORÁCULO DE ADMISIÓN) */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#08040C]">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl text-[#F4F0EB] mb-4">Inscripción a la Academia</h2>
          <p className="text-[#E5C0A1]/80 mb-10 font-light text-sm md:text-base">Inscribe tu nombre antes del 19 de noviembre y recibe un artefacto digital exclusivo para tus estudios en El Códice de Plutón.</p>
          
          <form className="flex flex-col md:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              className="px-6 py-4 bg-black/50 border border-[#E5C0A1]/30 rounded-none focus:outline-none focus:border-[#C8946E] text-[#F4F0EB] md:w-96 shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all placeholder:text-[#E5C0A1]/50 tracking-wider"
            />
            <button className="px-8 py-4 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase tracking-wider text-sm hover:bg-[#C8946E] hover:text-black transition-all shadow-[0_0_20px_rgba(46,16,101,0.5)] hover:shadow-[0_0_25px_rgba(200,148,110,0.6)] border border-[#E5C0A1]/20 cursor-pointer">
              Sellar Pacto
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}