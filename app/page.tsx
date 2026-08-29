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

// PREGUNTAS DEL TEST DE ASIGNACIÓN
const PREGUNTAS_TEST = [
  {
    pregunta: "¿Qué prefieres cuando cae la medianoche en la Academia Eclipse?",
    opciones: [
      { texto: "Fundirme con las sombras y observar los secretos sin ser visto.", casa: "Umbra" },
      { texto: "Encender un farol de luz pura para disipar los misterios oscuros.", casa: "Lux" },
      { texto: "Estudiar el mapa estelar y decodificar los designios del cosmos.", casa: "Astra" }
    ]
  },
  {
    pregunta: "¿Cuál consideras que es tu mayor virtud ante un enigma insondable?",
    opciones: [
      { texto: "La paciencia táctica y el sigilo absoluto.", casa: "Umbra" },
      { texto: "La lógica incisiva y la revelación de la verdad.", casa: "Lux" },
      { texto: "La intuición guiada por las alineaciones astrales.", casa: "Astra" }
    ]
  },
  {
    pregunta: "Si pudieras elegir un emblema para grabar en tu escudo, sería...",
    opciones: [
      { texto: "Un eclipse total devorando el brillo del sol.", casa: "Umbra" },
      { texto: "Un haz de luz pura atravesando un prisma cristalino.", casa: "Lux" },
      { texto: "Una constelación oculta que cambia de forma.", casa: "Astra" }
    ]
  }
];

const CASAS_INFO: Record<string, { nombre: string; descripcion: string; emblema: string }> = {
  Umbra: {
    nombre: "Casa Umbra Noctis",
    descripcion: "Herederos del eco y la oscuridad. Dominas el arte de moverte sin dejar rastro, comprendiendo que los secretos más profundos solo se revelan en el silencio de las sombras.",
    emblema: "🌑 El Sello de la Oscuridad Táctica"
  },
  Lux: {
    nombre: "Casa Lux Aeterna",
    descripcion: "Guardianes del prisma y la revelación. Tu linaje busca siempre la verdad absoluta, utilizando el poder de la luz para iluminar los rincones más ocultos del cosmos.",
    emblema: "✨ El Faro del Espejo Lumínico"
  },
  Astra: {
    nombre: "Casa Astra Nova",
    descripcion: "Tejedores del destino estelar. Vinculados directamente a los movimientos celestes, interpretáis las constelaciones antes de que escriban el futuro de la Academia.",
    emblema: "🌌 El Astrolabio del Firmamento"
  }
};

