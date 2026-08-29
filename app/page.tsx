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

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntosCasas, setPuntosCasas] = useState({ Umbra: 0, Lux: 0, Astra: 0 });
  const [casaResultado, setCasaResultado] = useState<string | null>(null);

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
      
      {/* 1. HERO ASTRAL */}
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
          <h1 className="font-normal text-4xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5EE] via-[#E5C0A1] to-[#A26D45] drop-shadow-[0_8px_25px_rgba(0,0,0,1)] tracking-wider text-center mb-3">
            EL CÓDICE<br />DE PLUTÓN
          </h1>
          <p className="text-[#E5C0A1]/90 text-[11px] sm:text-xs md:text-base font-light tracking-[0.2em] uppercase text-center px-2">
            El santuario para los lectores y fans de Los Hijos de Plutón
          </p>
        </motion.div>
        
        <div 
          onClick={() => scrollToSection('oraculo-diario')}
          className="absolute bottom-6 cursor-pointer px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C0A1]/20 shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:border-[#C8946E]/50 transition-all z-30"
        >
          <span className="text-[#C8946E] text-[11px] md:text-xs tracking-widest uppercase font-bold">
            Desciende a las sombras
          </span>
        </div>
      </section>

      {/* 2. NAVEGACIÓN ADHESIVA */}
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

      {/* 3. CUENTA ATRÁS */}
      <section className="py-12 bg-[#0F0814] border-b border-[#E5C0A1]/10 text-center transform-gpu">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#C8946E] text-xs uppercase tracking-[0.4em] mb-3 font-bold">Próximo Alineamiento del Eclipse</p>
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto text-[#F4F0EB]">
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1]">{timeLeft.days}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Días</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1]">{timeLeft.hours}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Horas</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1]">{timeLeft.minutes}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Min</p>
            </div>
            <div className="bg-black/40 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1]">{timeLeft.seconds}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Seg</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAJAS ASIMÉTRICAS */}
      <section id="lore" className="py-20 md:py-28 px-6 relative bg-[#08040C] overflow-hidden transform-gpu">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-2 tracking-wider">Los Archivos del Códice</h2>
            <p className="text-[#E5C0A1]/70 text-xs tracking-[0.3em] uppercase">Explora los misterios de la Academia Eclipse</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            <div className="p-6 bg-[#140B1A]/90 border border-[#E5C0A1]/30">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Volumen I</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">La Obra y el Lore</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Descubre los secretos detrás de <span className="italic">Los Hijos de Plutón</span>.</p>
              <span className="text-xs uppercase tracking-widest text-[#C8946E] font-bold">Leer →</span>
            </div>
            <div id="merch" className="p-6 bg-[#140B1A]/90 border border-[#E5C0A1]/30 md:mt-10">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Artefactos</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">Reliquias y Merch</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Coleccionables y ediciones especiales para auténticos fans.</p>
              <span className="text-xs uppercase tracking-widest text-[#C8946E] font-bold">Explorar →</span>
            </div>
            <div id="discord" className="p-6 bg-[#140B1A]/90 border border-[#E5C0A1]/30">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Comunidad</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">El Círculo (Discord)</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Únete a nuestra comunidad secreta de debates y teorías.</p>
              <span className="text-xs uppercase tracking-widest text-[#C8946E] font-bold">Unirse →</span>
            </div>
            <div className="p-6 bg-[#140B1A]/90 border border-[#E5C0A1]/30 md:mt-14">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Manuscritos</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">Capítulos Inéditos</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Escenas eliminadas y perspectivas exclusivas más allá del libro.</p>
              <span className="text-xs uppercase tracking-widest text-[#C8946E] font-bold">Desvelar →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ORÁCULO DIARIO */}
      <section id="oraculo-diario" className="py-20 px-6 bg-[#0F0814] border-y border-[#E5C0A1]/15 text-center transform-gpu">
        <div className="max-w-2xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold block mb-2">Consulta mística</span>
          <h2 className="text-3xl text-[#F4F0EB] mb-4">El Oráculo de Plutón</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-8">Pulsa el sello para revelar la profecía oculta que marcará tu jornada.</p>

          <div className="p-6 bg-black/60 border border-[#E5C0A1]/30 mb-6">
            <p className="text-base md:text-xl text-[#F4F0EB] italic font-light min-h-[60px] flex items-center justify-center">
              {profeciaActual}
            </p>
          </div>

          <button onClick={consultarOraculo} className="px-6 py-3 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase tracking-widest text-xs hover:bg-[#C8946E] hover:text-black transition-all border border-[#E5C0A1]/30 cursor-pointer">
            Invocar Profecía
          </button>
        </div>
      </section>

      {/* 6. TEST DE ASIGNACIÓN */}
      <section id="test-casas" className="py-20 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold block mb-2">Ritual de Iniciación</span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">¿A qué Casa perteneces?</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-8">Descubre cuál de las casas de la Academia Eclipse rige tu destino.</p>

          <div className="p-6 bg-[#140B1A]/90 border border-[#E5C0A1]/30 text-left">
            {!casaResultado ? (
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-3">Enigma {preguntaActual + 1} de {PREGUNTAS_TEST.length}</span>
                <h3 className="text-lg md:text-xl text-[#F4F0EB] mb-6 font-light">{PREGUNTAS_TEST[preguntaActual].pregunta}</h3>
                <div className="space-y-3">
                  {PREGUNTAS_TEST[preguntaActual].opciones.map((opcion, index) => (
                    <button key={index} onClick={() => seleccionarRespuesta(opcion.casa)} className="w-full text-left p-3 bg-black/50 border border-[#E5C0A1]/20 hover:border-[#C8946E] text-[#F4F0EB] text-xs md:text-sm transition-all cursor-pointer">
                      {opcion.texto}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <span className="text-xs uppercase tracking-widest text-[#C8946E] block mb-2 font-bold">Destino Revelado</span>
                <h3 className="text-2xl text-[#F4F0EB] mb-2">{CASAS_INFO[casaResultado].nombre}</h3>
                <p className="text-[#E5C0A1] text-xs mb-4">{CASAS_INFO[casaResultado].emblema}</p>
                <p className="text-[#E5C0A1]/90 text-xs md:text-sm font-light mb-6">{CASAS_INFO[casaResultado].descripcion}</p>
                <button onClick={reiniciarTest} className="px-6 py-2 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase text-xs border border-[#E5C0A1]/30 cursor-pointer">
                  Repetir Ritual
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. EL GRIMORIO (CON TEXTURA DE FONDO) */}
      <section id="grimorio" className="py-20 px-6 bg-[#0B0510] border-b border-[#E5C0A1]/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold block mb-2">Enciclopedia</span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">El Grimorio de la Academia</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Expedientes de iniciados, alineaciones estelares y reliquias mayores.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div 
              className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] transition-all"
              style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.92), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente I</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium">Custodios</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Expedientes de los maestros del eco.</p>
            </div>
            <div 
              className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] transition-all"
              style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.92), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente II</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium">Zodiaco</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Influencia de los signos celestes.</p>
            </div>
            <div 
              className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] transition-all"
              style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.92), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente III</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium">Artefactos</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Catálogo de objetos rituales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENIGMA */}
      <section id="enigma" className="py-20 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold block mb-2">Reto Semanal</span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">El Enigma del Eclipse</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-6">“¿Cómo se llama el planeta que rige nuestra academia y da sombra al sol?”</p>
          <form onSubmit={verificarEnigma} className="flex flex-col sm:flex-row gap-2 justify-center mb-4">
            <input type="text" value={respuestaEnigma} onChange={(e) => setRespuestaEnigma(e.target.value)} placeholder="Palabra secreta..." className="px-4 py-2 bg-black/50 border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] md:w-64" />
            <button type="submit" className="px-5 py-2 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase text-xs border border-[#E5C0A1]/30 cursor-pointer">Sellar</button>
          </form>
          {mensajeEnigma && <p className="text-xs text-[#E5C0A1] p-3 bg-black/40 border border-[#E5C0A1]/20 inline-block">{mensajeEnigma}</p>}
        </div>
      </section>

      {/* 9. GALERÍA DE VISIONES */}
      <section id="galeria" className="py-20 px-6 bg-[#0B0510] border-b border-[#E5C0A1]/10 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold block mb-2">Visuales</span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">Galería de Visiones</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Recreaciones del universo de Los Hijos de Plutón.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/galeria-1.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena I</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium">Umbral de la Academia</h3>
              </div>
            </div>
            <div className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/galeria-2.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena II</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium">Conjunción del Anillo</h3>
              </div>
            </div>
            <div className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/galeria-3.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena III</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium">Sello de Plutón</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="py-20 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold block mb-2">Conocimiento</span>
            <h2 className="text-3xl text-[#F4F0EB]">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4 text-xs md:text-sm">
            <div className="p-4 bg-[#0F0814]/80 border border-[#E5C0A1]/20"><h3 className="font-medium text-[#F4F0EB] mb-1">¿De qué trata la novela?</h3><p className="text-[#E5C0A1]/80 font-light">Fantasía y misterio creada por Augusta Thoenig y Fran de Solas en el universo de la Academia Eclipse.</p></div>
            <div className="p-4 bg-[#0F0814]/80 border border-[#E5C0A1]/20"><h3 className="font-medium text-[#F4F0EB] mb-1">¿Qué es El Códice de Plutón?</h3><p className="text-[#E5C0A1]/80 font-light">El santuario digital oficial de la comunidad de lectores para consultar lore y contenidos inéditos.</p></div>
          </div>
        </div>
      </section>

      {/* 11. CAPTACIÓN */}
      <section className="py-20 px-6 bg-[#08040C] border-b border-[#E5C0A1]/10 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <h2 className="text-3xl text-[#F4F0EB] mb-3">Inscripción a la Academia</h2>
          <p className="text-[#E5C0A1]/80 mb-6 font-light text-xs md:text-sm">Inscribe tu nombre antes del 19 de noviembre y recibe un artefacto digital exclusivo.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="tu@correo.com" className="px-4 py-3 bg-black/50 border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] sm:w-80" />
            <button className="px-6 py-3 bg-[#2E1065] text-[#F4F0EB] font-bold uppercase text-xs border border-[#E5C0A1]/20 cursor-pointer">Sellar</button>
          </form>
        </motion.div>
      </section>

      {/* 12. PIE DE PÁGINA */}
      <footer className="py-12 px-6 bg-[#050208] border-t border-[#E5C0A1]/15 text-center text-[11px] text-[#E5C0A1]/60">
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
    </main>
  );
}