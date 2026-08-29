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
  "“Un pacto sellado en noviembre jamás podrá romper bajo la luz de la luna.”"
];

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
    emblema: "🌑 Sello de la Oscuridad Táctica"
  },
  Lux: {
    nombre: "Casa Lux Aeterna",
    descripcion: "Guardianes del prisma y la revelación. Tu linaje busca siempre la verdad absoluta, utilizando el poder de la luz para iluminar los rincones más ocultos del cosmos.",
    emblema: "✨ Faro del Espejo Lumínico"
  },
  Astra: {
    nombre: "Casa Astra Nova",
    descripcion: "Tejedores del destino estelar. Vinculados directamente a los movimientos celestes, interpretáis las constelaciones antes de que escriban el futuro de la Academia.",
    emblema: "🌌 Astrolabio del Firmamento"
  }
};

/* --- COMPONENTES VISUALES --- */

const DivisorEstelar = () => (
  <div className="w-full flex justify-center items-center py-8 opacity-80">
    <div className="w-24 md:w-48 h-[1px] bg-gradient-to-r from-transparent to-[#E5C0A1]/50"></div>
    <span className="mx-4 text-[#C8946E] text-sm drop-shadow-[0_0_8px_rgba(200,148,110,0.8)]">✦</span>
    <div className="w-24 md:w-48 h-[1px] bg-gradient-to-l from-transparent to-[#E5C0A1]/50"></div>
  </div>
);

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
  </>
);

const BotonReliquia = ({ children, onClick, type = "button" }: { children: React.ReactNode, onClick?: () => void, type?: "button" | "submit" }) => (
  <button 
    type={type}
    onClick={onClick}
    className="relative overflow-hidden px-8 py-3 bg-gradient-to-b from-[#1E0B2B] to-[#0A050E] text-[#F4F0EB] font-bold uppercase tracking-[0.2em] text-xs border border-[#E5C0A1]/40 shadow-[0_0_15px_rgba(76,29,149,0.3)] hover:shadow-[0_0_25px_rgba(200,148,110,0.5)] hover:border-[#C8946E] transition-all duration-500 group"
  >
    {/* Efecto destello interior */}
    <span className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#E5C0A1]/20 to-transparent -skew-x-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
    <span className="relative z-10">{children}</span>
  </button>
);