export default function CodicePlutonPage() {
  const [profeciaActual, setProfeciaActual] = useState("Pulsa el cristal para invocar tu profecía diaria.");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Estados del Test de Asignación
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntosCasas, setPuntosCasas] = useState({ Umbra: 0, Lux: 0, Astra: 0 });
  const [casaResultado, setCasaResultado] = useState<string | null>(null);

  // Estado del Enigma Semanal
  const [respuestaEnigma, setRespuestaEnigma] = useState("");
  const [mensajeEnigma, setMensajeEnigma] = useState("");

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

  const seleccionarRespuesta = (casa: string) => {
    const nuevosPuntos = { ...puntosCasas, [casa]: puntosCasas[casa as keyof typeof puntosCasas] + 1 };
    setPuntosCasas(nuevosPuntos);

    if (preguntaActual + 1 < PREGUNTAS_TEST.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      const ganadora = Object.keys(nuevosPuntos).reduce((a, b) => 
        nuevosPuntos[a as keyof typeof nuevosPuntos] > nuevosPuntos[b as keyof typeof nuevosPuntos] ? a : b
      );
      setCasaResultado(ganadora);
    }
  };

  const reiniciarTest = () => {
    setPreguntaActual(0);
    setPuntosCasas({ Umbra: 0, Lux: 0, Astra: 0 });
    setCasaResultado(null);
  };

  const verificarEnigma = (e: React.FormEvent) => {
    e.preventDefault();
    if (respuestaEnigma.toLowerCase().trim() === "plutón" || respuestaEnigma.toLowerCase().trim() === "pluton") {
      setMensajeEnigma("✨ ¡Correcto! Has descifrado el sello. El capítulo inédito ha sido desbloqueado en los archivos secretos.");
    } else {
      setMensajeEnigma("❌ Las estrellas guardan silencio. Esa no es la palabra clave del eclipse.");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
      <section className="relative h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden isolate transform-gpu">
        
        <div 
          className="absolute inset-0 bg-cover bg-center -z-30 opacity-60"
          style={{ backgroundImage: "url('/fondo-astral.png')" }}
        ></div>

        <motion.img
          src="/anillo.png"
          alt="Anillo Astrológico"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="absolute w-[700px] h-[700px] md:w-[1100px] md:h-[1100px] max-w-none -z-20 opacity-85 object-contain pointer-events-none select-none transform-gpu"
        />

        <div className="absolute w-[380px] h-[380px] md:w-[520px] md:h-[520px] -z-10 flex items-center justify-center pointer-events-none transform-gpu">
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-[#2E1065] to-[#4C1D95] rounded-full blur-[60px] md:blur-[90px] opacity-80"></div>
          <img
            src="/planeta-oficial.png"
            alt="Planeta Oficial Los Hijos de Plutón"
            className="absolute w-full h-full object-contain drop-shadow-[0_0_40px_rgba(76,29,149,0.7)] opacity-95 brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-[#3B0764]/30 rounded-full blur-xl pointer-events-none z-10 mix-blend-screen"></div>
        </div>

        <img
          src="/estrella.png"
          alt="Estrella Polar"
          className="absolute top-[calc(50%-300px)] md:top-[calc(50%-380px)] -translate-y-1/2 w-24 h-24 md:w-40 md:h-40 z-30 drop-shadow-[0_0_25px_rgba(229,192,161,1)] object-contain pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-4 transform-gpu"
        >
          <h1 className="font-normal text-4xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5EE] via-[#E5C0A1] to-[#A26D45] drop-shadow-[0_8px_25px_rgba(0,0,0,1)] filter brightness-110 contrast-125 tracking-wider text-center mb-3">
            EL CÓDICE<br />DE PLUTÓN
          </h1>
          <p className="text-[#E5C0A1]/90 text-[11px] sm:text-xs md:text-base font-light tracking-[0.2em] uppercase text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-2">
            El santuario para los lectores y fans de Los Hijos de Plutón
          </p>
        </motion.div>
        
        <div 
          onClick={() => scrollToSection('oraculo-diario')}
          className="absolute bottom-6 cursor-pointer px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C0A1]/20 shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:border-[#C8946E]/50 transition-all z-30"
        >
          <span className="text-[#C8946E] text-[11px] md:text-xs tracking-widest uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Desciende a las sombras
          </span>
        </div>
      </section>

      {/* 2. NAVEGACIÓN ADHESIVA COMPLETA */}
      <nav className="sticky top-0 z-50 bg-[#08040C]/95 backdrop-blur-md border-b border-[#E5C0A1]/20 py-3 px-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex justify-start md:justify-center gap-5 md:gap-8 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#E5C0A1]/80 min-w-max px-2">
          <li onClick={() => scrollToSection('lore')} className="hover:text-white cursor-pointer transition-colors py-1">La Obra</li>
          <li onClick={() => scrollToSection('oraculo-diario')} className="hover:text-white cursor-pointer transition-colors py-1">Oráculo</li>
          <li onClick={() => scrollToSection('test-casas')} className="hover:text-white cursor-pointer transition-colors py-1">Test Casas</li>
          <li onClick={() => scrollToSection('grimorio')} className="hover:text-white cursor-pointer transition-colors py-1">Grimorio</li>
          <li onClick={() => scrollToSection('enigma')} className="hover:text-white cursor-pointer transition-colors py-1">Enigma</li>
          <li onClick={() => scrollToSection('galeria')} className="hover:text-white cursor-pointer transition-colors py-1">Galería</li>
          <li onClick={() => scrollToSection('merch')} className="hover:text-white cursor-pointer transition-colors py-1">Reliquias</li>
          <li onClick={() => scrollToSection('discord')} className="hover:text-white cursor-pointer transition-colors py-1">Discord</li>
          <li onClick={() => scrollToSection('faq')} className="hover:text-white cursor-pointer transition-colors py-1">FAQ</li>
        </ul>
      </nav>

      {/* 3. SECCIÓN: CUENTA ATRÁS */}
      <section className="py-14 bg-[#0F0814] border-b border-[#E5C0A1]/10 text-center transform-gpu">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#C8946E] text-xs uppercase tracking-[0.4em] mb-4 font-bold">Próximo Alineamiento del Eclipse</p>
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto text-[#F4F0EB]">
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 md:p-4 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.days}</span>
              <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Días</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 md:p-4 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.hours}</span>
              <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Horas</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 md:p-4 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.minutes}</span>
              <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Min</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 md:p-4 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-4xl font-bold text-[#E5C0A1]">{timeLeft.seconds}</span>
              <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Seg</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAJAS INTERACTIVAS: DISEÑO ASIMÉTRICO */}
      <section id="lore" className="py-28 md:py-36 px-6 relative bg-[#08040C] overflow-hidden transform-gpu">
        <div className="absolute top-1/4 left-5 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#3B0764]/10 rounded-full blur-[80px] md:blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-5 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#C8946E]/10 rounded-full blur-[80px] md:blur-[140px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl text-[#F4F0EB] mb-3 tracking-wider">Los Archivos del Códice</h2>
            <p className="text-[#E5C0A1]/70 text-xs md:text-sm tracking-[0.3em] uppercase">Explora los misterios de la Academia Eclipse</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/95 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-md relative group cursor-pointer shadow-[0_0_20px_rgba(76,29,149,0.15)] transition-all md:mt-0 transform-gpu"
            >
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
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/95 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-md relative group cursor-pointer shadow-[0_0_20px_rgba(76,29,149,0.15)] transition-all md:mt-16 transform-gpu"
            >
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
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/95 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-md relative group cursor-pointer shadow-[0_0_20px_rgba(76,29,149,0.15)] transition-all md:mt-4 transform-gpu"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-3 font-bold">Comunidad</span>
              <h3 className="text-2xl text-[#F4F0EB] mb-3 tracking-wide">El Círculo (Discord)</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed mb-6">
                Únete a nuestra comunidad secreta en Discord. Debates sobre la trama, canales de teorías y eventos en directo con los autores de la novela.
              </p>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C8946E] font-bold group-hover:underline">Unirse al santuario →</span>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="p-8 bg-gradient-to-b from-[#140B1A]/95 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 hover:border-[#C8946E] backdrop-blur-md relative group cursor-pointer shadow-[0_0_20px_rgba(76,29,149,0.15)] transition-all md:mt-24 transform-gpu"
            >
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
      <section id="oraculo-diario" className="py-24 px-6 bg-gradient-to-b from-[#08040C] via-[#120718] to-[#08040C] border-y border-[#E5C0A1]/15 text-center relative transform-gpu">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[#C8946E] uppercase tracking-[0.4em] text-xs font-bold block mb-3">Consulta mística</span>
          <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-6">El Oráculo de Plutón</h2>
          <p className="text-[#E5C0A1]/80 text-sm md:text-base font-light mb-10">
            Regresa cada día a consultar los designios de la Academia Eclipse. Pulsa el sello para revelar la profecía oculta que marcará tu jornada.
          </p>

          <div className="p-6 md:p-8 bg-black/60 border border-[#E5C0A1]/40 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(76,29,149,0.2)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#08040C] px-4 text-[#C8946E] text-xs uppercase tracking-widest border border-[#E5C0A1]/30">Profecía del día</div>
            <p className="text-lg md:text-2xl text-[#F4F0EB] italic font-light tracking-wide min-h-[80px] flex items-center justify-center">
              {profeciaActual}
            </p>
          </div>

          <button 
            onClick={consultarOraculo}
            className="px-8 py-4 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase tracking-widest text-xs hover:bg-[#C8946E] hover:text-black transition-all shadow-[0_0_20px_rgba(46,16,101,0.6)] border border-[#E5C0A1]/30 cursor-pointer"
          >
            Invocar Nueva Profecía
          </button>
        </div>
      </section>

      {/* 6. TEST DE ASIGNACIÓN (CASAS DE LA ACADEMIA) */}
      <section id="test-casas" className="py-28 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10 text-center relative transform-gpu">
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[#C8946E] uppercase tracking-[0.4em] text-xs font-bold block mb-3">Ritual de Iniciación</span>
          <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-4">¿A qué Casa perteneces?</h2>
          <p className="text-[#E5C0A1]/80 text-sm md:text-base font-light mb-12">
            Responde con sinceridad a los designios estelares de la Academia Eclipse y descubre cuál de las casas de la novela rige tu destino.
          </p>

          <div className="p-6 md:p-10 bg-gradient-to-b from-[#140B1A]/90 to-[#0A050E]/95 border-2 border-[#E5C0A1]/30 backdrop-blur-md shadow-[0_0_40px_rgba(76,29,149,0.2)] text-left relative">
            
            {!casaResultado ? (
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-[#E5C0A1]/20 pb-4">
                  <span className="text-xs uppercase tracking-widest text-[#C8946E] font-bold">Enigma {preguntaActual + 1} de {PREGUNTAS_TEST.length}</span>
                  <span className="text-xs text-[#E5C0A1]/60">Academia Eclipse</span>
                </div>

                <h3 className="text-xl md:text-2xl text-[#F4F0EB] mb-8 font-light tracking-wide">
                  {PREGUNTAS_TEST[preguntaActual].pregunta}
                </h3>

                <div className="space-y-4">
                  {PREGUNTAS_TEST[preguntaActual].opciones.map((opcion, index) => (
                    <button
                      key={index}
                      onClick={() => seleccionarRespuesta(opcion.casa)}
                      className="w-full text-left p-4 bg-black/50 border border-[#E5C0A1]/20 hover:border-[#C8946E] hover:bg-[#2E1065]/40 text-[#F4F0EB] text-sm md:text-base transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span>{opcion.texto}</span>
                      <span className="text-[#C8946E] opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="text-xs uppercase tracking-[0.4em] text-[#C8946E] block mb-2 font-bold">Tu destino ha sido revelado</span>
                <h3 className="text-3xl md:text-4xl text-[#F4F0EB] mb-4 font-normal">{CASAS_INFO[casaResultado].nombre}</h3>
                <p className="text-[#E5C0A1] text-xs uppercase tracking-widest mb-6 font-bold">{CASAS_INFO[casaResultado].emblema}</p>
                <p className="text-[#E5C0A1]/90 text-base font-light leading-relaxed mb-8">
                  {CASAS_INFO[casaResultado].descripcion}
                </p>
                <button
                  onClick={reiniciarTest}
                  className="px-8 py-3 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase tracking-widest text-xs hover:bg-[#C8946E] hover:text-black transition-all border border-[#E5C0A1]/30 cursor-pointer"
                >
                  Consultar de nuevo tu destino
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 7. EL GRIMORIO INTERACTIVO (PERSONAJES Y LORE) */}
      <section id="grimorio" className="py-28 px-6 bg-[#0B0510] border-b border-[#E5C0A1]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C8946E] uppercase tracking-[0.4em] text-xs font-bold block mb-3">Enciclopedia Viva</span>
            <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-4">El Grimorio de la Academia</h2>
            <p className="text-[#E5C0A1]/80 text-sm font-light">Conoce los expedientes de los iniciados y los misterios de las constelaciones principales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-black/40 border border-[#E5C0A1]/20 hover:border-[#C8946E] transition-all">
              <span className="text-xs text-[#C8946E] uppercase tracking-widest font-bold">Iniciado Destacado</span>
              <h3 className="text-2xl text-[#F4F0EB] mt-2 mb-3">Los Custodios de la Sombra</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed">
                Expedientes clasificados sobre aquellos que aprendieron a dominar el eco estelar en los pasillos subterráneos de Plutón.
              </p>
            </div>
            <div className="p-6 bg-black/40 border border-[#E5C0A1]/20 hover:border-[#C8946E] transition-all">
              <span className="text-xs text-[#C8946E] uppercase tracking-widest font-bold">Alineación Estelar</span>
              <h3 className="text-2xl text-[#F4F0EB] mt-2 mb-3">El Zodiaco de la Novela</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed">
                Descubre cómo los signos celestes influyen directamente en los poderes, debilidades y pactos de cada personaje.
              </p>
            </div>
            <div className="p-6 bg-black/40 border border-[#E5C0A1]/20 hover:border-[#C8946E] transition-all">
              <span className="text-xs text-[#C8946E] uppercase tracking-widest font-bold">Reliquias Mayores</span>
              <h3 className="text-2xl text-[#F4F0EB] mt-2 mb-3">Artefactos del Eclipsado</h3>
              <p className="text-[#E5C0A1]/80 text-sm font-light leading-relaxed">
                Catálogo histórico de objetos rituales que protagonizan los giros más intensos de la trama literaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EL ENIGMA DEL ECLIPSE (RETOS Y CAPÍTULOS OCULTOS) */}
      <section id="enigma" className="py-28 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.4em] text-xs font-bold block mb-3">Reto Semanal</span>
          <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-4">El Enigma del Eclipse</h2>
          <p className="text-[#E5C0A1]/80 text-sm md:text-base font-light mb-8">
            “Aquel cuyo nombre da sombra al sol y gobierna en el confín del sistema estelar... ¿Cómo se llama el planeta que rige nuestra academia?”
          </p>

          <form onSubmit={verificarEnigma} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <input 
              type="text"
              value={respuestaEnigma}
              onChange={(e) => setRespuestaEnigma(e.target.value)}
              placeholder="Introduce la palabra secreta..."
              className="px-6 py-3 bg-black/50 border border-[#E5C0A1]/30 focus:outline-none focus:border-[#C8946E] text-[#F4F0EB] text-sm tracking-widest md:w-80"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase tracking-widest text-xs hover:bg-[#C8946E] hover:text-black transition-all border border-[#E5C0A1]/30 cursor-pointer"
            >
              Revelar Sello
            </button>
          </form>

          {mensajeEnigma && (
            <p className="text-sm text-[#E5C0A1] tracking-wide font-light bg-black/40 p-4 border border-[#E5C0A1]/20 inline-block">
              {mensajeEnigma}
            </p>
          )}
        </div>
      </section>

      {/* 9. GALERÍA DE VISIONES (ARTE Y ESCENAS DEL LIBRO) */}
      <section id="galeria" className="py-28 px-6 bg-[#0B0510] border-b border-[#E5C0A1]/10 text-center">
        <div className="max-w-5xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.4em] text-xs font-bold block mb-3">Archivo Visual</span>
          <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-4">Galería de Visiones</h2>
          <p className="text-[#E5C0A1]/80 text-sm font-light mb-16">Recreaciones visuales de los momentos más icónicos del universo de Los Hijos de Plutón.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gradient-to-tr from-[#1E0B2B] to-[#0A050E] border border-[#E5C0A1]/30 flex flex-col justify-end p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/fondo-astral.png')] bg-cover opacity-30 group-hover:scale-105 transition-transform duration-500"></div>
              <span className="relative z-10 text-xs uppercase tracking-widest text-[#C8946E] font-bold">Escena I</span>
              <h3 className="relative z-10 text-xl text-[#F4F0EB] mt-1">El Umbral de la Academia</h3>
            </div>
            <div className="h-64 bg-gradient-to-tr from-[#1E0B2B] to-[#0A050E] border border-[#E5C0A1]/30 flex flex-col justify-end p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/fondo-astral.png')] bg-cover opacity-30 group-hover:scale-105 transition-transform duration-500"></div>
              <span className="relative z-10 text-xs uppercase tracking-widest text-[#C8946E] font-bold">Escena II</span>
              <h3 className="relative z-10 text-xl text-[#F4F0EB] mt-1">La Conjunción del Anillo</h3>
            </div>
            <div className="h-64 bg-gradient-to-tr from-[#1E0B2B] to-[#0A050E] border border-[#E5C0A1]/30 flex flex-col justify-end p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/fondo-astral.png')] bg-cover opacity-30 group-hover:scale-105 transition-transform duration-500"></div>
              <span className="relative z-10 text-xs uppercase tracking-widest text-[#C8946E] font-bold">Escena III</span>
              <h3 className="relative z-10 text-xl text-[#F4F0EB] mt-1">El Sello de Plutón</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SECCIÓN FAQ / SEO OPTIMIZADA PARA GOOGLE */}
      <section id="faq" className="py-24 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10">
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

      {/* 11. CAPTACIÓN (EL ORÁCULO DE ADMISIÓN) */}
      <section className="py-28 px-6 relative overflow-hidden bg-[#08040C]">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="max-w-2xl mx-auto text-center relative z-10 transform-gpu"
        >
          <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-4">Inscripción a la Academia</h2>
          <p className="text-[#E5C0A1]/80 mb-8 font-light text-sm md:text-base">Inscribe tu nombre antes del 19 de noviembre y recibe un artefacto digital exclusivo para tus estudios en El Códice de Plutón.</p>
          
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