/* --- ICONOS MÍSTICOS VECTORIALES (Sustituyen a los emojis) --- */
const IconoOraculo = () => (
  <svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const IconoEclipse = () => (
  <svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
const IconoGrimorio = () => (
  <svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const IconoEnigma = () => (
  <svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconoGaleria = () => (
  <svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
const IconoFAQ = () => (
  <svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

export default function CodicePlutonPage() {
  const [profeciaActual, setProfeciaActual] = useState("Pulsa el cristal para invocar tu profecía diaria.");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntosCasas, setPuntosCasas] = useState({ Umbra: 0, Lux: 0, Astra: 0 });
  const [casaResultado, setCasaResultado] = useState<string | null>(null);

  const [respuestaEnigma, setRespuestaEnigma] = useState("");
  const [mensajeEnigma, setMensajeEnigma] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  const [particulas, setParticulas] = useState<{ id: number; x: number; y: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const nuevasParticulas = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 800, 
      y: (Math.random() - 0.5) * 400, 
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 4, 
      size: Math.random() * 3 + 1.5 
    }));
    setParticulas(nuevasParticulas);

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
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen selection:bg-[#3B0764] selection:text-white ${academiaFont.className} relative`}>
      
      {/* FONDOS LATERALES MÍSTICOS (FIJOS) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.70] mix-blend-screen hidden md:block">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-repeat-y" style={{ backgroundImage: "url('/images/runas-izq.jpg')", backgroundSize: '100% auto', WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)' }} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-repeat-y" style={{ backgroundImage: "url('/images/zodiaco-der.jpg')", backgroundSize: '100% auto', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)', maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)' }} />
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#08040C] to-transparent"></div>
      </div>

      {/* 1. HERO ASTRAL */}
      <section className="relative h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden isolate transform-gpu">
        <div className="absolute inset-0 bg-cover bg-center -z-30 opacity-60" style={{ backgroundImage: "url('/fondo-astral.png')" }}></div>

        <motion.img src="/anillo.png" alt="Anillo Astrológico" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 120, ease: "linear" }} style={{ willChange: "transform" }} className="absolute w-[700px] h-[700px] md:w-[1100px] md:h-[1100px] max-w-none -z-20 opacity-85 object-contain pointer-events-none select-none transform-gpu" />

        <div className="absolute w-[380px] h-[380px] md:w-[520px] md:h-[520px] -z-10 flex items-center justify-center pointer-events-none transform-gpu">
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-[#2E1065] to-[#4C1D95] rounded-full blur-[60px] md:blur-[90px] opacity-80"></div>
          <img src="/planeta-oficial.png" alt="Planeta Oficial Los Hijos de Plutón" className="absolute w-full h-full object-contain drop-shadow-[0_0_40px_rgba(76,29,149,0.7)] opacity-95 brightness-90 contrast-125" />
        </div>

        <img src="/estrella.png" alt="Estrella Polar" className="absolute top-[calc(50%-300px)] md:top-[calc(50%-380px)] -translate-y-1/2 w-24 h-24 md:w-40 md:h-40 z-30 drop-shadow-[0_0_25px_rgba(229,192,161,1)] object-contain pointer-events-none" />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-4 transform-gpu">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none z-0">
            {particulas.map((p) => (
              <motion.div key={p.id} className="absolute bg-[#E5C0A1] rounded-full blur-[1px] shadow-[0_0_8px_rgba(229,192,161,0.8)]" style={{ width: p.size, height: p.size, left: '50%', top: '50%' }} initial={{ opacity: 0, x: p.x, y: p.y, scale: 0 }} animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0.5], y: [p.y, p.y - 120], x: [p.x, p.x + (Math.random() * 40 - 20)] }} transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }} />
            ))}
          </div>

          <div className="relative mb-3 grid place-items-center w-full z-10">
            <motion.h1 className="col-start-1 row-start-1 font-normal text-4xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5EE] via-[#E5C0A1] to-[#A26D45] tracking-wider text-center" animate={{ filter: ["blur(4px) brightness(1)", "blur(14px) brightness(1.6)", "blur(4px) brightness(1)"], opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>EL CÓDICE<br />DE PLUTÓN</motion.h1>
            <h1 className="col-start-1 row-start-1 relative font-normal text-4xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5EE] via-[#E5C0A1] to-[#A26D45] drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-wider text-center">EL CÓDICE<br />DE PLUTÓN</h1>
          </div>
          <p className="relative z-10 text-[#E5C0A1]/90 text-[11px] sm:text-xs md:text-base font-light tracking-[0.2em] uppercase text-center px-2 mt-2 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">El santuario para los lectores y fans de Los Hijos de Plutón</p>
        </motion.div>
        
        <div onClick={() => scrollToSection('oraculo-diario')} className="absolute bottom-6 cursor-pointer px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C0A1]/20 shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:border-[#C8946E]/50 transition-all z-30 group">
          <span className="text-[#C8946E] text-[11px] md:text-xs tracking-widest uppercase font-bold group-hover:drop-shadow-[0_0_8px_rgba(200,148,110,0.8)] transition-all">Desciende a las sombras ✦</span>
        </div>
      </section>

      {/* 2. NAVEGACIÓN ADHESIVA */}
      <nav className="sticky top-0 z-50 bg-[#08040C]/95 backdrop-blur-md border-b border-[#E5C0A1]/20 py-3 px-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex justify-start md:justify-center gap-5 md:gap-8 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#E5C0A1]/80 min-w-max px-2 relative z-10">
          <li onClick={() => scrollToSection('lore')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">La Obra</li>
          <li onClick={() => scrollToSection('oraculo-diario')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Oráculo</li>
          <li onClick={() => scrollToSection('test-casas')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Test Casas</li>
          <li onClick={() => scrollToSection('grimorio')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Grimorio</li>
          <li onClick={() => scrollToSection('enigma')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Enigma</li>
          <li onClick={() => scrollToSection('galeria')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Galería</li>
          <li onClick={() => scrollToSection('faq')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">FAQ</li>
        </ul>
      </nav>

      {/* 3. CUENTA ATRÁS */}
      <section className="py-12 bg-transparent text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#C8946E] text-xs uppercase tracking-[0.4em] mb-4 font-bold flex items-center justify-center gap-2">
            <span>✧</span> Próximo Alineamiento del Eclipse <span>✧</span>
          </p>
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto text-[#F4F0EB]">
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.days}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Días</p>
            </div>
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.hours}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Horas</p>
            </div>
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.minutes}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Min</p>
            </div>
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.seconds}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Seg</p>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 4. CAJAS ASIMÉTRICAS */}
      <section id="lore" className="py-12 px-6 relative overflow-hidden transform-gpu z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-2 tracking-wider">Los Archivos del Códice</h2>
            <p className="text-[#E5C0A1]/70 text-xs tracking-[0.3em] uppercase">Explora los misterios de la Academia Eclipse</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all duration-300 cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Volumen I</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">La Obra y el Lore</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Descubre los secretos detrás de <span className="italic">Los Hijos de Plutón</span>.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Leer ✦</span>
            </div>
            
            <div id="merch" className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(229,192,161,0.15)] transition-all duration-300 cursor-pointer md:mt-10" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Artefactos</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">Reliquias y Merch</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Coleccionables y ediciones especiales para auténticos fans.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Explorar ✦</span>
            </div>
            
            <div id="discord" className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all duration-300 cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Comunidad</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">El Círculo (Discord)</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Únete a nuestra comunidad secreta de debates y teorías.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Unirse ✦</span>
            </div>
            
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(229,192,161,0.15)] transition-all duration-300 cursor-pointer md:mt-14" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Manuscritos</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">Capítulos Inéditos</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Escenas eliminadas y perspectivas exclusivas más allá del libro.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Desvelar ✦</span>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 5. ORÁCULO DIARIO */}
      <section id="oraculo-diario" className="py-12 px-6 text-center transform-gpu relative z-10">
        <div className="max-w-2xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoOraculo /> Consulta Mística <IconoOraculo />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-4">El Oráculo de Plutón</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Pulsa el sello para revelar la profecía oculta que marcará tu jornada.</p>

          {/* Caja Altar Oráculo */}
          <div className="p-8 border border-[#E5C0A1]/30 mb-8 relative group shadow-[0_0_40px_rgba(46,16,101,0.5)] bg-black/90 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C8946E] to-transparent"></div>
            <EsquinasReliquia />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#4C1D95]/20 blur-2xl rounded-full pointer-events-none"></div>
            
            <p className="text-base md:text-xl text-[#F4F0EB] italic font-light min-h-[60px] flex items-center justify-center relative z-10 drop-shadow-md">
              {profeciaActual}
            </p>
          </div>

          <BotonReliquia onClick={consultarOraculo}>Invocar Profecía</BotonReliquia>
        </div>
      </section>

      <DivisorEstelar />

      {/* 6. TEST DE ASIGNACIÓN */}
      <section id="test-casas" className="py-12 px-6 text-center relative z-10">
        <div className="max-w-xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoEclipse /> Ritual de Iniciación <IconoEclipse />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">¿A qué Casa perteneces?</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Descubre cuál de las casas de la Academia Eclipse rige tu destino.</p>

          {/* Caja Altar Test */}
          <div className="p-8 border border-[#E5C0A1]/30 text-left relative bg-black/90 backdrop-blur-md shadow-[0_0_40px_rgba(76,29,149,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] opacity-15 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C8946E] to-transparent"></div>
            <EsquinasReliquia />

            {!casaResultado ? (
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-4 border-b border-[#E5C0A1]/20 pb-3 flex justify-between">
                  <span>Enigma {preguntaActual + 1} de {PREGUNTAS_TEST.length}</span>
                  <span className="text-[#E5C0A1]/50">Academia Eclipse</span>
                </span>
                <h3 className="text-lg md:text-xl text-[#F4F0EB] mb-8 font-light leading-relaxed">{PREGUNTAS_TEST[preguntaActual].pregunta}</h3>
                <div className="space-y-4">
                  {PREGUNTAS_TEST[preguntaActual].opciones.map((opcion, index) => (
                    <button key={index} onClick={() => seleccionarRespuesta(opcion.casa)} className="w-full text-left p-4 bg-[#140B1A]/80 border border-[#E5C0A1]/20 hover:border-[#C8946E] hover:bg-[#2E1065]/40 text-[#F4F0EB] text-xs md:text-sm transition-all duration-300 cursor-pointer group flex justify-between items-center shadow-inner">
                      <span>{opcion.texto}</span>
                      <span className="text-[#C8946E] opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] block mb-3 font-bold">Destino Revelado</span>
                <h3 className="text-4xl text-[#F4F0EB] mb-3 drop-shadow-lg">{CASAS_INFO[casaResultado].nombre}</h3>
                <p className="text-[#E5C0A1] text-lg mb-6 drop-shadow-[0_0_15px_rgba(229,192,161,0.6)] font-bold">{CASAS_INFO[casaResultado].emblema}</p>
                <p className="text-[#E5C0A1]/90 text-sm font-light mb-10 leading-relaxed px-4">{CASAS_INFO[casaResultado].descripcion}</p>
                <BotonReliquia onClick={reiniciarTest}>Repetir Ritual</BotonReliquia>
              </div>
            )}
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 7. EL GRIMORIO */}
      <section id="grimorio" className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoGrimorio /> Enciclopedia <IconoGrimorio />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">El Grimorio de la Academia</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Expedientes de iniciados, alineaciones estelares y reliquias mayores.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] transition-all cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.85), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente I</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium group-hover:text-[#C8946E] transition-colors">Custodios</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Expedientes de los maestros del eco.</p>
            </div>
            <div className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(229,192,161,0.2)] transition-all cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.85), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente II</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium group-hover:text-[#C8946E] transition-colors">Zodiaco</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Influencia de los signos celestes.</p>
            </div>
            <div className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] transition-all cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.85), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente III</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium group-hover:text-[#C8946E] transition-colors">Artefactos</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Catálogo de objetos rituales.</p>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 8. ENIGMA */}
      <section id="enigma" className="py-12 px-6 text-center relative z-10">
        <div className="max-w-xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoEnigma /> Reto Semanal <IconoEnigma />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">El Enigma del Eclipse</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-8">“¿Cómo se llama el planeta que rige nuestra academia y da sombra al sol?”</p>
          <form onSubmit={verificarEnigma} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <input type="text" value={respuestaEnigma} onChange={(e) => setRespuestaEnigma(e.target.value)} placeholder="Palabra secreta..." className="px-6 py-3 bg-black/80 backdrop-blur-md border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] md:w-72 focus:outline-none focus:border-[#C8946E] transition-colors shadow-inner" />
            <BotonReliquia type="submit">Revelar Sello</BotonReliquia>
          </form>
          {mensajeEnigma && <p className="text-xs text-[#E5C0A1] p-4 bg-black/90 backdrop-blur-md border border-[#E5C0A1]/30 inline-block shadow-[0_0_20px_rgba(229,192,161,0.15)]">{mensajeEnigma}</p>}
        </div>
      </section>

      <DivisorEstelar />

      {/* 9. GALERÍA DE VISIONES */}
      <section id="galeria" className="py-12 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoGaleria /> Archivo Visual <IconoGaleria />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">Galería de Visiones</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Pulsa sobre cualquier visión para observarla a tamaño real.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div onClick={() => setImagenSeleccionada('/images/galeria-1.jpg')} className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300" style={{ backgroundImage: "url('/images/galeria-1.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all"></div>
              <EsquinasReliquia />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena I</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium group-hover:text-[#C8946E] transition-colors">Umbral de la Academia</h3>
              </div>
            </div>

            <div onClick={() => setImagenSeleccionada('/images/galeria-2.jpg')} className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(229,192,161,0.2)] transition-all duration-300" style={{ backgroundImage: "url('/images/galeria-2.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all"></div>
              <EsquinasReliquia />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena II</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium group-hover:text-[#C8946E] transition-colors">Conjunción del Anillo</h3>
              </div>
            </div>

            <div onClick={() => setImagenSeleccionada('/images/galeria-3.jpg')} className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300" style={{ backgroundImage: "url('/images/galeria-3.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all"></div>
              <EsquinasReliquia />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena III</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium group-hover:text-[#C8946E] transition-colors">Sello de Plutón</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 10. FAQ */}
      <section id="faq" className="py-12 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
              <IconoFAQ /> Base de Conocimiento <IconoFAQ />
            </span>
            <h2 className="text-3xl text-[#F4F0EB]">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4 text-xs md:text-sm">
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center shadow-lg" style={{ backgroundImage: "linear-gradient(to bottom, rgba(15, 8, 20, 0.95), rgba(15, 8, 20, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <h3 className="font-medium text-[#F4F0EB] mb-2 text-base">¿De qué trata la novela?</h3>
              <p className="text-[#E5C0A1]/80 font-light leading-relaxed">Fantasía y misterio creada por Augusta Thoenig y Fran de Solas en el universo de la Academia Eclipse.</p>
            </div>
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center shadow-lg" style={{ backgroundImage: "linear-gradient(to bottom, rgba(15, 8, 20, 0.95), rgba(15, 8, 20, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <h3 className="font-medium text-[#F4F0EB] mb-2 text-base">¿Qué es El Códice de Plutón?</h3>
              <p className="text-[#E5C0A1]/80 font-light leading-relaxed">El santuario digital oficial de la comunidad de lectores para consultar lore y contenidos inéditos.</p>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 11. CAPTACIÓN */}
      <section className="py-12 px-6 text-center mb-10 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <h2 className="text-3xl text-[#F4F0EB] mb-3">Inscripción a la Academia</h2>
          <p className="text-[#E5C0A1]/80 mb-8 font-light text-xs md:text-sm">Inscribe tu nombre antes del 19 de noviembre y recibe un artefacto digital exclusivo.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="tu@correo.com" className="px-6 py-3 bg-black/80 backdrop-blur-md border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] sm:w-80 focus:outline-none focus:border-[#C8946E] transition-colors shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
            <BotonReliquia type="submit">Sellar Pacto</BotonReliquia>
          </form>
        </motion.div>
      </section>

      {/* 12. PIE DE PÁGINA */}
      <footer className="py-12 px-6 bg-black/95 backdrop-blur-lg border-t border-[#E5C0A1]/15 text-center text-[11px] text-[#E5C0A1]/60 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-bold tracking-widest text-[#C8946E] uppercase">EL CÓDICE DE PLUTÓN</p>
          <p className="leading-relaxed font-light">
            Este sitio web es un portal de fans no oficial creado sin ánimo de lucro por y para la comunidad de lectores de la obra literaria <span className="italic">Los Hijos de Plutón</span>, escrita por Augusta Thoenig y Fran de Solas. No está afiliado, respaldado ni asociado oficialmente con los autores ni con la editorial Montena o Penguin Random House. Todos los derechos sobre la propiedad intelectual pertenecen a sus respectivos propietarios legales.
          </p>
          <div className="pt-4 border-t border-[#E5C0A1]/10 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© 2026 elcodicedepluton.com — Todos los derechos reservados.</span>
            <span className="tracking-widest uppercase text-[#C8946E]">Santuario de la Academia Eclipse</span>
          </div>
        </div>
      </footer>

      {/* MODAL / VISOR DE IMAGEN A TAMAÑO REAL */}
      {imagenSeleccionada && (
        <div onClick={() => setImagenSeleccionada(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer">
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={imagenSeleccionada} alt="Visión ampliada" className="max-h-[85vh] max-w-full object-contain border border-[#E5C0A1]/40 shadow-[0_0_50px_rgba(76,29,149,0.5)]" />
            <button onClick={() => setImagenSeleccionada(null)} className="absolute top-2 right-2 bg-black/80 text-[#E5C0A1] border border-[#E5C0A1]/40 px-3 py-1 text-xs uppercase tracking-widest hover:bg-[#C8946E] hover:text-black transition-all cursor-pointer">
              Cerrar ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}